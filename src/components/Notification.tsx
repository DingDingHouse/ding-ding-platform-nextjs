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
  title,
  element,
  className,
  showButton,
  showCloseButton,
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
        className={`${className} sm:h-[52vw] h-[52vh] sm:w-[38vw] w-[38vh] z-[100] flex items-center justify-center relative ${
          visible ? "animate-enter" : "animate-leave"
        }`}
      >
        <NotificationBg />
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`absolute flex flex-col h-[20vh] items-center justify-center sm:h-[20vw] top-auto left-auto w-full ${rubik.className}`}
        >
          {/* title text  */}
          {title && (
            <div className="absolute top-[-25%] w-full h-[22%]">{title}</div>
          )}
          {/* close button  */}
          {showCloseButton && (
            <button onClick={onClose}>
              <CloseButton className="absolute top-[-15%] right-0" />
            </button>
          )}
          <div>
            {/* message or title  */}
            <p className="sm:text-[2.5vw] text-[2.5vh] text-white font-[800] text-center stroke uppercase ">
              {message}
            </p>
            {/* element to render in settings button */}
            {element && (
              <div className="h-[16vh] w-full sm:h-[16vw] flex items-center justify-center">
                {element}
              </div>
            )}
          </div>
          {/* confirm button */}
          {showButton && (
            <div className="flex gap-x-3vw items-center justify-center my-[1vw]">
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
      </div>
    </div>
  );
};

export default Notification;
