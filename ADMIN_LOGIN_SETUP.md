# Admin Login Setup Guide

## Overview

This project now has a secure admin-only login system with pre-configured credentials. Only admins can access the dashboard and manage complaints.

## Quick Start

### 1. Initialize Admin User

Run the setup script to create the admin user in your database:

```bash
npm run setup-admin
```

Or manually:

```bash
node scripts/setup-admin.js
```

### 2. Default Admin Credentials

- **Username:** `admin`
- **Password:** `Admin@123`

⚠️ **Important:** Change these credentials in production!

### 3. Configure Environment Variables

Edit `env.development` or your production `.env` file:

```env
# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Admin@123

# JWT Secret (keep this secure!)
JWT_SECRET=gaupalika_jwt_secret_key_2024_development
```

## API Endpoints

### Authentication Endpoints

#### 1. Admin Login

- **URL:** `POST /api/auth/login`
- **Body:**
  ```json
  {
    "username": "admin",
    "password": "Admin@123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "user": {
        "id": "...",
        "username": "admin",
        "role": "admin",
        "email": "admin@gaupalika.local"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresIn": "8h"
    },
    "message": "Admin login successful"
  }
  ```

#### 2. Get Current User

- **URL:** `GET /api/auth/me`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** Returns current admin user details

#### 3. Verify Token

- **URL:** `POST /api/auth/verify`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** Validates token and returns user info

#### 4. Logout

- **URL:** `POST /api/auth/logout`
- **Response:** Logout confirmation

### Protected Admin Routes

All complaint management endpoints require authentication AND admin role:

#### Get All Complaints

- **URL:** `GET /api/complaints`
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:** `page`, `status`, `complaintType`, `wardNumber`, `priority`

#### Update Complaint Status

- **URL:** `PATCH /api/complaints/:id/status`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "status": "Accepted",
    "assignedTo": "Officer Name",
    "assignedPhone": "+977...",
    "assignedEmail": "officer@gaupalika.local",
    "resolutionNotes": "..."
  }
  ```

#### Statistics Overview

- **URL:** `GET /api/complaints/stats/overview`
- **Headers:** `Authorization: Bearer <token>`

## Frontend Implementation

### Login Page Example

```javascript
// Login component
const handleLogin = async (username, password) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.success) {
      // Save token to localStorage
      localStorage.setItem("authToken", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      // Redirect to dashboard
      window.location.href = "/admin/dashboard";
    } else {
      alert("Invalid credentials");
    }
  } catch (err) {
    console.error("Login error:", err);
  }
};
```

### API Call with Authentication

```javascript
// Utility function
const apiCall = async (url, options = {}) => {
  const token = localStorage.getItem("authToken");

  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
};

// Example: Get all complaints
const fetchComplaints = async () => {
  const response = await apiCall("http://localhost:5000/api/complaints?page=1");
  const data = await response.json();

  if (!data.success) {
    // Handle unauthorized
    if (response.status === 403) {
      // Redirect to login
      localStorage.clear();
      window.location.href = "/login";
    }
  }

  return data.data;
};
```

## Security Features

✅ **JWT Tokens:** 8-hour expiration for security  
✅ **Password Hashing:** Bcrypt with salt factor 10  
✅ **Role-Based Access Control:** Only admins can access management features  
✅ **Admin Verification:** Checked on every protected endpoint  
✅ **Token Validation:** JWT tokens are validated on each request

## Changing Admin Credentials

To update admin credentials:

### Option 1: Using Setup Script

```bash
node scripts/setup-admin.js --update
```

### Option 2: Direct Database Update

```javascript
const User = require("./backend/models/User");
await User.updateOne({ username: "admin" }, { password: "NewPassword@123" });
```

## Troubleshooting

### Issue: "Invalid admin credentials"

- Verify credentials in `env.development`
- Ensure MongoDB is running
- Check if admin user exists in database

### Issue: "Admin access required"

- User token is valid but role is not 'admin'
- Run setup script: `npm run setup-admin`
- Check user role in database

### Issue: "Token is not valid"

- Token has expired (8 hours)
- User needs to login again
- Check JWT_SECRET matches between frontend and backend

### Issue: "No token, authorization denied"

- Ensure Authorization header is sent
- Token should be in format: `Bearer <token>`

## Testing with cURL

```bash
# 1. Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin@123"}'

# 2. Get complaints (replace TOKEN with actual token)
curl -X GET http://localhost:5000/api/complaints \
  -H "Authorization: Bearer TOKEN"

# 3. Verify token
curl -X POST http://localhost:5000/api/auth/verify \
  -H "Authorization: Bearer TOKEN"
```

## Production Checklist

- [ ] Change `ADMIN_PASSWORD` in `.env`
- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS only
- [ ] Set appropriate CORS origins
- [ ] Implement rate limiting
- [ ] Add audit logging for admin actions
- [ ] Regular security audits

## Database Schema

### User Model

```javascript
{
  username: String (unique, lowercase),
  password: String (hashed),
  email: String (optional),
  role: String (enum: ['admin', 'user', 'moderator']),
  isActive: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Next Steps

1. ✅ Run `npm run setup-admin` to create admin user
2. ✅ Start backend: `npm run dev` or `npm start`
3. ✅ Update frontend login page to use `/api/auth/login`
4. ✅ Protect admin pages with authentication check
5. ✅ Store JWT token in localStorage/sessionStorage
6. ✅ Include token in all API requests

---

For more information, see the main README.md and backend documentation.
