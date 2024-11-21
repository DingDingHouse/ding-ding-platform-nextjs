"use client";

import React, { useState, useEffect } from "react";
import Portal from "./Portal";
import Loader from "./Loader";

interface FullScreenLoaderProps {
  isLoading: boolean;
}

export default function FullScreenLoader({ isLoading }: FullScreenLoaderProps) {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (isLoading) {
      setOpacity(1);
    } else {
      const timer = setTimeout(() => setOpacity(0), 0); // Start fade-out immediately when isLoading becomes false
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (opacity === 0) return null;

  return (
    <Portal>
      <div
        className="fixed top-0 left-0 w-[100vh] sm:w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-500 "
        style={{ opacity }}
        aria-live="polite"
        aria-busy={isLoading}
      >
        <Loader />
      </div>
    </Portal>
  );
}
