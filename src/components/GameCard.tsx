import Image from "next/image";
import Link from "next/link";
import React from "react";
import GameBorder from "./svg/GameBorder";

const GameCard = ({data}: any) => {
  return (
    <div className="w-full h-full  transition-all relative flex items-center justify-center   pointer-events-auto">
      <GameBorder className="h-full  w-full sm:scale-x-125 sm:scale-y-[1.01] scale-x-100  scale-y-100 lg:scale-x-100  lg:scale-y-100 mx-auto z-[2] " />
      <Link
        href={`/game/${data?.slug}`}
        className="absolute top-auto left-auto  w-[80%] sm:w-[90%] lg:w-[87%] h-[91%] z-[3] "
      >
        <Image
          alt={data?.name}
          draggable="false"
          src={data?.thumbnail}
          quality={100}
          priority
          width={3000}
          height={2000}
          className="rounded-[8vw] h-full sm:rounded-[4vw] shadow-2xl gameCard"
        />
      </Link>
    </div>
  );
};

export default GameCard;
