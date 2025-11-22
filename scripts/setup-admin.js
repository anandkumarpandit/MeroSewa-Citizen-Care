#!/usr/bin/env node

/**
 * Setup Admin User Script
 * Initializes the admin user with fixed credentials in the database
 *
 * Usage:
 *   npm run setup-admin
 *   or
 *   node scripts/setup-admin.js
 */

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

// Load environment variables
if (process.env.NODE_ENV === "development") {
  const devEnvPath = path.join(__dirname, "..", "env.development");
  if (fs.existsSync(devEnvPath)) {
    require("dotenv").config({ path: devEnvPath });
  } else {
    require("dotenv").config();
  }
} else {
  require("dotenv").config();
}

// Import User model
const User = require("../backend/models/User");

// Admin credentials
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@123";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@gaupalika.local";

async function setupAdmin() {
  try {
    console.log("🔧 Starting Admin Setup...\n");

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected\n");

    // Check if admin already exists
    let admin = await User.findOne({ username: ADMIN_USERNAME });

    if (admin) {
      console.log("⚠️  Admin user already exists:", ADMIN_USERNAME);
      console.log("📋 Admin Details:");
      console.log(`   - Username: ${admin.username}`);
      console.log(`   - Role: ${admin.role}`);
      console.log(`   - Active: ${admin.isActive}`);
      console.log(`   - Created: ${admin.createdAt}`);
      console.log(`   - Last Login: ${admin.lastLogin || "Never"}\n`);

      const confirmUpdate = process.argv.includes("--update");
      if (confirmUpdate) {
        admin.password = ADMIN_PASSWORD;
        admin.email = ADMIN_EMAIL;
        admin.role = "admin";
        admin.isActive = true;
        await admin.save();
        console.log("✅ Admin credentials updated successfully\n");
      }
    } else {
      // Create new admin user
      admin = new User({
        username: ADMIN_USERNAME,
        password: ADMIN_PASSWORD,
        email: ADMIN_EMAIL,
        role: "admin",
        isActive: true,
      });

      await admin.save();
      console.log("✅ Admin user created successfully!\n");
      console.log("📋 Admin Details:");
    }

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📝 LOGIN CREDENTIALS");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`Username: ${ADMIN_USERNAME}`);
    console.log(`Password: ${ADMIN_PASSWORD}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    console.log("🎯 Next Steps:");
    console.log("1. Start the backend server: npm run dev (or npm start)");
    console.log("2. Login with the credentials above");
    console.log("3. Access admin dashboard at http://localhost:3000/admin\n");

    await mongoose.disconnect();
    console.log("✅ Setup completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Setup failed:", err.message);
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
    process.exit(1);
  }
}

// Run setup
setupAdmin();
