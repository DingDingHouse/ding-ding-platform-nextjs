"use client";
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  ReactNode,
} from "react";

// Define the context type
interface VolumeContextType {
  volume: number;
  updateVolume: (newVolume: number) => void;
  playAudio: () => Promise<void>;
  pauseAudio: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

// Create the context with an initial value of undefined
const VolumeControlContext = createContext<VolumeContextType | undefined>(
  undefined
);

// Custom hook to use the VolumeControlContext
export const useVolumeControl = (): VolumeContextType => {
  const context = useContext(VolumeControlContext);
  if (!context) {
    throw new Error("useVolumeControl must be used within a VolumeProvider");
  }
  return context;
};

// VolumeProvider component
export const VolumeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [volume, setVolume] = useState(1.0); // Default volume
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const updateVolume = (newVolume: number) => {
    const clampedVolume = Math.max(Math.min(newVolume, 1), 0);
    setVolume(clampedVolume);
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
    }
  };

  const playAudio = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
      } catch (err) {
      }
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <VolumeControlContext.Provider
      value={{ volume, updateVolume, playAudio, pauseAudio, audioRef }}
    >
      {children}
    </VolumeControlContext.Provider>
  );
};
