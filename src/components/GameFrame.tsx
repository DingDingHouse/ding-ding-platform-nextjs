"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { config } from "@/utils/config";
import Notification from "./Notification";
import toast from "react-hot-toast";
import { useVolumeControl } from "./context/VolumeControlContext";

const GameFrame = ({ data }: any) => {
  const [iframeKey, setIframeKey] = useState(0);
  const [gameLoaded, setGameLoaded] = useState(false);
  const { playAudio, pauseAudio } = useVolumeControl();

  const router = useRouter();

  useEffect(() => {
    if (data?.message) {
      toast.custom((t) => (
        <Notification visible={t.visible} message={data?.message} />
      ));
      setTimeout(() => {
        router.push("/");
        setGameLoaded(false);
      }, 1500);
      return;
    }
    if (data?.url) {
      setIframeKey((prevKey) => prevKey + 1);
      pauseAudio();
    }
  }, [data]);

  function getToken(cookieName: any) {
    const cookies = document.cookie;
    const cookieArray = cookies.split(";").map((cookie) => cookie.trim());
    const cookieObject: any = {};
    cookieArray.forEach((cookie) => {
      const parts = cookie.split("=");
      const key = decodeURIComponent(parts[0]);
      const value = decodeURIComponent(parts.slice(1).join("="));
      cookieObject[key] = value;
    });

    return cookieObject[cookieName];
  }


  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;

      const iframe = document.getElementById("gameIframe") as HTMLIFrameElement;
      if (message === "authToken") {
        if (iframe.contentWindow) {
          iframe.contentWindow.postMessage(
            {
              type: "authToken",
              cookie: getToken("token"),
              socketURL: config.server,
              console: config.nodeEnv === "production" ? false : true,
              loaderUrl: config.loaderUrl,
            },
            `${data?.url}`
          );
        }
      }

      if (message === "onExit") {
        setGameLoaded(false);
        playAudio();
        router.push("/");
      }

      if (message === "OnEnter") {
        setGameLoaded(true);
      }
    };
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [data, gameLoaded]);

  return (
    <div className="w-full h-full relative">
      {!gameLoaded && data?.url && (
        <iframe
          src={config?.loaderUrl}
          width="100%"
          height="100%"
          id="gameLoader"
          className="absolute top-0 left-0 z-[100]"
        />
      )}
      <iframe
        key={iframeKey}
        src={data?.url}
        width="100%"
        height="100%"
        className={`rounded-lg transition-opacity duration-300`}
        id="gameIframe"
      ></iframe>
    </div>
  );
};

export default GameFrame;
