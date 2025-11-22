# 🗄️ MongoDB Setup Guide for Gaupalika Complaint System

This guide will help you set up MongoDB for the Gaupalika Complaint Management System.

## 📋 Prerequisites

1. **Install MongoDB Community Edition**
   - [Download MongoDB Community Server](https://www.mongodb.com/try/download/community)
   - Follow the installation instructions for your operating system

2. **Install MongoDB Compass (Optional but Recommended)**
   - [Download MongoDB Compass](https://www.mongodb.com/products/compass)
   - GUI tool for managing MongoDB databases

## 🚀 Quick Setup (Local MongoDB)

### Step 1: Start MongoDB Service

**On Windows:**
```bash
# Start MongoDB service
net start MongoDB

# Or using MongoDB Compass
# Just open MongoDB Compass and it will connect automatically
```

**On macOS (using Homebrew):**
```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

**On Linux (Ubuntu/Debian):**
```bash
# Start MongoDB service
sudo systemctl start mongod

# Enable MongoDB to start on boot
sudo systemctl enable mongod
```

### Step 2: Verify MongoDB is Running

Open a terminal and run:
```bash
mongosh
```

If successful, you should see:
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017/
Using MongoDB: 7.0.x
Using Mongosh: 1.x.x
```

### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory:
```bash
# Copy the example file
cp backend/config.env.example .env
```

Edit the `.env` file:
```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/gaupalika_complaints

# Other configurations...
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Step 4: Install Dependencies and Setup Database

```bash
# Install all dependencies
npm run install-all

# Setup database with sample data
npm run setup-db
```

### Step 5: Start the Application

```bash
# Start both backend and frontend
npm run dev

# Or start them separately:
# Backend: npm run server
# Frontend: cd frontend && npm start
```

## 🌐 MongoDB Atlas Setup (Cloud Database)

If you prefer to use MongoDB Atlas (cloud database):

### Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (free tier available)

### Step 2: Get Connection String

1. In your Atlas dashboard, click "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password

### Step 3: Update Environment Variables

```env
# Use your Atlas connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gaupalika_complaints?retryWrites=true&w=majority
```

### Step 4: Setup Database

```bash
npm run setup-db
```

## 🔧 Database Structure

The system will create the following collections:

### `complaints` Collection
```javascript
{
  _id: ObjectId,
  personName: String,
  phone: String,
  email: String,
  address: String,
  wardNumber: Number,
  location: String,
  complaintType: String, // Road, Nala, Water Supply, etc.
  title: String,
  description: String,
  priority: String, // Low, Medium, High, Emergency
  status: String, // Submitted, Under Review, Accepted, In Progress, Resolved, Rejected
  attachments: [{
    filename: String,
    originalName: String,
    path: String,
    uploadedAt: Date
  }],
  qrCode: {
    dataURL: String,
    fileName: String,
    filePath: String
  },
  smsNotifications: [{
    status: String,
    message: String,
    sentAt: Date,
    success: Boolean
  }],
  assignedTo: String,
  resolutionNotes: String,
  acceptedAt: Date,
  acceptedBy: String,
  submittedAt: Date,
  resolvedAt: Date,
  lastUpdated: Date,
  complaintNumber: String // Auto-generated
}
```

## 🛠️ Troubleshooting

### MongoDB Connection Issues

**Error: "MongoServerError: Authentication failed"**
```bash
# Check your connection string and credentials
# Make sure username and password are correct
```

**Error: "MongooseError: Operation `users.insertOne()` buffering timed out"**
```bash
# MongoDB service might not be running
# Start MongoDB service and try again
```

**Error: "MongoNetworkError: failed to connect to server"**
```bash
# Check if MongoDB is running on the correct port (27017)
# Check firewall settings
```

### Common Commands

**Check MongoDB Status:**
```bash
# Windows
sc query MongoDB

# macOS/Linux
brew services list | grep mongodb
# or
sudo systemctl status mongod
```

**Reset Database:**
```bash
# Connect to MongoDB shell
mongosh

# Switch to your database
use gaupalika_complaints

# Drop the database (WARNING: This will delete all data)
db.dropDatabase()

# Exit
exit

# Run setup again
npm run setup-db
```

## 📊 Sample Data

The setup script creates sample complaints for testing:

1. **Road Issue** - Pothole in Thamel (High Priority)
2. **Drainage Issue** - Blocked drainage in Baneshwor (Medium Priority)
3. **Water Supply** - No water in Patan (Emergency Priority)
4. **Waste Management** - Garbage not collected in Bhaktapur (High Priority)
5. **Electricity** - Power outage in Kirtipur (Resolved)

## 🔐 Admin Credentials

After setup, you can login to the admin dashboard with:
- **Username:** `admin`
- **Password:** `admin123`

## 📱 QR Code Generation

The system automatically generates QR codes for:
- Individual complaints (for tracking)
- Location-based QR codes (for quick complaint submission)

QR codes are stored in the `uploads/qr-codes/` directory.

## 📧 SMS Configuration

To enable SMS notifications, configure your SMS provider in the `.env` file:

```env
# Twilio Configuration
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Alternative SMS API
SMS_API_TOKEN=your_sms_api_token
```

## 🚀 Production Deployment

For production deployment:

1. **Use MongoDB Atlas** or a dedicated MongoDB server
2. **Set strong JWT secret** and other security configurations
3. **Configure proper environment variables**
4. **Enable SSL/TLS** for database connections
5. **Set up database backups**

## 📞 Support

If you encounter any issues:

1. Check MongoDB service status
2. Verify connection string
3. Check firewall settings
4. Review MongoDB logs
5. Ensure all dependencies are installed

---

**Happy coding! 🎉**











