import Navbar from "@/components/Navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">API Documentation</h1>
          <p className="text-gray-600">Learn how to integrate FDaaS fraud detection into your application</p>
        </div>

        <div className="space-y-8">
          {/* Authentication */}
          <Card>
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
              <CardDescription>All API requests require authentication using your API key</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Include your API key in the request header:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{`X-API-KEY: your_api_key_here`}</code>
              </pre>
            </CardContent>
          </Card>

          {/* Fraud Check Endpoint */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Check Transaction Fraud
                <Badge>POST</Badge>
              </CardTitle>
              <CardDescription>Analyze a transaction for potential fraud</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Endpoint</h4>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                  <code>POST https://api.fdaas.com/api/check-fraud/</code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Request Body</h4>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`{
  "amount": 250.00,
  "location": "New York, NY",
  "ip": "192.168.1.1",
  "device": "iPhone 15 Pro"
}`}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Response</h4>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`{
  "risk_score": 3.2,
  "status": "low",
  "recommendation": "approve",
  "factors": [
    "amount_analysis",
    "location_verification",
    "ip_reputation",
    "device_fingerprint"
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* cURL Example */}
          <Card>
            <CardHeader>
              <CardTitle>cURL Example</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{`curl -X POST https://api.fdaas.com/api/check-fraud/ \\
  -H "Content-Type: application/json" \\
  -H "X-API-KEY: your_api_key_here" \\
  -d '{
    "amount": 250.00,
    "location": "New York, NY",
    "ip": "192.168.1.1",
    "device": "iPhone 15 Pro"
  }'`}</code>
              </pre>
            </CardContent>
          </Card>

          {/* JavaScript Example */}
          <Card>
            <CardHeader>
              <CardTitle>JavaScript Example</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{`const checkFraud = async (transactionData) => {
  try {
    const response = await fetch('https://api.fdaas.com/api/check-fraud/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': 'your_api_key_here'
      },
      body: JSON.stringify(transactionData)
    });

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const result = await response.json();
    console.log('Fraud check result:', result);
    return result;
  } catch (error) {
    console.error('Error checking fraud:', error);
    throw error;
  }
};

// Usage
const transaction = {
  amount: 250.00,
  location: "New York, NY",
  ip: "192.168.1.1",
  device: "iPhone 15 Pro"
};

checkFraud(transaction)
  .then(result => {
    if (result.status === 'high') {
      console.log('High risk transaction - block or review');
    } else {
      console.log('Transaction approved');
    }
  })
  .catch(error => {
    console.error('Failed to check fraud:', error);
  });`}</code>
              </pre>
            </CardContent>
          </Card>

          {/* Error Handling */}
          <Card>
            <CardHeader>
              <CardTitle>Error Handling</CardTitle>
              <CardDescription>Common error responses and how to handle them</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">401 Unauthorized</h4>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                    <code>{`{
  "error": "Invalid API key",
  "code": "INVALID_API_KEY"
}`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">429 Too Many Requests</h4>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                    <code>{`{
  "error": "Rate limit exceeded",
  "code": "RATE_LIMIT_EXCEEDED",
  "retry_after": 3600
}`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">400 Bad Request</h4>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                    <code>{`{
  "error": "Invalid request data",
  "code": "VALIDATION_ERROR",
  "details": {
    "amount": ["This field is required"]
  }
}`}</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rate Limits */}
          <Card>
            <CardHeader>
              <CardTitle>Rate Limits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Free Plan</span>
                  <Badge variant="secondary">10 requests/day</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Pro Plan</span>
                  <Badge>Unlimited</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
