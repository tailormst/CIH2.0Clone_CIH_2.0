import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Zap, BarChart3, Lock, CheckCircle, Activity, ArrowRight, Users, Clock, TrendingUp } from "lucide-react"
import Navbar from "@/components/Navbar"

export default function HomePage() {
    const features = [
        {
            icon: Zap,
            title: "Lightning Fast",
            description: "Get fraud predictions in milliseconds with our optimized ML pipeline",
            benefits: ["Sub-100ms response time", "Real-time processing", "Scalable infrastructure"],
        },
        {
            icon: Shield,
            title: "99.2% Accuracy",
            description: "State-of-the-art XGBoost model trained on millions of transactions",
            benefits: ["Advanced feature engineering", "Continuous model updates", "Low false positive rate"],
        },
        {
            icon: Lock,
            title: "Enterprise Security",
            description: "Bank-grade security with encrypted data transmission and storage",
            benefits: ["End-to-end encryption", "API key authentication", "Secure data handling"],
        },
    ]

    const stats = [
        { number: "99.2%", label: "Accuracy Rate", icon: TrendingUp },
        { number: "50ms", label: "Avg Response Time", icon: Clock },
        { number: "10M+", label: "Transactions Analyzed", icon: BarChart3 },
        { number: "500+", label: "Happy Customers", icon: Users },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />

            {/* Hero Section */}
            <section className="relative py-20 px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">🚀 AI-Powered Fraud Detection</Badge>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Protect Your Business with{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Advanced AI
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Detect fraudulent transactions in real-time with our state-of-the-art machine learning models. Secure, fast,
                        and reliable fraud detection as a service.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/manual-check">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                            >
                                <Activity className="mr-2 h-5 w-5" />
                                Try Manual Check
                            </Button>
                        </Link>
                        <Link href="/dashboard">
                            <Button size="lg" variant="outline" className="border-blue-200 hover:bg-blue-50">
                                <BarChart3 className="mr-2 h-5 w-5" />
                                View Dashboard
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <stat.icon className="h-6 w-6 text-blue-600" />
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose FDaaS?</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Our advanced fraud detection system combines cutting-edge AI with real-world expertise
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                                <CardHeader>
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                        <feature.icon className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <CardTitle>{feature.title}</CardTitle>
                                    <CardDescription>{feature.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        {feature.benefits.map((benefit, benefitIndex) => (
                                            <li key={benefitIndex} className="flex items-center">
                                                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                        <p className="text-lg text-gray-600">Simple integration in three easy steps</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl font-bold text-white">1</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Sign Up & Get API Key</h3>
                            <p className="text-gray-600">
                                Create your account and get instant access to your unique API key for authentication
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl font-bold text-white">2</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Send Transaction Data</h3>
                            <p className="text-gray-600">
                                Send transaction details via our simple REST API with just a few required fields
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl font-bold text-white">3</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Instant Results</h3>
                            <p className="text-gray-600">
                                Receive fraud risk score, recommendation, and detailed analysis in milliseconds
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Secure Your Transactions?</h2>
                    <p className="text-xl mb-8 opacity-90">
                        Join thousands of businesses protecting themselves with AI-powered fraud detection
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/manual-check">
                            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                                <Activity className="mr-2 h-5 w-5" />
                                Try Free Demo
                            </Button>
                        </Link>
                        <Link href="/dashboard">
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-blue-600"
                            >
                                Get Started
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="md:col-span-2">
                            <div className="flex items-center space-x-2 mb-4">
                                <Shield className="h-6 w-6 text-blue-400" />
                                <span className="text-xl font-bold">FDaaS</span>
                            </div>
                            <p className="text-gray-400 mb-4 max-w-md">
                                Advanced fraud detection powered by AI. Protect your business with real-time transaction analysis.
                            </p>
                            <div className="text-sm text-gray-500">© 2024 FDaaS. All rights reserved.</div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Product</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <Link href="/manual-check" className="hover:text-white transition-colors">
                                        Manual Check
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/dashboard" className="hover:text-white transition-colors">
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/docs" className="hover:text-white transition-colors">
                                        API Docs
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Support</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <Link href="/help" className="hover:text-white transition-colors">
                                        Help Center
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="hover:text-white transition-colors">
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/status" className="hover:text-white transition-colors">
                                        Status
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
