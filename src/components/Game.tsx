"use client"
import React, { useEffect, useState } from "react";

import GameContainer from "./GameContainer";
import Modal from "./Modal";
import Maintenance from "./Maintenance";
import LeftButton from "./svg/LeftButton";
import RightButton from "./svg/RightButton";

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

  const moveLeft = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const moveRight = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, totalCards - 5));
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    const touchPosition = window.innerWidth < 640 ? event.touches[0].clientY : event.touches[0].clientX;
    setTouchStart(touchPosition);
  };

  const handleTouchEnd = () => {
    const distanceMoved = touchStart - touchEnd;
    if (distanceMoved > 50) {
      moveRight();
    } else if (distanceMoved < -50) {
      moveLeft();
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    const touchPosition = window.innerWidth < 640 ? event.touches[0].clientY : event.touches[0].clientX;
    setTouchEnd(touchPosition);
  };

  const handleDragStart = (event: React.DragEvent) => {
    setStartPosition(event.clientX);
  };

  const handleDragEnd = () => {
    const distanceMoved = startPosition - endPosition;
    if (distanceMoved > 50) {
      moveRight();
    } else if (distanceMoved < -50) {
      moveLeft();
    }
    setStartPosition(0);
    setEndPosition(0);
  };

  const handleDrag = (event: React.DragEvent) => {
    setEndPosition(event.clientX);
  };

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      setCurrentIndex((prevIndex) =>
        event.deltaY < 0 ? Math.max(prevIndex - 1, 0) : Math.min(prevIndex + 1, totalCards - 5)
      );
    };

    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [totalCards]);

  useEffect(() => {
    if (games?.isUnderMaintenance) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [games]);

  return (
    <div className="h-[45dvh] sm:h-[40dvw] flex w-100vw relative">
      {!open ? (
        <div className="flex justify-evenly items-center w-[97%] mx-auto relative h-full sm:p-12 ">
            <button
            onClick={moveLeft}
            disabled={currentIndex === 0}
            className="disabled:opacity-30 bg-black p-1 rounded-xl bg-opacity-60 scale-110 z-[99]"
          >
            <LeftButton />
          </button>
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
          
          <button
            onClick={moveRight}
            disabled={currentIndex >= totalCards - 5}
            className="disabled:opacity-30 bg-black p-1 rounded-xl bg-opacity-60 scale-110 z-[99]"
          >
            <RightButton />
          </button>
        </div>
      ) : (
        <Modal
          isOpen={open}
          setOpen={setOpen}
          modalType="Maintenance"
          setModalType={() => {}}
          disableClose={true}
        >
          <Maintenance data={games} />
        </Modal>
      )}
    </div>
  );
};

export default Game;
