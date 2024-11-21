import React, { useMemo } from "react";
import GameCard from "./GameCard";
import Image from "next/image";

const GameContainer = ({
  displayedGames,
  currentIndex,
  handleDragStart,
  handleDragEnd,
  handleDrag,
}: any) => {
  const renderedGames = useMemo(() => {
    return displayedGames?.map((game: any, index: number) => {
      const position = index - currentIndex;
      return (
        <div
          key={game.id || index}
          className={`flex-none relative lg:hover:scale-105  sm:min-w-[20vw]  sm:h-[80%]  sm:w-[20%]  min-w-[20dvh] w-[20%] lg:min-w-[20vw] lg:w-[20%] transition-[2s]`}
        >
          <GameCard displayeGame={displayedGames} middleind={currentIndex + 2 === index} position={position} data={game} />
        </div>
      );
    });
  }, [displayedGames, currentIndex]);

  return (
    <div
      className="relative h-full flex transition-all w-full"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
    >
      <div
        className={`flex items-center  ${
          displayedGames?.length < 5 ? "justify-center" : "justify-start"
        } ease-in-out transition-all duration-200 w-[100%] `}
        style={{ transform: `translateX(-${currentIndex * (100 / 5)}%)` }}
      >
        {renderedGames}
      </div>
    </div>
  );
};

export default React.memo(GameContainer);
