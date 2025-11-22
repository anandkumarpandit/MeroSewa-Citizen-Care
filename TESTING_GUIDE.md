# 🧪 Admin Login System - Testing Guide

## Quick Test (5 minutes)

### 1. Setup Admin User

```bash
npm run setup-admin
```

### 2. Start Backend (Terminal 1)

```bash
npm start
# Output should show: ✅ MongoDB connected
#                   🚀 Server running on port 5000
```

### 3. Start Frontend (Terminal 2)

```bash
cd frontend
npm start
# Output should show: Compiled successfully!
#                   You can now view gaupalika in the browser
```

### 4. Test Login

- Open: http://localhost:3000/admin/login
- Username: `admin`
- Password: `Admin@123`
- Click Login

✅ Should redirect to admin dashboard

---

## 🧬 Unit Tests with cURL

### Test 1: Admin Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "Admin@123"
  }'
```

**Expected Response:**

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

### Test 2: Failed Login (Wrong Password)

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "wrongpassword"
  }'
```

**Expected Response:**

```json
{
  "success": false,
  "message": "Invalid admin credentials"
}
```

### Test 3: Failed Login (Non-existent User)

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "hacker",
    "password": "password"
  }'
```

**Expected Response:**

```json
{
  "success": false,
  "message": "Invalid admin credentials"
}
```

### Test 4: Verify Token (Save token from Test 1 first)

```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

curl -X POST http://localhost:5000/api/auth/verify \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "id": "...",
    "username": "admin",
    "role": "admin",
    "email": "admin@gaupalika.local",
    ...
  },
  "message": "Token is valid"
}
```

### Test 5: Access Protected Endpoint (Without Token)

```bash
curl -X GET http://localhost:5000/api/complaints
```

**Expected Response:**

```json
{
  "success": false,
  "message": "No token, authorization denied"
}
```

### Test 6: Access Protected Endpoint (With Invalid Token)

```bash
curl -X GET http://localhost:5000/api/complaints \
  -H "Authorization: Bearer invalid_token"
```

**Expected Response:**

```json
{
  "success": false,
  "message": "Token is not valid"
}
```

### Test 7: Get Complaints (With Valid Token)

```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

curl -X GET http://localhost:5000/api/complaints \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "complaintNumber": "CMP123456",
      "title": "...",
      "status": "Submitted",
      ...
    }
  ],
  "pagination": {
    "current": 1,
    "total": 5,
    "pages": 1
  }
}
```

### Test 8: Get Statistics (With Valid Token)

```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

curl -X GET http://localhost:5000/api/complaints/stats/overview \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "total": 10,
    "byStatus": [
      { "_id": "Submitted", "count": 5 },
      { "_id": "Accepted", "count": 3 },
      { "_id": "In Progress", "count": 2 }
    ],
    "byType": [
      { "_id": "Water Supply", "count": 4 },
      { "_id": "Road Damage", "count": 6 }
    ],
    "byPriority": [
      { "_id": "High", "count": 3 },
      { "_id": "Medium", "count": 5 },
      { "_id": "Low", "count": 2 }
    ]
  }
}
```

---

## 🔐 Security Tests

### Test 1: Non-Admin User Cannot Access Admin Endpoints

1. Create a regular user in database
2. Login with that user's credentials
3. Try to access `/api/complaints` with the token
4. **Expected:** 403 Forbidden error

### Test 2: Token Expiration

1. Login and get token
2. Wait for token to "expire" (8 hours in production, can modify in development)
3. Try to use expired token
4. **Expected:** 401 Unauthorized

### Test 3: Invalid JWT Secret

1. Change JWT_SECRET in .env
2. Try to use old token
3. **Expected:** Token verification fails

### Test 4: Password Hashing Verification

1. Check database: `db.users.findOne({ username: 'admin' })`
2. Verify password is hashed (not plain text)
3. **Expected:** Password looks like: `$2a$10$...` (bcrypt hash)

---

## 🎯 Browser Testing

### Test 1: Login Page Load

1. Navigate to http://localhost:3000/admin/login
2. **Verify:**
   - [ ] Login form displays
   - [ ] Username field visible
   - [ ] Password field visible
   - [ ] Login button visible
   - [ ] Default credentials hint shown

### Test 2: Successful Login

1. Enter: `admin` / `Admin@123`
2. Click Login
3. **Verify:**
   - [ ] Loading state shows
   - [ ] Redirects to dashboard
   - [ ] Token saved in localStorage
   - [ ] User data saved in localStorage

### Test 3: Failed Login

1. Enter: `admin` / `wrongpass`
2. Click Login
3. **Verify:**
   - [ ] Error message displays
   - [ ] User stays on login page
   - [ ] No token saved

### Test 4: Protected Route Access

1. Logout or clear localStorage
2. Navigate to http://localhost:3000/admin/dashboard
3. **Verify:**
   - [ ] Redirects to login page
   - [ ] Cannot access dashboard without login

### Test 5: Token in LocalStorage

1. Login successfully
2. Open DevTools (F12)
3. Go to Application > Local Storage
4. **Verify:**
   - [ ] `authToken` key exists with JWT token
   - [ ] `user` key exists with JSON user data

---

## 📊 Database Tests

### Test 1: Verify Admin User Created

```javascript
// In MongoDB shell
use gaupalika_complaints
db.users.findOne({ username: 'admin' })

