"use client";
import React from "react";
import Logout from "./svg/Logout";
import toast from "react-hot-toast";
import Notification from "./Notification";

const LogoutButton = () => {
  const handleClick = () => {
    toast.custom((t) => (
      <Notification
        visible={t.visible}
        message={"Are you sure you want to logout ?"}
        showButton={true}
      />
    ));
  };
  return (
    <button onClick={handleClick}>
      <Logout />
    </button>
  );
};

export default LogoutButton;
