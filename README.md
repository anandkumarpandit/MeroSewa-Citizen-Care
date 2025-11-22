# 🏛️ Gaupalika Complaint Management System

A comprehensive web application for managing citizen complaints in Gaupalika (Municipality). Built with Node.js, Express, React, and MongoDB.

## ✨ Features

### For Citizens
- **Submit Complaints**: Easy-to-use form with comprehensive fields
- **QR Code Scanning**: Scan QR codes posted around the city for quick location-based complaints
- **Track Complaints**: Real-time status tracking using complaint numbers
- **SMS Notifications**: Receive SMS updates about complaint status changes
- **File Attachments**: Upload images, documents, and PDFs
- **Multiple Complaint Types**: Road, Nala, Water Supply, Electricity, Waste Management, Public Health
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### For Administrators
- **Admin Dashboard**: Comprehensive management interface
- **Complaint Management**: View, filter, and update complaint status
- **QR Code Generation**: Create QR codes for specific locations
- **SMS Management**: Automatic SMS notifications for status updates
- **Complaint Workflow**: Accept complaints and track resolution progress
- **Statistics**: Overview of complaints by status, type, and ward
- **Status Updates**: Assign complaints and add resolution notes
- **Authentication**: Secure admin login system

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Multer** - File upload handling
- **Express Validator** - Input validation
- **QRCode** - QR code generation
- **Twilio** - SMS notifications

### Frontend
- **React** - Frontend library
- **React Router** - Client-side routing
- **React Hook Form** - Form management
- **Axios** - HTTP client
- **QRCode.react** - QR code display components
- **QR Scanner** - QR code scanning functionality
- **CSS3** - Modern styling with gradients and animations

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher) - [Installation Guide](MONGODB_SETUP.md)
- npm or yarn

## 🗄️ MongoDB Setup

### Quick Setup
1. **Install MongoDB** on your system
2. **Start MongoDB service**
3. **Copy environment file**: `cp env.development .env`
4. **Setup database**: `npm run setup-db`
5. **Test connection**: `npm run test-db`

### Detailed Setup
See [MONGODB_SETUP.md](MONGODB_SETUP.md) for comprehensive MongoDB installation and configuration guide.

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd gaupalika_complain
```

### 2. Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Environment Setup
Copy the development environment file:
```bash
cp env.development .env
```

The `.env` file will contain:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gaupalika_complaints
JWT_SECRET=gaupalika_jwt_secret_key_2024_development
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 4. Database Setup
Setup the database with sample data:
```bash
# Setup database and create sample data
npm run setup-db

# Test database connection
npm run test-db
```

### 5. Run the Application

#### Option 1: Run Both Backend and Frontend Together
```bash
npm run dev
```

#### Option 2: Run Separately

**Backend:**
```bash
npm run server
```

**Frontend (in a new terminal):**
```bash
npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
gaupalika_complain/
├── backend/
│   ├── models/
│   │   └── Complaint.js          # MongoDB schema
│   ├── routes/
│   │   ├── complaints.js         # Complaint API routes
│   │   └── auth.js              # Authentication routes
│   └── server.js                # Express server setup
├── frontend/
│   ├── public/                  # Static files
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   ├── Header.js
│   │   │   └── Footer.js
│   │   ├── pages/               # Page components
│   │   │   ├── Home.js
│   │   │   ├── SubmitComplaint.js
│   │   │   ├── TrackComplaint.js
│   │   │   └── AdminDashboard.js
│   │   ├── services/            # API services
│   │   │   └── api.js
│   │   ├── App.js               # Main App component
│   │   ├── App.css              # Global styles
│   │   └── index.js             # Entry point
│   └── package.json
├── uploads/                     # File uploads directory
├── package.json                 # Root package.json
└── README.md
```

## 🎯 Usage Guide

### For Citizens

#### 1. Submit a Complaint
1. Navigate to the homepage
2. Click "Submit New Complaint"
3. Fill in all required fields:
   - Personal Information (Name, Phone, Email)
   - Address Information (Ward, Location, Full Address)
   - Complaint Details (Type, Title, Description, Priority)
   - Optional file attachments
4. Submit the form
5. Save your complaint number for tracking

#### 2. Track a Complaint
1. Go to "Track Complaint" page
2. Enter your complaint number
3. View current status and progress

### For Administrators

#### 1. Admin Login
- Username: `admin`
- Password: `admin123`

#### 2. Manage Complaints
1. View all complaints with filtering options
2. Click "Update Status" to modify complaint status
3. Assign complaints to staff members
4. Add resolution notes
5. View statistics and analytics

## 📊 API Endpoints

### Complaints
- `POST /api/complaints/submit` - Submit new complaint
- `GET /api/complaints` - Get all complaints (admin)
- `GET /api/complaints/:id` - Get complaint by ID
- `GET /api/complaints/track/:complaintNumber` - Track complaint
- `PATCH /api/complaints/:id/status` - Update complaint status
- `GET /api/complaints/stats/overview` - Get statistics

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user

## 🎨 Features in Detail

### Complaint Types Supported
- **Road Issues**: Potholes, damaged roads, traffic problems
- **Nala/Drainage**: Blocked drains, flooding, water drainage
- **Water Supply**: Shortage, quality issues, supply problems
- **Electricity**: Power outages, electrical hazards
- **Waste Management**: Garbage collection, disposal issues
- **Public Health**: Health hazards, sanitation concerns
- **Other**: Any other municipality-related issues

### Status Workflow
1. **Submitted** - Initial complaint submission (SMS sent to user)
2. **Under Review** - Complaint is being reviewed by admin
3. **Accepted** - Admin accepts the complaint and assigns it (SMS sent to user)
4. **In Progress** - Work has started on the complaint (SMS sent to user)
5. **Resolved** - Complaint has been resolved (SMS sent to user)
6. **Rejected** - Complaint was rejected with reasons (SMS sent to user)

### QR Code Workflow
1. **Generate QR Codes**: Admin creates QR codes for specific locations
2. **Post QR Codes**: Print and place QR codes around the city
3. **Scan & Submit**: Citizens scan QR codes to quickly submit location-specific complaints
4. **Auto-fill Data**: QR codes automatically fill location and ward information
5. **Track & Notify**: Same tracking and SMS notification system applies

### Priority Levels
- **Emergency** - Critical issues requiring immediate attention
- **High** - Important issues that need quick resolution
- **Medium** - Standard priority (default)
- **Low** - Non-urgent issues

## 🔧 Configuration

### Environment Variables
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: Environment (development/production)
- `FRONTEND_URL`: Frontend application URL
- `TWILIO_ACCOUNT_SID`: Twilio account SID for SMS
- `TWILIO_AUTH_TOKEN`: Twilio auth token for SMS
- `TWILIO_PHONE_NUMBER`: Twilio phone number for SMS
- `SMS_API_TOKEN`: Alternative SMS API token

### File Upload Settings
- Maximum file size: 5MB
- Allowed file types: Images, PDFs, Word documents
- Maximum files per complaint: 5

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or local MongoDB instance
2. Configure environment variables
3. Deploy to platforms like Heroku, DigitalOcean, or AWS

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy to platforms like Netlify, Vercel, or GitHub Pages
3. Update API URLs in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: support@gaupalika.gov.np
- Phone: +977-1-XXXXXXX
- Create an issue in the repository

## 🎉 Acknowledgments

- Built for the citizens of Gaupalika
- Designed with accessibility and user experience in mind
- Responsive design for all devices

---

**Made with ❤️ for better governance and citizen services**
