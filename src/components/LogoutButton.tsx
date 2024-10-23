"use client";
import React, { useState } from "react";
import Logout from "./svg/Logout";
import toast from "react-hot-toast";
import Notification from "./Notification";
import { useRouter } from "next/navigation";

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
    router.push("/logout");
    toast.remove();
    toast.custom((t) => (
      <Notification visible={t.visible} message="Logout Successfully" />
    ));
  };

  return (
    <button onClick={handleClick}>
      <Logout />
    </button>
  );
};

export default LogoutButton;
