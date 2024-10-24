import Image from "next/image";
import Link from "next/link";
import React from "react";
import GameBorder from "./svg/GameBorder";

const GameCard = ({ data }: any) => {
  return (
    <div className="w-full h-full relative flex items-center justify-center perspective">
      <GameBorder className="h-full w-full mx-auto" />
      <Link
        href={`/game/${data?.slug}`}
        className="absolute top-auto left-auto w-[85%] h-[92%] transform-3d"
      >
        <Image
          alt={data?.name}
          draggable="false"
          src={data?.thumbnail}
          // src="/maf.png"
          fill
          quality={100}
          priority
          sizes={"100%"}
          className="rounded-[4vw] shadow-2xl gameCard"
        />
      </Link>
    </div>
  );
};

export default GameCard;
