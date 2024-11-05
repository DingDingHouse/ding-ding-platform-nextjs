import React from "react";
import GameCard from "./GameCard";
import Image from "next/image";

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
        className="flex items-center justify-between duration-500 ease-in-out transition-all transform-3d w-full"
        style={{ transform: `translateX(-${currentIndex * (100 / 5)}%)` }}
      >
        {displayedGames.map((game: any, index: number) => {
          const position = index - currentIndex;

          let rotateY = 0;
          let zIndex = 0;
          let scaleY = 1.3;
          let scaleX = 1;

          if (position === 2) {
            rotateY = 0;
            zIndex = 2;
            scaleY = 1;
            scaleX = 1;
          }
          if (position === 1) {
            rotateY = 15;
            zIndex = 1;
            scaleY = 1.05;
            scaleX = 0.89;
          }
          if (position === 3) {
            rotateY = -15;
            zIndex = 1;
            scaleY = 1.05;
            scaleX = 0.89;
          }
          if (position === 0) {
            rotateY = 25;
            zIndex = 1;
            scaleY = 1.15;
            scaleX = 0.8;
          }
          if (position === 4) {
            rotateY = -25;
            zIndex = 1;
            scaleY = 1.15;
            scaleX = 0.8;
          }

          return (
            <div
              key={index}
              className={`flex-none w-[20%] transition-all duration-500 ${
                index < currentIndex || index >= currentIndex + 5
                  ? "opacity-0"
                  : "opacity-100"
              }`}
              style={{
                transform: `rotateY(${rotateY}deg) scaleY(${scaleY}) scaleX(${scaleX})`,
                zIndex: zIndex,
              }}
            >
              {position === 2 && (
                <div className="h-[118%] absolute w-[116%] top-[-9%] left-[-8%]">
                  <Image
                    src="/card.gif"
                    alt=""
                    quality={100}
                    priority
                    fill
                    sizes={"100%"}
                    className={`z-[-1]`}
                  />
                </div>
              )}
              <GameCard position={position} data={game} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameContainer;
