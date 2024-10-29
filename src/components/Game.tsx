"use client";
import React, { useEffect, useState } from "react";
import GameCard from "./GameCard";
import LeftButton from "./svg/LeftButton";
import RightButton from "./svg/RightButton";
import GameContainer from "./GameContainer";
import Modal from "./Modal";
import Maintenance from "./Maintenance";

const Game = ({ games }: any) => {
  const { others } = games;
  const displayedGames = others?.length > 0 ? others : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = displayedGames.length;
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [startPosition, setStartPosition] = useState(0);
  const [endPosition, setEndPosition] = useState(0);
  const [open, setOpen] = useState(false);

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

  const handleDragStart = (event: React.DragEvent) => {
    setStartPosition(event.clientX);
  };

  const handleDrag = (event: React.DragEvent) => {
    setEndPosition(event.clientX);
  };

  const handleDragEnd = () => {
    const distanceMoved = startPosition - endPosition;
    const dragPercentage =
      distanceMoved /
      (window.innerWidth < 640 ? window.innerHeight : window.innerWidth);

    const newIndex = Math.round(
      currentIndex + dragPercentage * displayedGames.length * 0.8
    );
    setCurrentIndex(Math.max(0, Math.min(newIndex, displayedGames.length - 5)));
  };

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
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

  const handleLeftClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleRightClick = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, totalCards - 5));
  };

  useEffect(() => {
    if (games?.isUnderMaintenance) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [games]);

  return (
    <div className="h-[40dvh] sm:h-[40dvw] overflow-hidden flex w-100vw relative">
      {!open ? (
        <div className="flex justify-evenly items-center w-full relative h-full overflow-hidden">
          {/* <button
          onClick={handleLeftClick}
          disabled={currentIndex === 0}
          className="disabled:opacity-30"
        >
          <LeftButton />
        </button> */}

          {/* Game Grid */}
          <GameContainer
            draggable="true"
            displayedGames={displayedGames}
            handleTouchStart={handleTouchStart}
            handleTouchEnd={handleTouchEnd}
            handleTouchMove={handleTouchMove}
            currentIndex={currentIndex}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
            handleDrag={handleDrag}
          />

          {/* <button
          onClick={handleRightClick}
          disabled={currentIndex >= totalCards - 5}
          className="disabled:opacity-30"
        >
          <RightButton />
        </button> */}
        </div>
      ) : (
        <Modal
          isOpen={open}
          setOpen={setOpen}
          modalType="Maintenance"
          setModalType={() => {
            ("");
          }}
          disableClose={true}
        >
          <Maintenance data={games} />
        </Modal>
      )}
    </div>
  );
};

export default Game;
