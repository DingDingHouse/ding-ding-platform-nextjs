import React from "react";
import FooterSvg from "./svg/FooterSvg";
import Navigation from "./Navigation";
import GoldElement from "./svg/GoldElement";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="w-full relative flex items-center justify-center">
      <FooterSvg />
      <GoldElement className="absolute bottom-0 landscape:left-[1vw] portrait:left-[1vh] h-full w-[5%]" />
      <div className="absolute bottom-0 left-0 h-10vw w-15vw overflow-hidden">
        <Image
          src="/fotter-coin.gif"
          alt="coin-animation"
          height={100}
          unoptimized
          className="absolute bottom-2vw landscape:left-[-4.5vw] portrait:left-[-4vh] h-full w-full z-[10] rotate-6 scale-125"
          width={100}
        />
      </div>
      <div className="absolute bottom-0 right-0 h-10vw w-15vw overflow-hidden">
        <Image
          src="/fotter-coin.gif"
          alt="coin-animation"
          height={100}
          unoptimized
          className="absolute bottom-2vw landscape:right-[-3.5vw] portrait:right-[-4vh] w-full h-full z-[10] -rotate-6 scale-125"
          width={100}
        />
      </div>
      <GoldElement className="absolute bottom-0 landscape:right-[1vw] portrait:right-[1vh] h-full w-[5%]" />
      <Navigation />
    </div>
  );
};

export default Footer;