// Should return:
{
  "_id": ObjectId("..."),
  "username": "admin",
  "password": "$2a$10$...",  // hashed
  "email": "admin@gaupalika.local",
  "role": "admin",
  "isActive": true,
  "lastLogin": null,
  "createdAt": ISODate("2024-01-15T..."),
  "updatedAt": ISODate("2024-01-15T...")
}
```

### Test 2: Verify Password Hashing

```javascript
// Password should be hashed, not plain text
db.users.findOne({ username: "admin" }).password;
// Should NOT be: "Admin@123"
// Should be: "$2a$10$..." or similar bcrypt hash
```

### Test 3: Check Multiple Admins (If Added)

```javascript
db.users.find({ role: "admin" }).pretty();
```

---

## 🚀 Performance Tests

### Test 1: Login Response Time

```bash
time curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin@123"}'
```

**Expected:** < 500ms

### Test 2: Get Complaints Response Time

```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

time curl -X GET "http://localhost:5000/api/complaints?page=1" \
  -H "Authorization: Bearer $TOKEN"
```

**Expected:** < 300ms

---

## ✅ Test Checklist

### Authentication

- [ ] Admin login with correct credentials
- [ ] Login fails with wrong password
- [ ] Login fails with non-existent user
- [ ] Token is generated and stored
- [ ] Token can be verified
- [ ] Expired token is rejected

### Authorization

- [ ] Admin can access protected routes
- [ ] Non-admin user cannot access protected routes
- [ ] Missing token is rejected
- [ ] Invalid token is rejected
- [ ] Admin role is verified

### Security

- [ ] Passwords are hashed (not plain text)
- [ ] Tokens are JWT format
- [ ] Password comparison works correctly
- [ ] Token expiration works
- [ ] CORS is enabled for frontend

### Frontend

- [ ] Login page loads
- [ ] Form validation works
- [ ] Error messages display
- [ ] Successful login redirects
- [ ] Protected routes redirect to login
- [ ] Token stored in localStorage
- [ ] User data stored in localStorage

### API

- [ ] Login endpoint works
- [ ] Verify endpoint works
- [ ] Current user endpoint works
- [ ] Logout endpoint works
- [ ] Protected endpoints are secure
- [ ] Public endpoints are accessible

---

## 🐛 Debugging Tips

### Check if MongoDB is running

```bash
mongo
# or
mongosh
```

### Check server logs

```bash
# Look for:
# ✅ MongoDB connected
# 🚀 Server running on port 5000
```

### Check token contents

```javascript
// In browser console
const token = localStorage.getItem("authToken");
const decoded = JSON.parse(atob(token.split(".")[1]));
console.log(decoded);
// Should show: { id: "...", role: "admin", iat: ..., exp: ... }
```

### Check CORS errors

```javascript
// In browser console
// Look for CORS errors in Network tab
// If CORS error, check FRONTEND_URL in env.development
```

### Check network requests

```javascript
// In browser DevTools > Network tab
// 1. Click Login
// 2. Find POST request to /api/auth/login
// 3. Check Response tab for token
// 4. Check Headers tab for Authorization header in subsequent requests
```

---

## 🎓 Learning Resources

- [JWT Documentation](https://jwt.io/)
- [Bcrypt Documentation](https://www.npmjs.com/package/bcryptjs)
- [Express Middleware](https://expressjs.com/en/guide/using-middleware.html)
- [MongoDB Role-Based Access Control](https://www.mongodb.com/docs/)
- [React Authentication Best Practices](https://reactjs.org/docs/jsx-in-depth.html)

---

**Test everything before deploying to production! 🚀**
