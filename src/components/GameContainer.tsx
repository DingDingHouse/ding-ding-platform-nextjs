import React, { useMemo, useCallback } from "react";
import GameCard from "./GameCard";
import Image from "next/image";

const GameContainer = ({
  displayedGames,
  currentIndex,
  handleDragStart,
  handleDragEnd,
  handleDrag,
}: any) => {
  const getStyles = useCallback((position: number) => {

  }, []);

  const renderedGames = useMemo(() => {
    return displayedGames.map((game: any, index: number) => {
      const position = index - currentIndex;

      return (
        <div
          key={game.id || index}
          className={`flex-none relative w-[20%] transition-all`}
        >
          {position === 2 && (
            <div className="absolute top-0 sm:block hidden left-0 w-full  scale-110 h-full">
              <Image
                src="/card-animation.gif"
                alt=""
                quality={100}
                priority
                height={4000}
                width={4000}
              
                className={`z-[99]`}
              />
            </div>
          )}
          <GameCard position={position} data={game} />
        </div>
      );
    });
  }, [displayedGames, currentIndex, getStyles]);

  return (
    <div
      className="relative   h-full  flex transition-all"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
    >

      <div
        className="flex items-center  justify-between ease-in-out transition-all duration-200 "
        style={{ transform: `translateX(-${currentIndex * (100 / 5)}%)` }}
      >
        {renderedGames}
      </div>
    </div>
  );
};

export default React.memo(GameContainer);