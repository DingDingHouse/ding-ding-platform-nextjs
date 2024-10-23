import React from "react";
import NotificationBg from "./svg/NotificationBg";
import { Rubik } from "next/font/google";
import CloseButton from "./svg/CloseButton";
import toast from "react-hot-toast";

const rubik = Rubik({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const Notification = ({
  visible,
  message,
  className,
  showButton,
  onYesClick,
  onClose,
}: any) => {
  return (
    <div
      onClick={() => {
        toast.remove();
      }}
      className={` w-100vw h-100vh z-[99] bg-black bg-opacity-50 flex items-center justify-center fixed top-0 left-0`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`${className} h-[50%] w-[50%] z-[100] flex items-center justify-center relative ${
          visible ? "animate-enter" : "animate-leave"
        }`}
      >
        <NotificationBg />
        <div
          className={`absolute flex flex-col gap-3vw top-auto left-auto w-[60%] sm:w-[65%] ${rubik.className}`}
        >
          <p className="sm:text-[2.5vw] text-[2.5vh] text-white font-[800] text-center stroke uppercase ">
            {message}
          </p>
          {showButton && (
            <div className="flex gap-x-3vw items-center justify-center">
              <button
                onClick={onYesClick}
                className="pb-0-5vw  bg-[#C44C10] rounded-full shadow-sm hover:pb-0 hover:shadow-none transition-all"
              >
                <span className="px-1-2vw py-0-3vw bg-gradient-to-b from-[#00C00D] uppercase font-[700] to-[#016808] border-[0.2vw] border-[#FEEF6C] text-2vw rounded-full">
                  Yes
                </span>
              </button>
              <button
                onClick={onClose}
                className="pb-0-5vw bg-[#C44C10] rounded-full shadow-sm hover:pb-0 transition-all"
              >
                <span className="px-1-2vw py-0-3vw bg-gradient-to-b from-[#C00003] uppercase font-[700] to-[#680103] border-[0.2vw] border-[#FEEF6C] text-2vw rounded-full">
                  No
                </span>
              </button>
            </div>
          )}
        </div>
        {showButton && (
          <button onClick={onClose}>
            <CloseButton className="absolute top-0 sm:right-[6vw] right-[7vh]" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Notification;
