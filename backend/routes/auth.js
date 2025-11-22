const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";
const ADMIN_REGISTRATION_SECRET = process.env.ADMIN_REGISTRATION_SECRET || "admin_secret_2024";

// ----------------------------------------------------
// ADMIN REGISTRATION
// ----------------------------------------------------
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, registrationSecret } = req.body;

    // Validate required fields
    if (!username || !email || !password || !registrationSecret) {
      return res.json({
        success: false,
        message: "Username, email, password, and registration secret are required",
      });
    }

    // Verify registration secret
    if (registrationSecret !== ADMIN_REGISTRATION_SECRET) {
      return res.json({
        success: false,
        message: "Invalid registration secret. Only authorized personnel can register as admin.",
      });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username: username.toLowerCase() });
    if (existingUser) {
      return res.json({
        success: false,
        message: "Username already exists",
      });
    }

    // Create new admin user
    const newAdmin = new User({
      username: username.toLowerCase(),
      email: email || undefined,
      password: password, // Will be hashed by User model pre-save hook
      role: "admin",
      isActive: true,
    });

    await newAdmin.save();

    return res.json({
      success: true,
      message: "Admin account created successfully. You can now log in.",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
    });
  }
});

// ----------------------------------------------------
// ADMIN LOGIN
// ----------------------------------------------------
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.json({
        success: false,
        message: "Username and password are required",
      });
    }

    // Find user by username
    const user = await User.findOne({ username: username.toLowerCase() });

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check if user is an admin
    if (user.role !== "admin") {
      return res.json({
        success: false,
        message: "Access denied. Admin privileges required.",
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.json({
        success: false,
        message: "Account is deactivated. Please contact administrator.",
      });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Update last login
    await user.updateLastLogin();

    // Create JWT token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    return res.json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
    });
  }
});

// ----------------------------------------------------
// VERIFY TOKEN (Dashboard calls this automatically)
// ----------------------------------------------------
router.get("/me", (req, res) => {
  const authHeader = req.headers.authorization || "";

  if (!authHeader.startsWith("Bearer ")) {
    return res.json({ success: false, message: "No token provided" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.json({ success: true, data: decoded });
  } catch (err) {
    return res.json({ success: false, message: "Invalid token" });
  }
});

// ----------------------------------------------------
// OFFICER LOGIN
// ----------------------------------------------------
// router.post("/officer/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.json({
//         success: false,
//         message: "Email and password are required",
//       });
//     }

//     const Officer = require("../models/Officer");

//     // Find officer by email
//     const officer = await Officer.findOne({ email: email.toLowerCase() }).select('+password');

//     if (!officer) {
//       return res.json({
//         success: false,
//         message: "Invalid credentials",
//       });
//     }

//     // Check if account is active
//     if (!officer.isActive) {
//       return res.json({
//         success: false,
//         message: "Account is deactivated. Please contact administrator.",
//       });
//     }

//     // Verify password
//     const isPasswordValid = await officer.comparePassword(password);

//     if (!isPasswordValid) {
//       return res.json({
//         success: false,
//         message: "Invalid credentials",
//       });
//     }

//     // Create JWT token
//     const token = jwt.sign(
//       {
//         id: officer._id,
//         name: officer.name,
//         email: officer.email,
//         role: "officer",
//       },
//       JWT_SECRET,
//       { expiresIn: "8h" }
//     );

//     return res.json({
//       success: true,
//       message: "Login successful",
//       data: {
//         token,
//         officer: {
//           id: officer._id,
//           name: officer.name,
//           email: officer.email,
//           phone: officer.phone,
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Officer login error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Login failed. Please try again.",
//     });
//   }
// });

// // ----------------------------------------------------
// // OFFICER REGISTRATION (Admin only)
// // ----------------------------------------------------
// router.post("/officer/register", async (req, res) => {
//   try {
//     const { name, email, phone, password } = req.body;

//     // Validate required fields
//     if (!name || !email || !phone || !password) {
//       return res.json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     const Officer = require("../models/Officer");

//     // Check if email already exists
//     const existingOfficer = await Officer.findOne({ email: email.toLowerCase() });
//     if (existingOfficer) {
//       return res.json({
//         success: false,
//         message: "Email already registered",
//       });
//     }

//     // Create new officer
//     const newOfficer = new Officer({
//       name,
//       email: email.toLowerCase(),
//       phone,
//       password,
//       isActive: true,
//     });

//     await newOfficer.save();

//     return res.json({
//       success: true,
//       message: "Officer account created successfully",
//       data: {
//         id: newOfficer._id,
//         name: newOfficer.name,
//         email: newOfficer.email,
//         phone: newOfficer.phone,
//       },
//     });
//   } catch (error) {
//     console.error("Officer registration error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Registration failed. Please try again.",
//     });
//   }
// });

// // ----------------------------------------------------
// // VERIFY OFFICER TOKEN
// // ----------------------------------------------------
// router.get("/officer/me", (req, res) => {
//   const authHeader = req.headers.authorization || "";

//   if (!authHeader.startsWith("Bearer ")) {
//     return res.json({ success: false, message: "No token provided" });
//   }

//   const token = authHeader.replace("Bearer ", "");

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);

//     if (decoded.role !== "officer") {
//       return res.json({ success: false, message: "Invalid token" });
//     }

//     return res.json({ success: true, data: decoded });
//   } catch (err) {
//     return res.json({ success: false, message: "Invalid token" });
//   }
// });

module.exports = router;

