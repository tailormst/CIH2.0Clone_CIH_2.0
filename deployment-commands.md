# Backend Deployment Commands

# 1. Install dependencies
pip install -r requirements.txt

# 2. Run migrations
python manage.py makemigrations users
python manage.py makemigrations fraud_detection
python manage.py migrate

# 3. Create superuser (optional)
python manage.py createsuperuser

# 4. Collect static files (for production)
python manage.py collectstatic --noinput

# 5. Run development server
python manage.py runserver 0.0.0.0:8000

# Frontend Deployment Commands

# 1. Install dependencies
npm install

# 2. Set up environment variables
# Copy .env.local.example to .env.local and fill in your values

# 3. Run development server
npm run dev

# 4. Build for production
npm run build

# 5. Start production server
npm start
