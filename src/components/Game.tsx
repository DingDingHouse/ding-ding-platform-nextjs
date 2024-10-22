"use client";
import React, { useEffect, useState } from "react";
import GameCard from "./GameCard";
import LeftButton from "./svg/LeftButton";
import RightButton from "./svg/RightButton";

const Game = ({ games }: any) => {
  const { others } = games;
  const displayedGames = others?.length > 0 ? others : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = displayedGames.length;

  const handleLeftClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleRightClick = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, totalCards - 5));
  };

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();
      setCurrentIndex((prevIndex) =>
        event.deltaY < 0
          ? Math.max(prevIndex - 1, 0)
          : Math.min(prevIndex + 1, totalCards - 5)
      );
    };

    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [totalCards]);

  return (
    <div className="h-[40vh] sm:h-[40vw] overflow-hidden flex w-100vw relative">
      <div className="flex justify-evenly items-center w-full relative">
        <button
          onClick={handleLeftClick}
          disabled={currentIndex === 0}
          className="disabled:opacity-30"
        >
          <LeftButton />
        </button>
        <div className="relative w-[90%] overflow-hidden">
          <div
            className="flex transition-transform duration-300 perspective transform-3d"
            style={{ transform: `translateX(-${currentIndex * (100 / 5)}%)` }}
          >
            {displayedGames.map((game: any, index: number) => {
              const position = index - currentIndex;

              // Determine the scale based on the position
              let scale = 1;
              if (position === 2) {
                scale = 0.99;
              } else if (position === 1 || position === 3) {
                scale = 1.09;
              } else if (position <= 0 || position >= 4) {
                scale = 1.15;
              }

              return (
                <div
                  key={index}
                  className={`flex-none card w-[20%] transition-opacity duration-300 ${
                    index < currentIndex || index >= currentIndex + 5
                      ? "opacity-0"
                      : "opacity-100"
                  }`}
                  style={{
                    transform: `scaleY(${scale})`,
                  }}
                >
                  <GameCard data={game} />
                </div>
              );
            })}
          </div>
        </div>
        <button
          onClick={handleRightClick}
          disabled={currentIndex >= totalCards - 5}
          className="disabled:opacity-30"
        >
          <RightButton />
        </button>
      </div>
    </div>
  );
};

export default Game;
