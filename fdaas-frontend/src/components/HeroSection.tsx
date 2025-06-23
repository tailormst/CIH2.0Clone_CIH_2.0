"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Shield, Zap, TrendingUp, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface HeroSectionProps {
  isAuthenticated: boolean
}

export default function HeroSection({ isAuthenticated }: HeroSectionProps) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Stop Fraud
              <span className="text-blue-600 block">Before It Happens</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Advanced AI-powered fraud detection that protects your business and customers from online transaction
              fraud in real-time with 99.9% accuracy.
            </p>

            <div className="flex items-center space-x-8 mb-8">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-green-500" />
                <span className="text-sm font-medium text-gray-700">99.9% Accuracy</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">Real-time Detection</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-6 w-6 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">Easy Integration</span>
              </div>
            </div>
          </motion.div>

          {/* Right Content - AI Image with Scroll Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          >
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              {/* AI Dashboard Mockup */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">AI Fraud Detection</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>

                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="AI Fraud Detection Dashboard"
                  className="w-full h-48 object-cover rounded-xl bg-gradient-to-br from-blue-100 to-purple-100"
                />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Transaction Risk Score</span>
                    <span className="text-2xl font-bold text-red-500">8.7/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "87%" }}
                      transition={{ duration: 2, delay: 1 }}
                    ></motion.div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-red-600 font-medium">⚠️ High Risk Detected</span>
                    <span className="text-gray-500">Review Recommended</span>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Shield className="h-6 w-6" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-green-500 text-white p-3 rounded-full shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
              >
                <Zap className="h-6 w-6" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* CTA Buttons Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          {isAuthenticated ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/manual-check">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
                >
                  <Shield className="mr-2 h-5 w-5" />
                  Manual Fraud Check
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          ) : (
            <Link href="/manual-check">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                <Shield className="mr-2 h-5 w-5" />
                Check Transaction Now
              </Button>
            </Link>
          )}

          <p className="text-gray-500 text-sm mt-4">
            {isAuthenticated
              ? "Access your dashboard or test our fraud detection"
              : "Try our fraud detection system - No signup required"}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
