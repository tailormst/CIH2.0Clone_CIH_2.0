"use client"

import { useState, useEffect } from "react"
import { useAuth, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Copy,
  Key,
  TrendingUp,
  Zap,
  Crown,
  BarChart3,
  Shield,
  BookOpen,
  Download,
  MessageCircle,
  RefreshCw,
} from "lucide-react"
import Navbar from "@/components/Navbar"
import Link from "next/link"

interface UserData {
  id: number
  email: string
  api_key: string
  plan: string
  daily_usage: number
  daily_limit: number
  created_at: string
  total_requests: number
  success_rate: number
}

interface RecentActivity {
  id: number
  amount: string
  location: string
  ip_address: string
  risk_score: number
  status: string
  recommendation: string
  created_at: string
}

export default function DashboardPage() {
  const { userId } = useAuth()
  const { user } = useUser()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (userId) {
      fetchUserData()
      fetchRecentActivity()
    }
  }, [userId])

  const fetchUserData = async () => {
    try {
      setError("")
      console.log("Fetching user data for:", userId)

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
      const response = await fetch(`${apiUrl}/api/users/info/?clerk_user_id=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      console.log("Response status:", response.status)

      if (response.ok) {
        const data = await response.json()
        console.log("User data received:", data)
        setUserData(data)
      } else if (response.status === 404) {
        console.log("User not found, creating new user")
        // User not found, create user
        await createUser()
      } else {
        const errorText = await response.text()
        console.error("Error response:", errorText)
        setError(`Failed to fetch user data: ${response.status}`)
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
      setError("Failed to connect to server. Make sure Django backend is running on port 8000.")
    } finally {
      setLoading(false)
    }
  }

  const createUser = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
      const response = await fetch(`${apiUrl}/api/users/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerk_user_id: userId,
          email: user?.emailAddresses[0]?.emailAddress || "",
        }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log("User created:", data)
        setUserData(data)
      } else {
        const errorText = await response.text()
        console.error("Error creating user:", errorText)
        setError("Failed to create user account")
      }
    } catch (error) {
      console.error("Error creating user:", error)
      setError("Failed to create user account")
    }
  }

  const fetchRecentActivity = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
      const response = await fetch(`${apiUrl}/api/fraud-checks/recent/?clerk_user_id=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Recent activity:", data)
        setRecentActivity(data)
      } else {
        console.log("No recent activity or error:", response.status)
      }
    } catch (error) {
      console.error("Error fetching recent activity:", error)
    }
  }

  const copyApiKey = () => {
    if (userData?.api_key) {
      navigator.clipboard.writeText(`fdaas_${userData.api_key}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const refreshData = async () => {
    setLoading(true)
    await fetchUserData()
    await fetchRecentActivity()
  }

  if (!userId) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to access your dashboard</h1>
            <Link href="/">
              <Button>Go to Homepage</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center max-w-md">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
              <h2 className="text-lg font-semibold text-red-800 mb-2">Connection Error</h2>
              <p className="text-red-600 mb-4">{error}</p>
              <div className="text-sm text-red-600 bg-red-100 p-3 rounded">
                <p className="font-medium">Make sure:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Django backend is running on port 8000</li>
                  <li>
                    Run: <code className="bg-red-200 px-1 rounded">python manage.py runserver</code>
                  </li>
                  <li>Check console for any backend errors</li>
                </ul>
              </div>
            </div>
            <Button onClick={refreshData}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry Connection
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <p className="text-gray-600 mb-4">No user data found</p>
            <Button onClick={refreshData}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.firstName || "User"}! 👋</h1>
            <p className="text-gray-600">Manage your fraud detection API and monitor usage statistics</p>
          </div>
          <Button onClick={refreshData} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Daily Usage</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {userData.daily_usage}/{userData.daily_limit}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{userData.total_requests || 0}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{userData.success_rate || 0}%</p>
                </div>
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Current Plan</p>
                  <p className="text-2xl font-bold text-gray-900">{userData.plan}</p>
                </div>
                <Crown className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* API Key Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Your API Key
              </CardTitle>
              <CardDescription>
                This key was automatically generated when you signed up. Use it to authenticate your API requests.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg border">
                <code className="flex-1 text-sm font-mono text-gray-800 truncate">fdaas_{userData.api_key}</code>
                <Button size="sm" variant="outline" onClick={copyApiKey} className="flex-shrink-0">
                  <Copy className="h-4 w-4 mr-1" />
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>🔒 Security Note:</strong> This API key is permanent and tied to your account. Keep it secure
                  and never share it publicly.
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Created: {new Date(userData.created_at).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>

          {/* Plan Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5" />
                Current Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {userData.plan} Plan
                </Badge>
                <div>
                  <p className="text-3xl font-bold text-gray-900">$0</p>
                  <p className="text-sm text-gray-600">per month</p>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>✅ {userData.daily_limit} requests per day</p>
                  <p>✅ Basic fraud detection</p>
                  <p>✅ Email support</p>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade to Pro
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Usage Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Usage Analytics
              </CardTitle>
              <CardDescription>Today's API usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Requests Used</span>
                    <span>
                      {userData.daily_usage}/{userData.daily_limit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((userData.daily_usage / userData.daily_limit) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {Math.max(userData.daily_limit - userData.daily_usage, 0)} requests remaining today
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center text-sm">
                    <span>Success Rate</span>
                    <span className="font-semibold text-green-600">{userData.success_rate || 0}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/docs">
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  API Documentation
                </Button>
              </Link>
              <Link href="/manual-check">
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Test Fraud Detection
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Download SDK
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent API Activity</CardTitle>
              <CardDescription>Your latest fraud detection requests</CardDescription>
            </CardHeader>
            <CardContent>
              {recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium text-gray-900">${activity.amount}</p>
                            <p className="text-sm text-gray-500">{new Date(activity.created_at).toLocaleString()}</p>
                          </div>
                          <div className="text-xs text-gray-400">
                            <p>IP: {activity.ip_address}</p>
                            <p>Location: {activity.location}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <Badge
                          variant={
                            activity.status === "high"
                              ? "destructive"
                              : activity.status === "medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {activity.status} Risk ({activity.risk_score}/10)
                        </Badge>
                        <p className="text-sm text-gray-600 capitalize">{activity.recommendation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No API activity yet</p>
                  <p className="text-sm text-gray-400 mt-2">Start using your API to see activity here</p>
                </div>
              )}

              {recentActivity.length > 0 && (
                <div className="mt-6 text-center">
                  <Button variant="outline">View All Activity</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
