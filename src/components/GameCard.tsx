import Image from "next/image";
import Link from "next/link";
import React from "react";
import GameBorder from "./svg/GameBorder";

const GameCard = ({ data }: any) => {
  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <GameBorder />
      <Link
        href={`/game/${data?.slug}`}
        className="absolute top-auto left-auto w-[86%] h-[92%]  rounded-rectangle"
      >
        <Image
          alt={data?.name}
          src={data?.thumbnail}
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
