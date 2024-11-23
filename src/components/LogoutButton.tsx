"use client";
import React, { useState } from "react";
import LogoutIcon from "./svg/icons/LogoutIcon";
import toast from "react-hot-toast";
import Notification from "./Notification";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const LogoutButton = () => {
  const [duration, setDuration] = useState<any>(Infinity);
  const router = useRouter();

  const handleClick = () => {
    toast.custom(
      (t) => (
        <Notification
          visible={t.visible}
          message={"Are you sure you want to logout?"}
          showButton={true}
          showCloseButton={true}
          onYesClick={handleLogout}
          onClose={() => {
            toast.remove();
          }}
        />
      ),
      {
        duration: duration,
      }
    );
  };

  const handleLogout = () => {
    router?.push('/logout');
    toast.custom((t) => (
      <Notification visible={t.visible} message="Logout successful" />
    ));
    toast.remove();
  };

  return (
    <button aria-label="logout" onClick={handleClick}>
      <LogoutIcon />
    </button>
  );
};

export default LogoutButton;
