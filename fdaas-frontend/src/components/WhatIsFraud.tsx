"use client"

import { motion } from "framer-motion"
import { AlertTriangle, CreditCard, Globe, Smartphone, DollarSign, Lock, Eye, Users } from "lucide-react"

export default function WhatIsFraud() {
  const fraudTypes = [
    {
      icon: CreditCard,
      title: "Credit Card Fraud",
      description: "Unauthorized use of credit card information for online purchases and transactions",
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      icon: Globe,
      title: "Identity Theft",
      description: "Using someone else's personal information for fraudulent financial activities",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      icon: Smartphone,
      title: "Mobile Payment Fraud",
      description: "Fraudulent transactions through mobile payment platforms and digital wallets",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: AlertTriangle,
      title: "Account Takeover",
      description: "Unauthorized access to user accounts for malicious financial purposes",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
    {
      icon: DollarSign,
      title: "Payment Fraud",
      description: "Fake transactions and unauthorized money transfers through various channels",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      icon: Lock,
      title: "Data Breach Fraud",
      description: "Using stolen personal data from security breaches for fraudulent activities",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: Eye,
      title: "Social Engineering",
      description: "Manipulating people to divulge confidential information for fraud",
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
    },
    {
      icon: Users,
      title: "Synthetic Identity",
      description: "Creating fake identities using real and fabricated information",
      color: "text-pink-500",
      bgColor: "bg-pink-50",
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
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">What is Online Fraud?</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Online fraud encompasses various deceptive practices aimed at stealing money, personal information, or
            gaining unauthorized access to accounts. Understanding these threats is the first step to protection.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fraudTypes.map((type, index) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${type.bgColor} rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100`}
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 ${type.bgColor} rounded-full mb-4 shadow-sm`}
              >
                <type.icon className={`h-8 w-8 ${type.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{type.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{type.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">$48B</div>
              <div className="text-gray-600">Lost to online fraud annually</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">1 in 4</div>
              <div className="text-gray-600">Businesses affected by fraud</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
              <div className="text-gray-600">Detection accuracy with AI</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
