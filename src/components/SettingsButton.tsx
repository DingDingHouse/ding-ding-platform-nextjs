"use client";
import React, { useState } from "react";
import Settings from "./svg/Settings";
import Modal from "./Modal";
import ShareIcon from "./svg/ShareIcon";
import AnnouncementIcon from "./svg/AnnouncementIcon";
import Password from "./svg/Password";
import SoundIcon from "./svg/SoundIcon";
import Notification from "./Notification";
import toast from "react-hot-toast";
import QRcode from "./QRcode";
import { Rubik } from "next/font/google";
import ShareTitle from "./svg/title/ShareTitle";
import AnnouncementTitle from "./svg/title/AnnouncementTitle";
import PasswordTitle from "./svg/title/PasswordTitle";
import SoundTitle from "./svg/title/SoundTitle";
import Sound from "./Sound";
import Announcment from "./Announcment";

const rubik = Rubik({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const SettingsButton = () => {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const handleModalOpen = (type: string) => {
    setModalType(type);
    setOpen(true);
  };

  let ModalContent;
  switch (modalType) {
    case "SETTINGS":
      ModalContent = <SettingContainer />;
      break;
    default:
      ModalContent = null;
  }

  return (
    <>
      <button onClick={() => handleModalOpen("SETTINGS")}>
        <Settings />
      </button>
      <Modal
        isOpen={open}
        setOpen={setOpen}
        modalType={modalType}
        setModalType={setModalType}
      >
        {ModalContent}
      </Modal>
    </>
  );
};

const SettingContainer = () => {
  const data = [
    {
      name: "Share",
      title: <ShareTitle />,
      icon: <ShareIcon />,
      element: <QRcode />,
    },
    {
      name: "Announcement",
      title: <AnnouncementTitle />,
      icon: <AnnouncementIcon />,
      element: <Announcment />,
    },
    {
      name: "Password",
      title: <PasswordTitle />,
      icon: <Password />,
      element: (
        <p className="text-1-5vw font-[600] text-center">
          Contact your agent to change password
        </p>
      ),
    },
    {
      name: "Sound",
      title: <SoundTitle />,
      icon: <SoundIcon />,
      element: <Sound />,
    },
  ];

  const handleSubModal = (element: any, title: any) => {
    toast.custom(
      (t) => (
        <Notification
          visible={t.visible}
          title={title}
          element={element}
          showCloseButton={true}
          onClose={() => {
            toast.remove();
          }}
        />
      ),
      {
        duration: Infinity,
      }
    );
  };
  return (
    <div
      className={`flex flex-wrap items-center justify-evenly w-full h-full ${rubik.className}`}
    >
      {data.map((item: any, index: number) => (
        <div
          key={index}
          className="bg-gradient-to-b from-[#FF8700] to-[#F2D25B] rounded-xl w-[45%] h-[45%] flex items-center justify-center"
        >
          <button
            onClick={() => handleSubModal(item.element, item.title)}
            className="bg-gradient-to-b from-[#6D3904] to-[#FD9303] rounded-xl h-[97%] w-[98%] shadow-lg flex flex-col items-center justify-center gap-0-5vw"
          >
            <p className="sm:text-[1.6vw] text-[1.5vh] font-[800] text-center text-white stroke">
              {item.name}
            </p>
            <div className="sm:w-[5vw] sm:h-[5vw] w-[5vh] h-[5vh]">
              {item.icon}
            </div>
          </button>
        </div>
      ))}
    </div>
  );
};

export default SettingsButton;
