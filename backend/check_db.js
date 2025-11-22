const mongoose = require("mongoose");
const Complaint = require("./models/Complaint");
require("dotenv").config({ path: "./config.env" });

// Fallback if config.env is not found or empty
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/gaupalika_complaints";

console.log("Connecting to:", MONGODB_URI);

mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        console.log("✅ MongoDB connected");
        try {
            const count = await Complaint.countDocuments();
            console.log(`Total Complaints in DB: ${count}`);

            const complaints = await Complaint.find().limit(5);
            console.log("Sample Complaints:", JSON.stringify(complaints, null, 2));

        } catch (err) {
            console.error("Error querying DB:", err);
        } finally {
            mongoose.connection.close();
        }
    })
    .catch((err) => {
        console.error("❌ MongoDB error:", err);
        process.exit(1);
    });
