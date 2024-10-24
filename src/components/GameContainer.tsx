import React from "react";
import GameCard from "./GameCard";

const GameContainer = ({
  displayedGames,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  currentIndex,
  handleDragStart,
  handleDragEnd,
  handleDrag,
}: any) => {
  return (
    <div
      className="relative w-full overflow-hidden perspective h-full flex transition-all duration-500"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
    >
      <div
        className="flex items-center justify-between duration-500 ease-in-out transition-all transform-3d"
        style={{ transform: `translateX(-${currentIndex * (100 / 5)}%)` }}
      >
        {displayedGames.map((game: any, index: number) => {
          const position = index - currentIndex;

          let rotateY = 0;
          let zIndex = 0;
          let scale = 1.3;

          if (position === 2) {
            rotateY = 0;
            zIndex = 2;
            scale = 1;
          }
          if (position === 1) {
            rotateY = 15;
            zIndex = 1;
            scale = 1.1;
          }
          if (position === 3) {
            rotateY = -15;
            zIndex = 1;
            scale = 1.1;
          }
          if (position === 0) {
            rotateY = 25;
            zIndex = 1;
            scale = 1.2;
          }
          if (position === 4) {
            rotateY = -25;
            zIndex = 1;
            scale = 1.2;
          }
          return (
            <div
              key={index}
              className={`flex-none card w-[20%] transition-all duration-500 ${
                index < currentIndex || index >= currentIndex + 5
                  ? "opacity-0"
                  : "opacity-100"
              }`}
              style={{
                transform: `rotateY(${rotateY}deg) scaleY(${scale})`,
                zIndex: zIndex,
              }}
            >
              <GameCard data={game} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameContainer;
