"use client";

import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const QRCode = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const currentUrl = window.location.origin;
    setUrl(currentUrl);
  }, []);

  return (
    <div className="h-full text-white flex items-center justify-center">
      <div className=" border p-1 bg-white w-full h-full">
        <QRCodeSVG value={url} className=" w-full h-full" />
      </div>
    </div>
  );
};

export default QRCode;
