"use client";
import React, { useState } from "react";
import FullScreen from "./svg/FullScreen";
import NormalScreen from "./svg/NormalScreen";

const FullScreenButton = () => {
  const [fullScreen, setFullScreen] = useState(false);

  const fullScreenHandler = () => {
    const doc = document.documentElement;
    if (!document.fullscreenElement) {
      if (doc.requestFullscreen) {
        doc.requestFullscreen();
      } else if ((doc as any).webkitRequestFullscreen) {
        (doc as any).webkitRequestFullscreen();
      } else if ((doc as any).msRequestFullscreen) {
        (doc as any).msRequestFullscreen();
      }
      setFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
      setFullScreen(false);
    }
  };

  return (
    <button onClick={fullScreenHandler} className="transition-all">
      {!fullScreen ? <FullScreen /> : <NormalScreen />}
    </button>
  );
};

export default FullScreenButton;