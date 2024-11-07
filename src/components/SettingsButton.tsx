"use client";
import React, { useState } from "react";
import SettingsIcon from "./svg/icons/SettingsIcon";
import Modal from "./Modal";
import ShareIcon from "./svg/icons/ShareIcon";
import AnnouncementIcon from "./svg/icons/AnnouncementIcon";
import PasswordIcon from "./svg/icons/PasswordIcon";
import SoundIcon from "./svg/icons/SoundIcon";
import Notification from "./Notification";
import toast from "react-hot-toast";
import QRcode from "./QRcode";
import ShareTitle from "./svg/title/ShareTitle";
import AnnouncementTitle from "./svg/title/AnnouncementTitle";
import PasswordTitle from "./svg/title/PasswordTitle";
import SoundTitle from "./svg/title/SoundTitle";
import Sound from "./Sound";
import Announcment from "./Announcment";

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
      <button aria-label="settings" onClick={() => handleModalOpen("SETTINGS")}>
        <SettingsIcon />
      </button>
      <Modal
        isOpen={open}
        setOpen={setOpen}
        modalType={modalType}
        setModalType={setModalType}
        disableClose={false}
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
      icon: <PasswordIcon />,
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
    <div className="flex flex-wrap items-center justify-evenly w-full h-full">
      {data.map((item: any, index: number) => (
        <div
          key={index}
          className="bg-gradient-to-b from-[#FF8700] to-[#F2D25B] rounded-2xl w-[45%] h-[45%] flex items-center justify-center"
        >
          <button
            onClick={() => handleSubModal(item.element, item.title)}
            className="bg-gradient-to-b from-[#6D3904] to-[#FD9303] rounded-2xl h-[97%] w-[98%] shadow-lg flex flex-col items-center justify-center gap-0-5vw"
          >
            <p className="landscape:text-[1.6vw] portrait:text-[1.5vh] font-[800] text-center text-white stroke">
              {item.name}
            </p>
            <div className="landscape:w-[5vw] landscape:h-[5vw] portrait:w-[5vh] portrait:h-[5vh]">
              {item.icon}
            </div>
          </button>
        </div>
      ))}
    </div>
  );
};

export default SettingsButton;
