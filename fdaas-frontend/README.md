# FDaaS - Fraud Detection as a Service (Django Backend)

A comprehensive Django REST API backend for fraud detection using machine learning and rule-based systems.

## 🚀 Features

- **Advanced Fraud Detection**: ML-powered fraud detection with fallback rule-based system
- **User Management**: Complete user lifecycle with Clerk integration
- **API Key Authentication**: Secure API access with usage tracking
- **Rate Limiting**: Flexible rate limiting based on user plans
- **Real-time Analytics**: Comprehensive fraud statistics and reporting
- **Alert System**: Automated alerts for high-risk transactions
- **Blacklist Management**: IP, device, and entity blacklisting
- **Neon PostgreSQL**: Cloud-native database integration
- **Admin Interface**: Django admin for system management

## 🛠️ Tech Stack

- **Framework**: Django 4.2 + Django REST Framework
- **Database**: PostgreSQL (Neon)
- **ML**: scikit-learn, pandas, numpy
- **Authentication**: Custom API key + Clerk integration
- **Deployment**: Railway, Heroku, or Vercel compatible

## 📦 Installation

### Prerequisites
- Python 3.9+
- PostgreSQL (or Neon account)
- Git

### Quick Setup

1. **Clone and setup**:
\`\`\`bash
git clone <your-repo>
cd fdaas-backend
chmod +x setup.sh
./setup.sh
\`\`\`

2. **Configure environment**:
\`\`\`bash
# Update .env file with your credentials
cp .env.example .env
# Edit .env with your Neon database URL and Clerk keys
\`\`\`

3. **Start development server**:
\`\`\`bash
python manage.py runserver
\`\`\`

### Manual Setup

1. **Create virtual environment**:
\`\`\`bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
\`\`\`

2. **Install dependencies**:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

3. **Setup database**:
\`\`\`bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
\`\`\`

4. **Run server**:
\`\`\`bash
python manage.py runserver
\`\`\`

## 🗄️ Database Setup (Neon)

1. **Create Neon account**: Visit [neon.tech](https://neon.tech)
2. **Create new project**: Choose your region
3. **Get connection string**: Copy from Neon dashboard
4. **Update .env**:
\`\`\`env
DATABASE_URL=postgresql://username:password@ep-hostname.us-east-1.aws.neon.tech/dbname?sslmode=require
\`\`\`

## 🔑 API Endpoints

### Authentication
All API requests require `X-API-KEY` header:
\`\`\`bash
X-API-KEY: fdaas_your-api-key-here
\`\`\`

### Core Endpoints

#### Fraud Detection
\`\`\`bash
POST /api/check-fraud/
Content-Type: application/json
X-API-KEY: fdaas_your-api-key

{
  "amount": 250.00,
  "currency": "USD",
  "location": "New York, NY",
  "ip": "192.168.1.1",
  "device": "iPhone 15 Pro",
  "transaction_id": "txn_123",
  "merchant_id": "merchant_456",
  "payment_method": "credit_card"
}
\`\`\`

**Response**:
\`\`\`json
{
  "id": 123,
  "risk_score": 3.2,
  "status": "low",
  "recommendation": "approve",
  "confidence_score": 85.5,
  "processing_time": 45.2,
  "risk_factors": ["amount_analysis", "location_verification"],
  "model_version": "2.0",
  "created_at": "2024-01-15T10:30:00Z"
}
\`\`\`

#### User Management
\`\`\`bash
# Get user info
GET /api/users/info/?clerk_user_id=user_123

# Create user
POST /api/users/create/
{
  "clerk_user_id": "user_123",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe"
}

# Update profile
PUT /api/users/profile/update/
{
  "clerk_user_id": "user_123",
  "company_name": "Tech Corp",
  "website": "https://techcorp.com"
}
\`\`\`

#### Analytics
\`\`\`bash
# Recent activity
GET /api/fraud-checks/recent/?clerk_user_id=user_123&limit=20

# Statistics
GET /api/fraud-checks/statistics/?clerk_user_id=user_123

# API usage
GET /api/users/usage/?clerk_user_id=user_123
\`\`\`

## 🤖 Machine Learning

### Training Your Model

1. **Prepare training data**: CSV with fraud labels
2. **Update training script**: Modify `ml_models/train_model.py`
3. **Train model**:
\`\`\`bash
cd ml_models
python train_model.py
\`\`\`

### Model Requirements

Your model should:
- Accept features: `amount`, `amount_log`, `is_high_amount`, `hour_of_day`, `is_weekend`, `is_high_risk_location`, `is_private_ip`, `is_mobile`, `velocity_score`
- Return fraud probability (0-1)
- Be saved using joblib

### Example Integration
```python
import joblib
from sklearn.ensemble import RandomForestClassifier

# Train your model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Save model
joblib.dump(model, 'ml_models/fraud_model.pkl')
joblib.dump(scaler, 'ml_models/scaler.pkl')
