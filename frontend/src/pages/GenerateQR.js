import React, { useState } from 'react';
import { complaintAPI } from '../services/api';
import QRCodeDisplay from '../components/QRCodeDisplay';

const GenerateQR = () => {
  const [formData, setFormData] = useState({
    location: '',
    wardNumber: '',
    coordinates: {
      lat: '',
      lng: ''
    }
  });
  const [generatedQR, setGeneratedQR] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'lat' || name === 'lng') {
      setFormData(prev => ({
        ...prev,
        coordinates: {
          ...prev.coordinates,
          [name]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setGeneratedQR(null);

    try {
      const response = await complaintAPI.generateLocationQR(formData);
      if (response.data.success) {
        setGeneratedQR(response.data.data);
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
      setError('Failed to generate QR code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      location: '',
      wardNumber: '',
      coordinates: {
        lat: '',
        lng: ''
      }
    });
    setGeneratedQR(null);
    setError('');
  };

  return (
    <div className="container-sm" style={{ padding: '4rem 0' }}>
      <div className="card">
        <div className="card-header">
          <h2 style={{ margin: 0, textAlign: 'center' }}>
            📱 Generate Location QR Code
          </h2>
          <p style={{ textAlign: 'center', margin: '0.5rem 0 0 0', color: '#6c757d' }}>
            Create QR codes for specific locations to enable quick complaint submission
          </p>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Location Name *</label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Thamel Market, Baneshwor Chowk"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Ward Number *</label>
              <select
                className="form-control form-select"
                name="wardNumber"
                value={formData.wardNumber}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Ward Number</option>
                {Array.from({ length: 50 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Ward {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <h4 style={{ marginBottom: '1rem', color: '#667eea' }}>Coordinates (Optional)</h4>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    className="form-control"
                    name="lat"
                    value={formData.coordinates.lat}
                    onChange={handleInputChange}
                    placeholder="27.7172"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    className="form-control"
                    name="lng"
                    value={formData.coordinates.lng}
                    onChange={handleInputChange}
                    placeholder="85.3240"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ fontSize: '1.1rem', padding: '1rem 2rem', marginRight: '1rem' }}
              >
                {loading ? (
                  <>
                    <span className="spinner" style={{ marginRight: '0.5rem' }}></span>
                    Generating...
                  </>
                ) : (
                  'Generate QR Code'
                )}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetForm}
                style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
              >
                Reset
              </button>
            </div>
          </form>

          {generatedQR && (
            <div style={{ marginTop: '3rem' }}>
              <QRCodeDisplay 
                data={generatedQR.url || generatedQR.data?.complaintUrl || generatedQR.dataURL}
                title={`QR Code for ${formData.location}`}
                size={300}
              />
              
              <div className="alert alert-info" style={{ marginTop: '2rem' }}>
                <h4>📋 Instructions:</h4>
                <ol>
                  <li>Download the QR code above</li>
                  <li>Print it and place it at the specified location</li>
                  <li>Citizens can scan this QR code to quickly submit complaints for this location</li>
                  <li>The QR code will auto-fill the location and ward information</li>
                  <li>Scanning will redirect to: <strong>{generatedQR.url || generatedQR.data?.complaintUrl || 'N/A'}</strong></li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateQR;











