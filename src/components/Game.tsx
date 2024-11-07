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
  const [startPosition, setStartPosition] = useState(0);
  const [endPosition, setEndPosition] = useState(0);
  const [open, setOpen] = useState(false);

  const moveLeft = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const moveRight = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, totalCards - 5));
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
    <div className="h-[45dvh] sm:h-[40dvw] overflow-x-scroll overflow-y-hidden transition-all element">
      {!open ? (
        <div className="flex justify-evenly items-center element  overflow-x-scroll sm:overflow-y-hidden transition-all mx-auto relative  h-full ">
            <button
            onClick={moveLeft}
            className=" sm:block hidden bg-black p-1 fixed top-[47%] left-[2%]  rounded-xl bg-opacity-50 scale-110 z-[99]"
          >
            <LeftButton />
          </button>
          <GameContainer
            draggable="true"
            displayedGames={displayedGames}
            currentIndex={currentIndex}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
            handleDrag={handleDrag}
          />
          
          <button
            onClick={moveRight}
            className=" bg-black  sm:block hidden  p-1 fixed top-[47%] right-[2%]  rounded-xl bg-opacity-50 scale-110 z-[99]"
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
