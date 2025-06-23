"use client"

import { motion } from "framer-motion"
import { CheckCircle, Shield, Lock, Eye, Smartphone, Wifi, CreditCard, AlertCircle } from "lucide-react"

export default function PreventionTips() {
  const tips = [
    {
      icon: Lock,
      title: "Strong Passwords",
      description: "Use strong, unique passwords for all accounts with special characters",
      color: "text-blue-500",
    },
    {
      icon: Shield,
      title: "Two-Factor Authentication",
      description: "Enable 2FA whenever possible for an extra layer of security",
      color: "text-green-500",
    },
    {
      icon: Eye,
      title: "Monitor Statements",
      description: "Regularly check your financial statements and transaction history",
      color: "text-purple-500",
    },
    {
      icon: AlertCircle,
      title: "Avoid Phishing",
      description: "Be cautious of suspicious emails, links, and unexpected messages",
      color: "text-red-500",
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Use secure payment methods and trusted platforms for transactions",
      color: "text-indigo-500",
    },
    {
      icon: Smartphone,
      title: "Update Software",
      description: "Keep your devices, browsers, and apps updated with latest security patches",
      color: "text-orange-500",
    },
    {
      icon: Wifi,
      title: "Secure Networks",
      description: "Avoid using public Wi-Fi for sensitive transactions and banking",
      color: "text-teal-500",
    },
    {
      icon: CheckCircle,
      title: "Verify Websites",
      description: "Always check website security certificates and URLs before entering data",
      color: "text-pink-500",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Fraud Prevention Tips</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Protect yourself and your business with these essential security practices. Prevention is always better than
            cure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100"
            >
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center`}>
                  <tip.icon className={`h-6 w-6 ${tip.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{tip.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{tip.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Professional Protection?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            While these tips help with personal security, businesses need advanced AI-powered fraud detection to protect
            against sophisticated attacks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Try Our API
            </button>
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
