"use client";
import React, { useEffect, useState } from "react";

const Maintenance = ({ data }: any) => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  let intervalId: any;

  useEffect(() => {
    const availableDate: any = new Date(data.availableAt);
    const now: any = new Date();

    const difference: number = availableDate - now;
    if (difference > 0) {
      setTimeRemaining(difference);
      intervalId = setInterval(() => {
        setTimeRemaining((prev) => prev - 1000);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [data.availableAt]);

  useEffect(() => {
    if (timeRemaining < 0) {
      window.location.reload();
      clearInterval(intervalId);
    }
  }, [timeRemaining]);

  const formatTime = (milliseconds: any) => {
    const totalSeconds = Math.max(Math.floor(milliseconds / 1000), 0);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")} : ${String(minutes).padStart(
      2,
      "0"
    )} : ${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-[1.5vw]">
      {timeRemaining > 0 ? (
        <>
          <p className="text-white text-2vw font-[400]">We will be back in</p>
          <div className="bg-gradient-to-b from-[#6D3904] to-[#FD9303] p-0-08vw rounded-2xl min-w-fit w-[90%]">
            <p className="shadow-lg text-white sm:text-[4vw] text-[4vh] bg-gradient-to-b from-[#FF8700] to-[#F2D25B] rounded-2xl border-[0.2vw] w-full text-center border-[#6D3904] font-semibold stroke">
              {formatTime(timeRemaining)}
            </p>
          </div>
        </>
      ) : (
        <p className="text-white text-[3vw] px-2-5vw py-0-8vw bg-gradient-to-b from-[#6D3904] to-[#FD9303] border-[0.2vw] w-[60%] min-w-fit text-center rounded-2xl stroke font-bold">
          The platform is now available 🎉
        </p>
      )}
    </div>
  );
};

export default Maintenance;
