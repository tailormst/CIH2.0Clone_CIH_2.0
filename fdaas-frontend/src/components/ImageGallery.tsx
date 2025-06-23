"use client"

import { motion } from "framer-motion"
import { Shield, BarChart3, Smartphone, Globe, Lock, Zap } from "lucide-react"

export default function ImageGallery() {
  const images = [
    {
      src: "/placeholder.svg?height=300&width=400",
      alt: "Secure Payment Processing",
      icon: Shield,
      title: "Secure Payment Processing",
      description: "Advanced encryption and security protocols",
    },
    {
      src: "/placeholder.svg?height=300&width=400",
      alt: "AI Fraud Detection",
      icon: BarChart3,
      title: "AI Fraud Detection",
      description: "Machine learning algorithms for real-time analysis",
    },
    {
      src: "/placeholder.svg?height=300&width=400",
      alt: "Real-time Monitoring",
      icon: Zap,
      title: "Real-time Monitoring",
      description: "Instant alerts and transaction monitoring",
    },
    {
      src: "/placeholder.svg?height=300&width=400",
      alt: "Data Analytics Dashboard",
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Comprehensive fraud analytics and reporting",
    },
    {
      src: "/placeholder.svg?height=300&width=400",
      alt: "Mobile Security",
      icon: Smartphone,
      title: "Mobile Security",
      description: "Protection across all mobile platforms",
    },
    {
      src: "/placeholder.svg?height=300&width=400",
      alt: "Global Protection",
      icon: Globe,
      title: "Global Protection",
      description: "Worldwide fraud detection and prevention",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Our Technology in Action</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            See how our advanced fraud detection system works to protect your business with cutting-edge AI technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white border border-gray-100"
            >
              <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 p-8 flex items-center justify-center">
                <image.icon className="h-16 w-16 text-blue-600" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {image.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{image.description}</p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-2xl" />
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Bank-Level Security</h3>
            <p className="text-gray-600 text-sm">Enterprise-grade security protocols and encryption</p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
            <p className="text-gray-600 text-sm">Sub-second response times for real-time decisions</p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Analytics</h3>
            <p className="text-gray-600 text-sm">Advanced AI models with continuous learning</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
