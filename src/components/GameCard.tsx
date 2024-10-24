import Image from "next/image";
import Link from "next/link";
import React from "react";
import GameBorder from "./svg/GameBorder";
import GameBorder4 from "./svg/GameBorder4";
import GameBorder5 from "./svg/GameBorder5";
import GameBorder2 from "./svg/GameBorder2";
import GameBorder1 from "./svg/GameBorder1";

const GameCard = ({ position, data }: any) => {
  const renderContent = () => {
    switch (position) {
      case 0:
        return <GameBorder1 className="w-[95%] h-full" />;
      case 1:
        return <GameBorder2 className="w-[90%] h-full" />; // Replace with actual component
      case 2:
        return <GameBorder className="w-[85%] h-full" />; // Replace with actual component
      case 3:
        return <GameBorder4 className="w-[90%] h-full" />; // Replace with actual component
      case 4:
        return <GameBorder5 className="w-[95%] h-full" />;
      default:
        return null; // Or another component
    }
  };
  return (
    <div className="w-full h-full relative flex items-center justify-center perspective">
      {renderContent()}
      <Link
        href={`/game/${data?.slug}`}
        className="absolute top-auto left-auto w-[75%] h-[92%] transform-3d"
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
