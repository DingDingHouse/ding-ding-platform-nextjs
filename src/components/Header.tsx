import React from "react";
import UserData from "./UserData";
import { getUserDetails } from "@/utils/action";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";
import FullScreenButton from "./FullScreenButton";
import SettingsButton from "./SettingsButton";
import { getCookie } from "@/utils/util";
import Jwt from "jsonwebtoken";
import Image from "next/image";

const Header = async () => {
  const user = await getUserDetails();
  if (user?.status === "inactive") {
    redirect("/logout");
  }
  const token:any=await getCookie()
  const decodedToken=await Jwt?.decode(token)
  return (
    <div className="w-full bg-gradient-to-b from-[#A97510] via-[#F0E88C] to-[#E9B43F] pb-0-18vw z-[100] relative">
      <div className="w-full bg-gradient-to-b from-[#A97510] to-[#C79017] pb-0-15vw">
        <div className="w-full bg-gradient-to-r from-[#F0F09B] to-[#E9B43F]  pb-0-18vw">
          <div className="w-full bg-gradient-to-b from-[#2B2B2B] via-[#212121] to-[#101010] flex items-center justify-between px-2-5vw py-0-8vw">
            <UserData data={decodedToken} />
            <Image src={'/home/dingding.gif'} alt="logo" width={500} height={300} quality={100} className="absolute  top-[-20%] left-[50%] translate-x-[-50%] h-auto w-[25%] lg:w-[20%] z-[100]" />
            <div className="flex gap-[1vw] items-center">
              <FullScreenButton />
              <SettingsButton />
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
