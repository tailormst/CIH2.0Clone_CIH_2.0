"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle, Shield } from "lucide-react"
import Navbar from "@/components/Navbar"

export default function ManualCheckPage() {
  const [formData, setFormData] = useState({
    amount: "",
    location: "",
    ip: "",
    device: "",
  })
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      const riskScore = Math.random() * 10
      setResult({
        riskScore: riskScore.toFixed(1),
        status: riskScore > 7 ? "high" : riskScore > 4 ? "medium" : "low",
        recommendation: riskScore > 7 ? "Block Transaction" : riskScore > 4 ? "Review Required" : "Approve Transaction",
      })
      setLoading(false)
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manual Fraud Check</h1>
          <p className="text-gray-600">Test our fraud detection system with transaction details</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Details</CardTitle>
              <CardDescription>Enter the transaction information to check for fraud risk</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="amount">Transaction Amount ($)</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    placeholder="100.00"
                    value={formData.amount}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="New York, NY"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="ip">IP Address</Label>
                  <Input
                    id="ip"
                    name="ip"
                    placeholder="192.168.1.1"
                    value={formData.ip}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="device">Device Type</Label>
                  <Input
                    id="device"
                    name="device"
                    placeholder="iPhone 15 Pro"
                    value={formData.device}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Analyzing..." : "Check for Fraud"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fraud Analysis Result</CardTitle>
              <CardDescription>AI-powered fraud detection results</CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                        result.status === "high"
                          ? "bg-red-100"
                          : result.status === "medium"
                            ? "bg-yellow-100"
                            : "bg-green-100"
                      }`}
                    >
                      {result.status === "high" ? (
                        <AlertCircle className="h-8 w-8 text-red-600" />
                      ) : result.status === "medium" ? (
                        <Shield className="h-8 w-8 text-yellow-600" />
                      ) : (
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      )}
                    </div>

                    <h3 className="text-2xl font-bold mb-2">Risk Score: {result.riskScore}/10</h3>

                    <div
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        result.status === "high"
                          ? "bg-red-100 text-red-800"
                          : result.status === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {result.status.toUpperCase()} RISK
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Recommendation:</h4>
                    <p className="text-gray-700">{result.recommendation}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Analysis Factors:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Transaction amount analysis</li>
                      <li>• Geographic location verification</li>
                      <li>• IP address reputation check</li>
                      <li>• Device fingerprinting</li>
                      <li>• Behavioral pattern analysis</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Submit transaction details to see fraud analysis results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
