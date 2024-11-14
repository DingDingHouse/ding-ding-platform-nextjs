"use client";
import { useAppSelector } from "@/utils/store/hooks";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Loader from "./Loader";
import Portal from "./Portal";
import FullScreenLoader from "./FullScreenLoader";

const UserData = ({ data }: any) => {
  const credits = useAppSelector((state) => state?.user?.credits);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    // Check if credits have been loaded (including zero)
    if (credits !== undefined) {
      timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Ensure loader is visible for at least 1 second after credits are loaded
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [credits]);
  return (
    <>
      <FullScreenLoader isLoading={isLoading} />{" "}
      <div className="flex items-center justify-center gap-1-2vw">
        <div className="bg-gradient-to-b from-[#E9B43F] via-[#C79017] to-[#A97510] p-0-12vw rounded-full">
          <div className="bg-gradient-to-r from-[#A97510] via-[#C79017] to-[#E9B43F] p-0-08vw rounded-full">
            <div className="bg-gradient-to-b from-[#E9B43F] via-[#C79017] to-[#A97510] p-0-12vw rounded-full">
              <div className="relative">
                <Image
                  src="/profile.png"
                  alt={data?.username}
                  className="h-4vw w-4vw"
                  height={80}
                  width={80}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="fle flex-col">
          <p className="text-1-5vw capitalize font-semibold bg-gradient-to-b from-[#A98E44] via-[#F9F2DB] to-[#D7BF7C] bg-clip-text text-transparent">
            {data?.username}
          </p>
          <p className="text-1vw capitalize font-medium bg-gradient-to-b from-[#C79F28] via-[#FFE650] to-[#FFE650] bg-clip-text text-transparent">
            {isLoading ? "Loading..." : credits.toFixed(2)}{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default UserData;
