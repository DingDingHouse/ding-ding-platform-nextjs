'use client';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      const response = await fetch('/api/auth');
      const data = await response.json();
      setMessage(data.message);
    };

    fetchMessage();
  }, []);

  return (
    <div>
      <h1>Welcome To Dingding Payment Page</h1>
      <p>{message}</p>
    </div>
  );
};

export default Page;