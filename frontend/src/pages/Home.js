import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 'bold' }}>
            🏛️ MeroSewa
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
            Submit, track, and manage your complaints with ease. Your voice matters in building a better community.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/submit" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
              Submit New Complaint
            </Link>
            <Link to="/track" className="btn btn-outline" style={{ fontSize: '1.1rem', padding: '1rem 2rem', color: 'white', borderColor: 'white' }}>
              Track Complaint
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="how-it-works-section">
        <div className="container">
          <h2 className="section-title">
            How It Works
          </h2>
          <div className="how-it-works-grid">
            {/* Submit Complaint */}
            <div className="how-it-works-card">
              <div className="how-it-works-icon">📝</div>
              <h3 className="how-it-works-title">Submit Complaint</h3>
              <p className="how-it-works-description">
                Fill out our simple form with your complaint details, personal information, and location.
              </p>
            </div>

            {/* QR Code Scanning */}
            <div className="how-it-works-card">
              <div className="how-it-works-icon">📱</div>
              <h3 className="how-it-works-title">QR Code Scanning</h3>
              <p className="how-it-works-description">
                Scan QR codes posted around the city to quickly submit location-specific complaints.
              </p>
            </div>

            {/* Track Progress */}
            <div className="how-it-works-card">
              <div className="how-it-works-icon">🔍</div>
              <h3 className="how-it-works-title">Track Progress</h3>
              <p className="how-it-works-description">
                Use your complaint number to track the status and progress of your submitted complaint.
              </p>
            </div>

            {/* Get Resolved */}
            <div className="how-it-works-card">
              <div className="how-it-works-icon">✅</div>
              <h3 className="how-it-works-title">Get Resolved</h3>
              <p className="how-it-works-description">
                Our team works diligently to resolve your complaints and keep you updated throughout the process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Complaint Types Section */}
      <section className="complaint-types-section">
        <div className="container">
          <h2 className="section-title">
            Complaint Types We Handle
          </h2>
          <div className="complaint-grid">
            {/* Road Issues */}
            <div className="complaint-card">
              <div className="card-icon">🛣️</div>
              <div className="card-content">
                <h4 className="card-title">Road Issues</h4>
                <p className="card-description">
                  Report potholes, damaged roads, traffic issues, and road maintenance problems.
                </p>
              </div>
            </div>

            {/* Nala/Drainage */}
            <div className="complaint-card">
              <div className="card-icon">🌊</div>
              <div className="card-content">
                <h4 className="card-title">Nala/Drainage</h4>
                <p className="card-description">
                  Report blocked drains, flooding issues, and water drainage problems.
                </p>
              </div>
            </div>

            {/* Water Supply */}
            <div className="complaint-card">
              <div className="card-icon">💧</div>
              <div className="card-content">
                <h4 className="card-title">Water Supply</h4>
                <p className="card-description">
                  Report water shortage, quality issues, and supply problems.
                </p>
              </div>
            </div>

            {/* Electricity */}
            <div className="complaint-card">
              <div className="card-icon">⚡</div>
              <div className="card-content">
                <h4 className="card-title">Electricity</h4>
                <p className="card-description">
                  Report power outages, electrical hazards, and electricity supply issues.
                </p>
              </div>
            </div>

            {/* Waste Management */}
            <div className="complaint-card">
              <div className="card-icon">🗑️</div>
              <div className="card-content">
                <h4 className="card-title">Waste Management</h4>
                <p className="card-description">
                  Report garbage collection issues, waste disposal problems, and cleanliness concerns.
                </p>
              </div>
            </div>

            {/* Public Health */}
            <div className="complaint-card">
              <div className="card-icon">🏥</div>
              <div className="card-content">
                <h4 className="card-title">Public Health</h4>
                <p className="card-description">
                  Report health hazards, sanitation issues, and public health concerns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '3rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            Ready to Submit Your Complaint?
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9 }}>
            Join thousands of citizens who have already used our system to make their voices heard.
          </p>
          <Link to="/submit" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 2.5rem' }}>
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
