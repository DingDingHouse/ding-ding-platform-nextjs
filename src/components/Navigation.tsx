"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Navigation = ({ params }: any) => {
  const pathname = usePathname();
  const data = [
    { name: "all", icon: "/navbar/all.png", link: "/" },
    { name: "slot", icon: "/navbar/slot.png", link: "/slot" },
    { name: "keno", icon: "/navbar/keno.png", link: "/keno" },
    { name: "other", icon: "/navbar/other.png", link: "/other" },
  ];
  return (
    <div className="w-[50%] flex justify-between items-center absolute top-[-2vw] left-auto h-full">
      {data.map((item: any, index: number) => (
        <Link
          key={index}
          href={item.link}
          className="flex flex-col gap-[0.3vw] items-center"
        >
          <div
            className={` ${
              pathname === item.link
                ? "bg-gradient-to-bl from-[#E9B43F] via-[#C79017] to-[#A97510]"
                : ""
            } rounded-full p-0-08vw`}
          >
            <div className="bg-gradient-to-bl from-[#101010] via-[#141414] to-[#6D2800] rounded-full p-0-3vw">
              <div className="bg-gradient-to-bl from-[#E9B43F] via-[#C79017] to-[#A97510] rounded-full p-0-2vw">
                <div className="bg-gradient-to-bl from-[#101010] via-[#141414] to-[#6D2800] rounded-full p-0-5vw">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    height={50}
                    width={50}
                    className={`h-[5vw] w-[5vw] sm:h-[3vw] sm:w-[3vw] ${
                      pathname === item.link ? "animate-bounce" : ""
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
          <p
            className={`text-1-4vw uppercase transition-all duration-300 bg-gradient-to-b bg-clip-text text-transparent ${
              pathname === item.link
                ? "font-[800] from-[#C79F28] via-[#FFE650] to-[#FFE650]"
                : "font-medium  from-[#A98E44] via-[#F9F2DB] to-[#D7BF7C] "
            }`}
          >
            {item.name}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Navigation;
