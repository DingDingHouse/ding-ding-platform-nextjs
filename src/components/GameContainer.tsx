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
    
  }, []);

  const renderedGames = useMemo(() => {
    return displayedGames.map((game: any, index: number) => {
      const position = index - currentIndex;

      return (
        <div
          key={game.id || index}
          className={`flex-none w-[20%] transition-all ${
            index < currentIndex || index >= currentIndex + 5
              ? "opacity-100"
              : "opacity-100"
          }`}
        >
          <GameCard position={position} data={game} />
        </div>
      );
    });
  }, [displayedGames, currentIndex, getStyles]);

  return (
    <div
      className="relative   h-full  flex transition-all"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
    >
      <div
        className="flex items-center justify-between ease-in-out transition-all duration-500 w-full"
        style={{ transform: `translateX(-${currentIndex * (100 / 5)}%)` }}
      >
        {renderedGames}
      </div>
    </div>
  );
};

export default React.memo(GameContainer);