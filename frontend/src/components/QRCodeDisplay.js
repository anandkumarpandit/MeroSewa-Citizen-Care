import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRCodeDisplay = ({ data, title, size = 200 }) => {
  const [showQR, setShowQR] = React.useState(false);

  const downloadQR = () => {
    const svg = document.getElementById('qrcode-svg');
    if (svg) {
      const serializer = new XMLSerializer();
      const source = serializer.serializeToString(svg);
      const svgBlob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title || 'qr-code'}.svg`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h4 style={{ margin: 0 }}>{title || 'QR Code'}</h4>
      </div>
      <div className="card-body text-center">
        <div style={{ marginBottom: '1rem' }}>
          <button
            className="btn btn-primary"
            onClick={() => setShowQR(!showQR)}
            style={{ marginBottom: '1rem' }}
          >
            {showQR ? 'Hide QR Code' : 'Show QR Code'}
          </button>
        </div>

        {showQR && (
          <div style={{ marginBottom: '1rem' }}>
            <QRCodeSVG
              id="qrcode-svg"
              value={data}
              size={size}
              level="M"
              includeMargin={true}
            />
          </div>
        )}

        {showQR && (
          <div style={{ marginBottom: '1rem' }}>
            <button
              className="btn btn-outline"
              onClick={downloadQR}
              style={{ marginRight: '0.5rem' }}
            >
              Download QR Code
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                navigator.clipboard.writeText(data);
                alert('QR code data copied to clipboard!');
              }}
            >
              Copy Data
            </button>
          </div>
        )}


      </div>
    </div>
  );
};

export default QRCodeDisplay;










