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
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (event: React.TouchEvent) => {
    window.innerWidth < 640
      ? setTouchStart(event.touches[0].clientY)
      : setTouchStart(event.touches[0].clientX);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    window.innerWidth < 640
      ? setTouchEnd(event.touches[0].clientY)
      : setTouchEnd(event.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const distanceMoved = touchStart - touchEnd;
    const swipePercentage =
      distanceMoved /
      (window.innerWidth < 640 ? window.innerHeight : window.innerWidth);

    const newIndex = Math.round(
      currentIndex + swipePercentage * displayedGames.length * 0.4
    );
    setCurrentIndex(Math.max(0, Math.min(newIndex, displayedGames.length - 5)));
  };

  const handleLeftClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleRightClick = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, totalCards - 5));
  };

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      // event.preventDefault();
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
      <div className="flex justify-evenly items-center w-full relative h-full">
        {/* <button
          onClick={handleLeftClick}
          disabled={currentIndex === 0}
          className="disabled:opacity-30"
        >
          <LeftButton />
        </button> */}
        {/* Game Grid */}
        <div
          className="relative w-[98%] overflow-hidden h-full flex"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex items-center transition-transform duration-500 ease-in-out perspective transform-3d"
            style={{ transform: `translateX(-${currentIndex * (100 / 5)}%)` }}
          >
            {displayedGames.map((game: any, index: number) => {
              const position = index - currentIndex;

              // Determine the scale based on the position
              let scale = 1;
              if (position === 2) {
                scale = 0.85;
              } else if (position === 1 || position === 3) {
                scale = 0.9;
              } else if (position <= 0 || position >= 4) {
                scale = 1.1;
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
                    transform: `scaleY(${scale})`,
                  }}
                >
                  <GameCard position={position} data={game} />
                </div>
              );
            })}
          </div>
        </div>
        {/* <button
          onClick={handleRightClick}
          disabled={currentIndex >= totalCards - 5}
          className="disabled:opacity-30"
        >
          <RightButton />
        </button> */}
      </div>
    </div>
  );
};

export default Game;
