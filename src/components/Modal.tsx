"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ModalBackground from "./svg/ModalBackground";
import CloseButton from "./svg/CloseButton";
import SettingTitle from "./svg/title/SettingTitle";
import { Rubik } from "next/font/google";

const rubik = Rubik({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const Modal = ({
  children,
  isOpen,
  setOpen,
  modalType,
  setModalType,
  disableClose,
}: ModalProps) => {
  const [isOnClient, setIsOnClient] = useState<Boolean>(false);

  useEffect(() => {
    setIsOnClient(true);
  }, []);

  let Modaltitle;
  switch (modalType) {
    case "SETTINGS":
      Modaltitle = <SettingTitle />;
      break;
    default:
      Modaltitle = null;
  }

  const handleClose = () => {
    if (!disableClose) {
      setModalType("");
      setOpen(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  const modalElement = document.getElementById("modal");
  if (!modalElement) {
    console.warn('Element with id "modal" not found');
    return null;
  }

  return isOnClient
    ? ReactDOM.createPortal(
        <div
          onClick={handleClose}
          className={` ${rubik.className} fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#00000096] z-[999]`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-[65%] h-auto relative animate-popup ${
              modalType === "Note"
                ? "-rotate-90 sm:rotate-0 w-[90vw] sm:w-[65%]"
                : ""
            }`}
          >
            <ModalBackground />
            <div className="w-full absolute top-0 left-0 h-full flex flex-col items-center justify-center ">
              <div className=" w-[98.5%] h-[15%] mt-1 absolute top-0 left-0 flex items-center justify-center">
                {Modaltitle}
              </div>
              <div className=" h-[65%] w-[50%]  ">{children}</div>
            </div>

            {!disableClose && (
              <button
                className="absolute right-[-5%] top-[-2%] h-[12%] w-[10%]"
                onClick={handleClose}
              >
                <CloseButton />
              </button>
            )}
          </div>
        </div>,
        modalElement
      )
    : null;
};

export default Modal;
