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
    try {
      Cookies.remove("token");
      toast.remove();
      toast.custom((t) => (
        <Notification visible={t.visible} message="Logout successful" />
      ));
      toast.remove();
      router.push("/login");
    } catch (error) {
      toast.remove();
      toast.custom((t) => (
        <Notification visible={t.visible} message="Failed to logout" />
      ));
      toast.remove();
    }
  };

  return (
    <button aria-label="logout" onClick={handleClick}>
      <LogoutIcon />
    </button>
  );
};

export default LogoutButton;
