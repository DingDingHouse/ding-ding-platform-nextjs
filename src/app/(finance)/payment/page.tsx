'use client';

import React, { useEffect, useState } from 'react';

interface QRCode {
  name: string;
  image: string;
}

interface PaymentType {
  name: string;
  thumbnail: string; 
  Qrs: QRCode[];
}

const Page = () => {
  const [platformTypes, setPlatformTypes] = useState<PaymentType[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<PaymentType | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPlatformTypes = async () => {
      try {
        const response = await fetch('/api/paymentQrs'); 
        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message || "Something went wrong");
          return;
        }

        setPlatformTypes(data.paymentTypes || []);
      } catch (error) {
        setMessage("Failed to fetch platform types.");
      }
    };

    fetchPlatformTypes();
  }, []);

  return (
    <div>
      <h1>Welcome To Dingding Payment Page</h1>
      
      {message && <p>{message}</p>}

      {/* Payment Type Logos */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {platformTypes.map((platform) => (
          <div 
            key={platform.name}
            style={{
              cursor: 'pointer',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              textAlign: 'center',
              width: '120px'
            }}
            onClick={() => setSelectedPlatform(platform)}
          >
            <img src={platform.thumbnail} alt={platform.name} width="100" />
            
          </div>
        ))}
      </div>

      {/* QR Codes for Selected Payment Type */}
      {selectedPlatform && (
        <div>
          <h2>{selectedPlatform.name} - QR Codes</h2>
          <button onClick={() => setSelectedPlatform(null)}>Back</button>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
            {selectedPlatform.Qrs.length > 0 ? (
              selectedPlatform.Qrs.map((qr) => (
                <div key={qr.name} style={{ textAlign: 'center' }}>
              
                  <img src={qr?qr.image:""} alt={qr.image} width="120" />
                </div>
              ))
            ) : (
              <p>No QR codes available for this payment type.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
