import React, { useMemo } from 'react';
import QRCodeDisplay from '../components/QRCodeDisplay';

const QRInfo = () => {
  const submitUrl = useMemo(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    return `${origin}/submit`;
  }, []);

  return (
    <div className="container-sm" style={{ padding: '4rem 0' }}>
      <div className="card">
        <div className="card-header text-center">
          <h2 style={{ margin: 0 }}>📱 Printable QR for Complaint Submission</h2>
          <p className="text-muted" style={{ margin: 0 }}>Scan to open the complaint form directly.</p>
        </div>
        <div className="card-body">
          <div style={{ maxWidth: 420, margin: '0 auto' }}>
            <QRCodeDisplay data={submitUrl} title="Complaint Form QR" size={320} />
          </div>
          <div className="text-center" style={{ marginTop: '1rem' }}>
            <button className="btn btn-secondary" onClick={() => window.print()}>
              Print QR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRInfo;


