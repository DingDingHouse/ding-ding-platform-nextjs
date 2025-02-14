import Image from "next/image";
import Link from "next/link";
import React from "react";
import GameBorder from "./svg/GameBorder";

const GameCard = ({ data, displayeGame, middleind }: any) => {
  
  const gameLink = `/game/${data?.slug}${data?.tagName === "SL-FLC" ? "?view=portrait" : ""}`;

  return (
    <div className="w-full h-full  transition-all relative flex items-center justify-center   pointer-events-auto">
      <Link
        href={`${gameLink}`}
        className="scale-[.9] relative"
      >
        <Image
          alt={data?.name}
          draggable="false"
          src={data?.thumbnail}
          quality={100}
          priority
          width={3000}
          height={2000}
          className="rounded-[8vw]  sm:rounded-[4vw] lg:rounded-[3vw]  shadow-2xl gameCard"
        />
        {displayeGame?.length>=5&&middleind&&(
            <div className="absolute z-[-3] bottom-0 lg:block hidden left-0 w-full  h-full">
              <Image
                src="/card.gif"
                alt=""
                quality={100}
                priority
                height={4000}
                width={4000}
                className={` h-full scale-[1.35] w-full`}
              />
            </div>
          )}
        <GameBorder className="top-0 scale-y-[1.08] scale-x-[1.25] absolute h-full  w-full  z-[-2] " />
      </Link>
    </div>
  );
};

export default GameCard;
