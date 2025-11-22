const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  try {
    console.log('🔍 Testing MongoDB connection...\n');
    
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gaupalika_complaints';
    console.log(`📍 Connecting to: ${mongoURI.replace(/\/\/.*@/, '//***:***@')}`);
    
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Successfully connected to MongoDB!');
    
    // Test database operations
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    console.log(`📊 Database: ${db.databaseName}`);
    console.log(`📁 Collections found: ${collections.length}`);
    
    if (collections.length > 0) {
      console.log('   Collections:');
      collections.forEach(col => {
        console.log(`   - ${col.name}`);
      });
    }
    
    // Test basic operations
    const Complaint = require('../backend/models/Complaint');
    const complaintCount = await Complaint.countDocuments();
    console.log(`📝 Total complaints in database: ${complaintCount}`);
    
    console.log('\n🎉 Connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Troubleshooting tips:');
      console.log('1. Make sure MongoDB is running');
      console.log('2. Check if MongoDB is running on port 27017');
      console.log('3. Verify your connection string in .env file');
    }
    
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔒 Connection closed');
  }
};

// Run test
testConnection();











