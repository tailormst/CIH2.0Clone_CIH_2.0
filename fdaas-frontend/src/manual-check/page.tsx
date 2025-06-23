"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, CheckCircle, Shield, Calendar, MapPin, CreditCard, Clock, TrendingUp } from 'lucide-react'
import Navbar from "@/components/Navbar"

interface FraudCheckResult {
    id: number
    risk_score: number
    status: string
    recommendation: string
    confidence_score: number
    fraud_probability: number
    processing_time: number
    distance_km: number
    city_pop: number
    age: number
    factors: string[]
    model_version: string
}

interface FormData {
    category: string
    amount: string
    sender_city: string
    receiver_city: string
    date_of_birth: string
    has_previous_transaction: boolean
    previous_transaction_date: string
}

export default function ManualCheckPage() {
    const [formData, setFormData] = useState<FormData>({
        category: "",
        amount: "",
        sender_city: "",
        receiver_city: "",
        date_of_birth: "",
        has_previous_transaction: false,
        previous_transaction_date: "",
    })

    const [result, setResult] = useState<FraudCheckResult | null>(null)
    const [loading, setLoading] = useState(false)
    const [cities, setCities] = useState<string[]>([])
    const [categories, setCategories] = useState<{ value: string, label: string }[]>([])

    // Fetch cities and categories on component mount
    useEffect(() => {
        fetchCities()
        fetchCategories()
    }, [])

    const fetchCities = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/cities/`)
            if (response.ok) {
                const data = await response.json()
                setCities(data.cities)
            }
        } catch (error) {
            console.error('Error fetching cities:', error)
            // Fallback cities
            setCities([
                'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai',
                'Kolkata', 'Pune', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur'
            ])
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/categories/`)
            if (response.ok) {
                const data = await response.json()
                setCategories(data.categories)
            }
        } catch (error) {
            console.error('Error fetching categories:', error)
            // Fallback categories
            setCategories([
                { value: 'food_dining', label: 'Food & Dining' },
                { value: 'shopping_pos', label: 'Shopping POS' },
                { value: 'entertainment', label: 'Entertainment' },
                { value: 'gas_transport', label: 'Gas & Transport' },
                { value: 'grocery_pos', label: 'Grocery POS' },
                { value: 'health_fitness', label: 'Health & Fitness' },
                { value: 'travel', label: 'Travel' },
                { value: 'personal_care', label: 'Personal Care' }
            ])
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setResult(null)

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

            // Prepare request data
            const requestData = {
                category: formData.category,
                amount: parseFloat(formData.amount),
                sender_city: formData.sender_city,
                receiver_city: formData.receiver_city,
                date_of_birth: formData.date_of_birth,
                has_previous_transaction: formData.has_previous_transaction,
                previous_transaction_date: formData.has_previous_transaction ? formData.previous_transaction_date : null,
                trans_date_trans_time: new Date().toISOString()
            }

            const response = await fetch(`${apiUrl}/api/check-fraud/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': 'fdaas_demo_key_for_testing' // Demo key for testing
                },
                body: JSON.stringify(requestData)
            })

            if (response.ok) {
                const data = await response.json()
                setResult(data)
            } else {
                const errorData = await response.json()
                console.error('API Error:', errorData)
                alert(`Error: ${errorData.error || 'Failed to check fraud'}`)
            }
        } catch (error) {
            console.error('Error:', error)
            alert('Failed to connect to fraud detection service')
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (field: keyof FormData, value: string | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const getRiskColor = (status: string) => {
        switch (status) {
            case 'high': return 'text-red-600 bg-red-50 border-red-200'
            case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
            case 'low': return 'text-green-600 bg-green-50 border-green-200'
            default: return 'text-gray-600 bg-gray-50 border-gray-200'
        }
    }

    const getRiskIcon = (status: string) => {
        switch (status) {
            case 'high': return <AlertCircle className="h-8 w-8 text-red-600" />
            case 'medium': return <Shield className="h-8 w-8 text-yellow-600" />
            case 'low': return <CheckCircle className="h-8 w-8 text-green-600" />
            default: return <Shield className="h-8 w-8 text-gray-600" />
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Fraud Detection</h1>
                    <p className="text-gray-600">Test our AI-powered fraud detection system with real transaction data</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Input Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5" />
                                Transaction Details
                            </CardTitle>
                            <CardDescription>
                                Enter transaction information for fraud risk analysis
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Category Selection */}
                                <div>
                                    <Label htmlFor="category">Transaction Category</Label>
                                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat.value} value={cat.value}>
                                                    {cat.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Amount */}
                                <div>
                                    <Label htmlFor="amount">Amount (₹ INR)</Label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        step="0.01"
                                        placeholder="10000.00"
                                        value={formData.amount}
                                        onChange={(e) => handleInputChange('amount', e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Cities */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="sender_city">Sender City</Label>
                                        <Select value={formData.sender_city} onValueChange={(value) => handleInputChange('sender_city', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select sender city" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {cities.map((city) => (
                                                    <SelectItem key={city} value={city}>
                                                        {city}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="receiver_city">Receiver City</Label>
                                        <Select value={formData.receiver_city} onValueChange={(value) => handleInputChange('receiver_city', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select receiver city" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {cities.map((city) => (
                                                    <SelectItem key={city} value={city}>
                                                        {city}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Date of Birth */}
                                <div>
                                    <Label htmlFor="date_of_birth">Date of Birth</Label>
                                    <Input
                                        id="date_of_birth"
                                        type="date"
                                        value={formData.date_of_birth}
                                        onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Previous Transaction */}
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="has_previous_transaction"
                                            checked={formData.has_previous_transaction}
                                            onCheckedChange={(checked) => handleInputChange('has_previous_transaction', checked as boolean)}
                                        />
                                        <Label htmlFor="has_previous_transaction">
                                            Have you made a transaction with this person before?
                                        </Label>
                                    </div>

                                    {formData.has_previous_transaction && (
                                        <div>
                                            <Label htmlFor="previous_transaction_date">Previous Transaction Date & Time</Label>
                                            <Input
                                                id="previous_transaction_date"
                                                type="datetime-local"
                                                value={formData.previous_transaction_date}
                                                onChange={(e) => handleInputChange('previous_transaction_date', e.target.value)}
                                                required={formData.has_previous_transaction}
                                            />
                                        </div>
                                    )}
                                </div>

                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Analyzing Transaction...
                                        </>
                                    ) : (
                                        <>
                                            <Shield className="h-4 w-4 mr-2" />
                                            Check for Fraud
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Results */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                AI Fraud Analysis Results
                            </CardTitle>
                            <CardDescription>
                                Advanced machine learning fraud detection results
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {result ? (
                                <div className="space-y-6">
                                    {/* Risk Score */}
                                    <div className="text-center">
                                        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${getRiskColor(result.status)}`}>
                                            {getRiskIcon(result.status)}
                                        </div>

                                        <h3 className="text-3xl font-bold mb-2">
                                            Risk Score: {result.risk_score}/10
                                        </h3>

                                        <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium border ${getRiskColor(result.status)}`}>
                                            {result.status.toUpperCase()} RISK
                                        </div>
                                    </div>

                                    {/* Recommendation */}
                                    <div className={`rounded-lg p-4 border ${getRiskColor(result.status)}`}>
                                        <h4 className="font-semibold mb-2">Recommendation:</h4>
                                        <p className="text-lg font-medium capitalize">{result.recommendation}</p>
                                    </div>

                                    {/* Detailed Analysis */}
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Clock className="h-4 w-4 text-gray-500" />
                                                <span className="font-medium">Processing Time</span>
                                            </div>
                                            <span className="text-lg font-bold">{result.processing_time}ms</span>
                                        </div>

                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <TrendingUp className="h-4 w-4 text-gray-500" />
                                                <span className="font-medium">Confidence</span>
                                            </div>
                                            <span className="text-lg font-bold">{result.confidence_score}%</span>
                                        </div>

                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <MapPin className="h-4 w-4 text-gray-500" />
                                                <span className="font-medium">Distance</span>
                                            </div>
                                            <span className="text-lg font-bold">{result.distance_km?.toFixed(1)} km</span>
                                        </div>

                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Calendar className="h-4 w-4 text-gray-500" />
                                                <span className="font-medium">Age</span>
                                            </div>
                                            <span className="text-lg font-bold">{result.age} years</span>
                                        </div>
                                    </div>

                                    {/* Risk Factors */}
                                    {result.factors && result.factors.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold mb-3">Risk Factors Detected:</h4>
                                            <div className="space-y-2">
                                                {result.factors.map((factor, index) => (
                                                    <div key={index} className="flex items-center gap-2 text-sm">
                                                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                                        <span className="capitalize">{factor.replace(/_/g, ' ')}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Model Info */}
                                    <div className="text-xs text-gray-500 border-t pt-4">
                                        <p>Model Version: {result.model_version}</p>
                                        <p>Fraud Probability: {(result.fraud_probability * 100).toFixed(1)}%</p>
                                        <p>Analysis ID: #{result.id}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500">Submit transaction details to see AI fraud analysis results</p>
                                    <p className="text-sm text-gray-400 mt-2">
                                        Our XGBoost model analyzes multiple factors including location, amount, timing, and user behavior
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Features Info */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <TrendingUp className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="font-semibold mb-2">XGBoost ML Model</h3>
                            <p className="text-sm text-gray-600">
                                Advanced gradient boosting algorithm trained on real fraud data
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <MapPin className="h-6 w-6 text-green-600" />
                            </div>
                            <h3 className="font-semibold mb-2">Geographic Analysis</h3>
                            <p className="text-sm text-gray-600">
                                Distance calculation and city population analysis for risk assessment
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Clock className="h-6 w-6 text-purple-600" />
                            </div>
                            <h3 className="font-semibold mb-2">Temporal Features</h3>
                            <p className="text-sm text-gray-600">
                                Time-based analysis including hour, day, and transaction velocity
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
