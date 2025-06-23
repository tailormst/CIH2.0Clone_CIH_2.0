"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  BarChart3,
  Shield,
  Activity,
  Copy,
  Eye,
  EyeOff,
  RefreshCw,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import Navbar from "@/components/Navbar"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface UserStats {
  total_requests: number
  total_fraud_checks: number
  high_risk_count: number
  medium_risk_count: number
  low_risk_count: number
  avg_risk_score: number
  recent_checks: Array<{
    id: number
    amt_inr: number
    sender_city: string
    receiver_city: string
    status: string
    risk_score: number
    created_at: string
  }>
}

export default function DashboardPage() {
  const { isSignedIn, user } = useUser()
  const [stats, setStats] = useState<UserStats | null>(null)
  const [apiKey, setApiKey] = useState("")
  const [showApiKey, setShowApiKey] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (isSignedIn && user) {
      generateApiKey()
      fetchStats()
    }
  }, [isSignedIn, user])

  const generateApiKey = () => {
    // Generate API key based on user ID
    const key = `fdaas_${user?.id?.slice(0, 8)}_${Date.now().toString(36)}`
    setApiKey(key)
  }

  const fetchStats = async () => {
    try {
      setLoading(true)
      // Mock data for now since we don't have backend integration yet
      const mockStats: UserStats = {
        total_requests: 1247,
        total_fraud_checks: 1247,
        high_risk_count: 89,
        medium_risk_count: 234,
        low_risk_count: 924,
        avg_risk_score: 3.2,
        recent_checks: [
          {
            id: 1,
            amt_inr: 25000,
            sender_city: "Mumbai",
            receiver_city: "Delhi",
            status: "low",
            risk_score: 2.1,
            created_at: new Date().toISOString(),
          },
          {
            id: 2,
            amt_inr: 75000,
            sender_city: "Bangalore",
            receiver_city: "Chennai",
            status: "medium",
            risk_score: 5.8,
            created_at: new Date(Date.now() - 3600000).toISOString(),
          },
          {
            id: 3,
            amt_inr: 150000,
            sender_city: "Kolkata",
            receiver_city: "Hyderabad",
            status: "high",
            risk_score: 8.9,
            created_at: new Date(Date.now() - 7200000).toISOString(),
          },
        ],
      }
      setStats(mockStats)
    } catch (err) {
      setError("Failed to fetch dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const copyApiKey = async () => {
    try {
      await navigator.clipboard.writeText(apiKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy API key")
    }
  }

  const getRiskBadgeColor = (status: string) => {
    switch (status) {
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Sign In Required</CardTitle>
              <CardDescription>Please sign in to access your dashboard</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.firstName || "User"}!</h1>
          <p className="text-gray-600">Monitor your fraud detection usage and manage your API access</p>
        </div>

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {/* API Key Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              API Configuration
            </CardTitle>
            <CardDescription>Use this API key to authenticate your requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="api-key">Your API Key</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="api-key"
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    readOnly
                    className="font-mono"
                  />
                  <Button variant="outline" size="icon" onClick={() => setShowApiKey(!showApiKey)}>
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyApiKey}
                    className={copied ? "bg-green-50 border-green-200" : ""}
                  >
                    {copied ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">Include this key in the X-API-KEY header of your requests</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : stats ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Requests</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total_requests.toLocaleString()}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Risk Score</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.avg_risk_score.toFixed(1)}/10</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">High Risk</p>
                    <p className="text-2xl font-bold text-red-600">{stats.high_risk_count}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Low Risk</p>
                    <p className="text-2xl font-bold text-green-600">{stats.low_risk_count}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null}

        {/* Risk Distribution */}
        {stats && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Risk Distribution</CardTitle>
                <CardDescription>Breakdown of transaction risk levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Low Risk</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{stats.low_risk_count}</div>
                      <div className="text-xs text-gray-500">
                        {((stats.low_risk_count / stats.total_fraud_checks) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Medium Risk</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{stats.medium_risk_count}</div>
                      <div className="text-xs text-gray-500">
                        {((stats.medium_risk_count / stats.total_fraud_checks) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">High Risk</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{stats.high_risk_count}</div>
                      <div className="text-xs text-gray-500">
                        {((stats.high_risk_count / stats.total_fraud_checks) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline" asChild>
                  <a href="/manual-check">
                    <Activity className="mr-2 h-4 w-4" />
                    Run Manual Check
                  </a>
                </Button>
                <Button className="w-full justify-start" variant="outline" onClick={fetchStats}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh Data
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <a href="/docs" target="_blank" rel="noreferrer">
                    <Shield className="mr-2 h-4 w-4" />
                    API Documentation
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recent Checks */}
        {stats && stats.recent_checks.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Fraud Checks</CardTitle>
              <CardDescription>Your latest transaction analyses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recent_checks.map((check) => (
                  <div key={check.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="font-medium">₹{check.amt_inr.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">
                          {check.sender_city} → {check.receiver_city}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">Risk: {check.risk_score}/10</div>
                        <div className="text-xs text-gray-500">{new Date(check.created_at).toLocaleDateString()}</div>
                      </div>
                      <Badge className={getRiskBadgeColor(check.status)}>{check.status.toUpperCase()}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
