"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const DeleteUser = ({ deleteToken }: { deleteToken: () => Promise<void> }) => {
  const router = useRouter();
  useEffect(() => {
    const performLogout = async () => {
      try {
        await deleteToken();
        router.push("/login");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };

    performLogout(); // Immediately call the logout function on mount
  }, [deleteToken]); // Run effect when deleteToken changes

  return null; // No UI is rendered
};

export default DeleteUser;
