# ⚡ Admin Login - Quick Reference Card

## 🎯 30 Second Setup

```bash
# 1. Initialize
npm run setup-admin

# 2. Backend
npm start

# 3. Frontend (new terminal)
cd frontend && npm start

# 4. Login
# Go to http://localhost:3000/admin/login
# Username: admin
# Password: Admin@123
```

---

## 📝 Default Credentials

```
Username: admin
Password: Admin@123
Token Duration: 8 hours
```

⚠️ **Change in production!**

---

## 🔌 Essential API Endpoints

### Authentication

| Method | Endpoint           | Auth | Purpose                |
| ------ | ------------------ | ---- | ---------------------- |
| POST   | `/api/auth/login`  | ❌   | Login with credentials |
| POST   | `/api/auth/verify` | ✅   | Verify token validity  |
| GET    | `/api/auth/me`     | ✅   | Get current user       |
| POST   | `/api/auth/logout` | ❌   | Logout                 |

### Admin Operations

| Method | Endpoint                         | Auth | Purpose                 |
| ------ | -------------------------------- | ---- | ----------------------- |
| GET    | `/api/complaints`                | ✅   | List all complaints     |
| PATCH  | `/api/complaints/:id/status`     | ✅   | Update complaint status |
| GET    | `/api/complaints/stats/overview` | ✅   | View statistics         |

### Public Operations

| Method | Endpoint                        | Auth | Purpose          |
| ------ | ------------------------------- | ---- | ---------------- |
| POST   | `/api/complaints/submit`        | ❌   | Submit complaint |
| GET    | `/api/complaints/track/:number` | ❌   | Track complaint  |

---

## 💻 Code Snippets

### Login in React

```javascript
import apiClient from "./services/apiClient";

const handleLogin = async (username, password) => {
  try {
    await apiClient.login(username, password);
    navigate("/admin/dashboard");
  } catch (err) {
    alert(err.message);
  }
};
```

### Protected Route

```javascript
import ProtectedRoute from "./components/ProtectedRoute";

<ProtectedRoute>
  <AdminDashboard />
</ProtectedRoute>;
```

### Authenticated API Call

```javascript
import apiClient from "./services/apiClient";

const complaints = await apiClient.getComplaints(1);
const stats = await apiClient.getComplaintStats();
```

### Get Token

```javascript
const token = localStorage.getItem("authToken");
const user = JSON.parse(localStorage.getItem("user"));
```

---

## 🧪 Test Commands

### cURL Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin@123"}'
```

### Save Token

```bash
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin@123"}' \
  | grep -o '"token":"[^"]*' | cut -d'"' -f4)
```

### Use Token

```bash
curl -X GET http://localhost:5000/api/complaints \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📂 Important Files

```
Backend Authentication:
  ├── /backend/middleware/auth.js
  ├── /backend/routes/auth.js
  └── /backend/models/User.js

Frontend Login:
  ├── /frontend/src/pages/AdminLogin.js
  ├── /frontend/src/pages/AdminLogin.css
  ├── /frontend/src/components/ProtectedRoute.js
  └── /frontend/src/services/apiClient.js

Configuration:
  ├── /env.development
  ├── /package.json
  └── /scripts/setup-admin.js

Documentation:
  ├── /ADMIN_SYSTEM_COMPLETE.md
  ├── /ADMIN_LOGIN_SETUP.md
  ├── /TESTING_GUIDE.md
  └── /IMPLEMENTATION_SUMMARY.md
```

---

## 🔧 Troubleshooting

| Problem                  | Solution                                         |
| ------------------------ | ------------------------------------------------ |
| "Invalid credentials"    | Check ADMIN_USERNAME/PASSWORD in env.development |
| "Token not valid"        | Token expired, login again                       |
| "Admin access required"  | Run `npm run setup-admin`, verify role in DB     |
| MongoDB connection error | Check MongoDB is running, verify MONGODB_URI     |
| CORS error               | Check FRONTEND_URL in env.development            |
| Can't access dashboard   | Clear localStorage, logout, login again          |

---

## 🔐 Security Checklist

- [x] Passwords hashed with bcrypt
- [x] JWT tokens with expiration
- [x] Role-based access control
- [x] Token verification on protected endpoints
- [x] CORS enabled
- [x] Helmet security headers
- [x] Bearer token in Authorization header
- [x] Automatic logout on 401/403

---

## 📊 File Status

| File                 | Status | Modified | Purpose            |
| -------------------- | ------ | -------- | ------------------ |
| auth.js (middleware) | ✅     | Yes      | Token verification |
| auth.js (routes)     | ✅     | Yes      | Login logic        |
| User.js              | ✅     | Yes      | Schema updates     |
| complaints.js        | ✅     | Yes      | Admin protection   |
| env.development      | ✅     | Yes      | Credentials        |
| AdminLogin.js        | ✅     | Created  | Login UI           |
| AdminLogin.css       | ✅     | Created  | Styling            |
| ProtectedRoute.js    | ✅     | Created  | Route protection   |
| apiClient.js         | ✅     | Created  | API utility        |
| setup-admin.js       | ✅     | Created  | Setup script       |

---

## 🚀 Production Checklist

- [ ] Change ADMIN_PASSWORD
- [ ] Change JWT_SECRET
- [ ] Enable HTTPS
- [ ] Set proper CORS origins
- [ ] Add rate limiting
- [ ] Enable logging
- [ ] Set NODE_ENV=production
- [ ] Review security headers
- [ ] Test all endpoints
- [ ] Backup database

---

## 📞 Common Tasks

### Change Admin Password

```bash
# Edit env.development
ADMIN_PASSWORD=NewPassword@123

# Run
npm run setup-admin --update
```

### Update Complaint Status

```javascript
await apiClient.updateComplaintStatus(complaintId, {
  status: "Accepted",
  assignedTo: "Officer Name",
  assignedPhone: "+977...",
  assignedEmail: "email@domain.com",
});
```

### Get Statistics

```javascript
const stats = await apiClient.getComplaintStats();
console.log(stats.data.total);
console.log(stats.data.byStatus);
```

### Logout User

```javascript
apiClient.logout();
// Clears localStorage and redirects to login
```

---

## 🎯 Next Steps

1. ✅ Run setup-admin
2. ✅ Start backend and frontend
3. ✅ Test login
4. 🔄 Integrate with existing admin dashboard
5. 🔄 Update complaint management UI
6. 🔄 Add audit logging
7. 🔄 Implement 2FA (optional)
8. 🔄 Deploy to production

---

## 📚 Documentation Files

- **ADMIN_SYSTEM_COMPLETE.md** - Full implementation details
- **ADMIN_LOGIN_SETUP.md** - Setup and configuration
- **TESTING_GUIDE.md** - Testing procedures
- **IMPLEMENTATION_SUMMARY.md** - File-by-file breakdown

---

**Last Updated: November 15, 2025**  
**System Status: ✅ READY TO USE**

For detailed information, see full documentation files.
