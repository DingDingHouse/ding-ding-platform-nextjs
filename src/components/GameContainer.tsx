import React, { useMemo, useCallback } from "react";
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
  const getStyles = useCallback((position: number) => {
    let rotateY = 0, zIndex = 0, scaleY = 1.3, scaleX = 1;

    switch (position) {
      case 2: rotateY = 0; zIndex = 2; scaleY = 1; scaleX = 1; break;
      case 1: rotateY = 15; zIndex = 1; scaleY = 1.05; scaleX = 0.89; break;
      case 3: rotateY = -15; zIndex = 1; scaleY = 1.05; scaleX = 0.89; break;
      case 0: rotateY = 25; zIndex = 1; scaleY = 1.15; scaleX = 0.8; break;
      case 4: rotateY = -25; zIndex = 1; scaleY = 1.15; scaleX = 0.8; break;
    }

    return {
      transform: `rotateY(${rotateY}deg) scaleY(${scaleY}) scaleX(${scaleX})`,
      zIndex,
    };
  }, []);

  const renderedGames = useMemo(() => {
    return displayedGames.map((game: any, index: number) => {
      const position = index - currentIndex;
      const styles = getStyles(position);

      return (
        <div
          key={game.id || index}
          className={`flex-none w-[20%] transition-all ${
            index < currentIndex || index >= currentIndex + 5
              ? "opacity-100"
              : "opacity-100"
          }`}
          style={styles}
        >
          <GameCard position={position} data={game} />
        </div>
      );
    });
  }, [displayedGames, currentIndex, getStyles]);

  return (
    <div
      className="relative w-full  perspective h-full  flex transition-all"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
    >
      <div
        className="flex items-center justify-between ease-in-out transition-all duration-300 sm:duration-500 transform-3d w-full"
        style={{ transform: `translateX(-${currentIndex * (100 / 5)}%)` }}
      >
        {renderedGames}
      </div>
    </div>
  );
};

export default React.memo(GameContainer);