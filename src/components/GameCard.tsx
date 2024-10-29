import Image from "next/image";
import Link from "next/link";
import React from "react";
import GameBorder from "./svg/GameBorder";

const GameCard = ({ position, data }: any) => {
  return (
    <div className="w-full h-full relative flex items-center justify-center perspective">
      {/* {position === 2 && (
        <div className="h-[110%] absolute w-[105%]">
          <Image
            src="/card-animation.gif"
            alt=""
            quality={100}
            priority
            fill
            sizes={"100%"}
            className="z-[1] blur-[1.5px]"
          />
        </div>
      )} */}
      <GameBorder className="h-full w-full mx-auto z-[2]" />
      <Link
        href={`/game/${data?.slug}`}
        className="absolute top-auto left-auto w-[85%] h-[92%] z-[3] transform-3d"
      >
        <Image
          alt={data?.name}
          draggable="false"
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
