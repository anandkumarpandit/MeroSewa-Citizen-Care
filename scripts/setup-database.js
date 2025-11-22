const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gaupalika_complaints';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');
    return true;
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    return false;
  }
};

// Create sample data
const createSampleData = async () => {
  try {
    const Complaint = require('../backend/models/Complaint');

    // Check if data already exists
    const existingComplaints = await Complaint.countDocuments();
    if (existingComplaints > 0) {
      console.log(`📊 Database already has ${existingComplaints} complaints`);
      return;
    }

    // Create sample complaints one by one to avoid duplicate key issues
    const sampleComplaints = [
      {
        personName: 'Ram Bahadur',
        phone: '9841234567',
        email: 'ram.bahadur@email.com',
        address: 'Thamel, Kathmandu',
        wardNumber: 1,
        location: 'Thamel',
        complaintType: 'Road',
        title: 'Pothole on main road',
        description: 'There is a large pothole on the main road near Thamel Chowk that is causing traffic problems and damage to vehicles. It has been there for over a month now.',
        priority: 'High',
        status: 'Submitted'
      },
      {
        personName: 'Sita Devi',
        phone: '9842345678',
        email: 'sita.devi@email.com',
        address: 'Baneshwor, Kathmandu',
        wardNumber: 2,
        location: 'Baneshwor',
        complaintType: 'Nala',
        title: 'Blocked drainage system',
        description: 'The drainage system in our area is completely blocked and water is overflowing onto the streets. This is causing health hazards and mosquito breeding.',
        priority: 'Medium',
        status: 'Under Review'
      },
      {
        personName: 'Hari Prasad',
        phone: '9843456789',
        email: 'hari.prasad@email.com',
        address: 'Patan, Lalitpur',
        wardNumber: 3,
        location: 'Patan',
        complaintType: 'Water Supply',
        title: 'No water supply for 3 days',
        description: 'Our area has not received water supply for the past 3 days. This is causing severe inconvenience to all residents in the area.',
        priority: 'Emergency',
        status: 'Accepted'
      },
      {
        personName: 'Gita Thapa',
        phone: '9844567890',
        email: 'gita.thapa@email.com',
        address: 'Bhaktapur, Bhaktapur',
        wardNumber: 4,
        location: 'Bhaktapur',
        complaintType: 'Waste Management',
        title: 'Garbage not collected',
        description: 'The garbage collection service has not been working properly in our area for the past week. Garbage is piling up and creating unhygienic conditions.',
        priority: 'High',
        status: 'In Progress'
      },
      {
        personName: 'Krishna Maharjan',
        phone: '9845678901',
        email: 'krishna.maharjan@email.com',
        address: 'Kirtipur, Kathmandu',
        wardNumber: 5,
        location: 'Kirtipur',
        complaintType: 'Electricity',
        title: 'Power outage issue',
        description: 'Frequent power outages in our area, especially during evenings. This is affecting students and working professionals.',
        priority: 'Medium',
        status: 'Resolved'
      }
    ];

    // Insert sample complaints one by one to avoid duplicate key issues
    const createdComplaints = [];
    for (const complaintData of sampleComplaints) {
      try {
        const complaint = new Complaint(complaintData);
        await complaint.save();
        createdComplaints.push(complaint);
        console.log(`✅ Created complaint: ${complaint.complaintNumber} - ${complaint.title}`);
      } catch (error) {
        console.error(`❌ Error creating complaint: ${error.message}`);
      }
    }
    console.log(`✅ Successfully created ${createdComplaints.length} sample complaints`);

    // Create some QR codes for locations
    const { generateLocationQR } = require('../backend/services/qrService');
    
    const locations = [
      { name: 'Thamel Chowk', wardNumber: 1 },
      { name: 'Baneshwor Chowk', wardNumber: 2 },
      { name: 'Patan Durbar Square', wardNumber: 3 },
      { name: 'Bhaktapur Durbar Square', wardNumber: 4 },
      { name: 'Kirtipur Chowk', wardNumber: 5 }
    ];

    console.log('📱 Generating QR codes for locations...');
    for (const location of locations) {
      try {
        const qrData = await generateLocationQR(location);
        console.log(`✅ Generated QR code for ${location.name}`);
      } catch (error) {
        console.error(`❌ Error generating QR for ${location.name}:`, error.message);
      }
    }

  } catch (error) {
    console.error('❌ Error creating sample data:', error);
  }
};

// Main function
const setupDatabase = async () => {
  console.log('🚀 Setting up Gaupalika Complaint System Database...\n');

  // Connect to database
  const connected = await connectDB();
  if (!connected) {
    process.exit(1);
  }

  // Create sample data
  await createSampleData();

  console.log('\n✅ Database setup completed successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Start the backend server: npm run server');
  console.log('2. Start the frontend: npm run client');
  console.log('3. Access the application at http://localhost:3000');
  console.log('4. Login to admin dashboard with: username: admin, password: admin123');

  // Close connection
  await mongoose.connection.close();
  console.log('\n🔒 Database connection closed');
};

// Run setup if this file is executed directly
if (require.main === module) {
  setupDatabase().catch(error => {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  });
}

module.exports = { setupDatabase, createSampleData };
