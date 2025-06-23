"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Crown, Zap, Shield, BarChart3 } from "lucide-react"

interface UpgradeModalProps {
  trigger?: React.ReactNode
}

export function UpgradeModal({ trigger }: UpgradeModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("monthly")

  const plans = {
    monthly: {
      price: "₹2,999",
      period: "/month",
      savings: null,
    },
    yearly: {
      price: "₹29,999",
      period: "/year",
      savings: "Save ₹5,989",
    },
  }

  const features = [
    { icon: Zap, text: "Unlimited API requests" },
    { icon: Shield, text: "Advanced ML fraud detection" },
    { icon: BarChart3, text: "Detailed analytics & reports" },
    { icon: Crown, text: "Priority support" },
    { text: "Custom integration support" },
    { text: "Real-time alerts" },
    { text: "White-label API" },
    { text: "SLA guarantee" },
  ]

  const handleUpgrade = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real app, integrate with payment gateway like Razorpay
    alert(`Payment successful! Welcome to FDaaS Pro ${selectedPlan}!`)
    setIsProcessing(false)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="btn-primary">
            <Crown className="w-4 h-4 mr-2" />
            Upgrade to Pro
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Upgrade to FDaaS Pro
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Pricing Section */}
          <div className="space-y-4">
            <div className="text-center">
              <div className="flex justify-center space-x-2 mb-4">
                <Button
                  variant={selectedPlan === "monthly" ? "default" : "outline"}
                  onClick={() => setSelectedPlan("monthly")}
                  className="flex-1"
                >
                  Monthly
                </Button>
                <Button
                  variant={selectedPlan === "yearly" ? "default" : "outline"}
                  onClick={() => setSelectedPlan("yearly")}
                  className="flex-1 relative"
                >
                  Yearly
                  {plans.yearly.savings && (
                    <Badge className="absolute -top-2 -right-2 bg-green-500 text-xs">Save 17%</Badge>
                  )}
                </Button>
              </div>

              <Card className="border-2 border-blue-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <CardHeader className="text-center pb-2">
                  <div className="flex justify-center mb-2">
                    <Crown className="w-8 h-8 text-yellow-500" />
                  </div>
                  <CardTitle className="text-xl">Pro Plan</CardTitle>
                  <CardDescription>Perfect for growing businesses</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-blue-600">{plans[selectedPlan].price}</span>
                    <span className="text-gray-600 ml-1">{plans[selectedPlan].period}</span>
                    {plans[selectedPlan].savings && (
                      <div className="text-green-600 font-semibold text-sm mt-1">{plans[selectedPlan].savings}</div>
                    )}
                  </div>

                  <Button onClick={handleUpgrade} disabled={isProcessing} className="w-full btn-primary">
                    {isProcessing ? "Processing..." : "Upgrade Now"}
                  </Button>

                  <p className="text-xs text-gray-500 mt-2">Secure payment via Razorpay</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Features Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-center md:text-left">What's included:</h3>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {feature.icon ? (
                      <feature.icon className="w-5 h-5 text-green-500" />
                    ) : (
                      <Check className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <span className="text-sm sm:text-base">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">🚀 Limited Time Offer</h4>
              <p className="text-sm text-blue-700">
                Get 30 days free trial with any annual plan. No commitment, cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
