"use client";
import React, { useEffect, useRef, useState } from "react";
import GameCard from "./GameCard";
import LeftButton from "./svg/LeftButton";
import RightButton from "./svg/RightButton";

const Game = ({ games }: any) => {
  const { others } = games;
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const displayedGames = [...(others?.length > 0 ? others : [])];
  const chunkArray = (array: any[], size: number) => {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) => ({
      games: array.slice(i * size, i * size + size),
    }));
  };
  const gameChunks = chunkArray(displayedGames, 5);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLeftClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleRightClick = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, gameChunks.length - 1)
    );
  };

  useEffect(() => {
    const element = scrollRef.current;
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();
      if (element) {
        const newIndex =
          event.deltaY < 0
            ? Math.max(currentIndex - 1, 0)
            : Math.min(currentIndex + 1, gameChunks.length - 1);
        setCurrentIndex(newIndex);
      }
    };

    if (element) {
      element.addEventListener("wheel", handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener("wheel", handleScroll);
      }
    };
  }, [currentIndex, gameChunks.length]);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: scrollAmount * currentIndex,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

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
        <div ref={scrollRef} className="flex overflow-x-auto w-[90%]">
          <div className="flex w-auto hideScrollBar">
            {gameChunks.map(
              (chunk, index) =>
                index === currentIndex && (
                  <div
                    key={index}
                    className="grid grid-cols-5 place-content-center justify-items-center w-[90vh] sm:w-[90vw]"
                  >
                    {chunk.games.map((game: any, index: number) => (
                      <GameCard data={game} key={index} />
                    ))}
                  </div>
                )
            )}
          </div>
        </div>
        <button
          onClick={handleRightClick}
          disabled={currentIndex === gameChunks.length - 1}
          className="disabled:opacity-30"
        >
          <RightButton />
        </button>
      </div>
    </div>
  );
};

export default Game;
