import Image from "next/image";
import Link from "next/link";
import React from "react";
import GameBorder from "./svg/GameBorder";

const GameCard = ({ position, data }: any) => {
  return (
    <div className="w-full h-full hover:scale-110 transition-all relative flex items-center justify-center  perspective pointer-events-auto">
      <GameBorder className="h-full w-full mx-auto z-[2] " />
      <Link
        href={`/game/${data?.slug}`}
        className="absolute top-auto left-auto w-[85%] h-[92%] z-[3] "
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
