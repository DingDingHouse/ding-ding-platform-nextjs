"use client";
import React, { useEffect, useRef, useState } from "react";
import GameContainer from "./GameContainer";
import Modal from "./Modal";
import Maintenance from "./Maintenance";
import Arrows from "./svg/icons/Arrows";

const Game = ({ games }: any) => {
  const { others } = games;
  const displayedGames = others?.length > 0 ? others : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = displayedGames?.length;
  const [startPosition, setStartPosition] = useState(0);
  const [endPosition, setEndPosition] = useState(0);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isauto, setIsAuto] = useState(false)
 
  
  const moveLeft = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const moveRight = () => {
    if((totalCards-5)===currentIndex){
      setCurrentIndex(0)
    }else{
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, totalCards - 5));
    }
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

  useEffect(() => {
    if (window.innerWidth <= 980 && totalCards > 5&&!isauto) {
      let scrollInProgress = false;
      const scrollDuration = 1000;

      const smoothScrollToNextCard = () => {
        const container = containerRef.current;
        if (!container || scrollInProgress) return;

        scrollInProgress = true;
        const cardWidth = container.scrollWidth / totalCards;
        const maxScrollLeft = container.scrollWidth - container.clientWidth;

        let startTime: any;
        const startScrollLeft = container.scrollLeft;

        const scrollStep = () => {
          if (!startTime) startTime = performance.now();

          const currentTime = performance.now();
          const elapsedTime = currentTime - startTime;
          const scrollProgress = Math.min(elapsedTime / scrollDuration, 1);

          container.scrollLeft = startScrollLeft + scrollProgress * cardWidth;

          if (scrollProgress < 1) {
            requestAnimationFrame(scrollStep);
          } else {
            scrollInProgress = false;

            if (container.scrollLeft + cardWidth >= maxScrollLeft) {
              container.scrollLeft = 0;
            }
          }
        };

        requestAnimationFrame(scrollStep);
      };

      const intervalId = setInterval(() => {
        smoothScrollToNextCard();
      }, 3000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [totalCards,isauto]);

  useEffect(() => {
    if (games?.isUnderMaintenance) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [games]);

  useEffect(() => {
    if (isauto === true) {
      return;
    } else {
      if (totalCards > 1 && window.innerWidth > 980) {
        const intervalId = setInterval(() => {
          moveRight();
        }, 3000);

        return () => clearInterval(intervalId);
      }
    }
  
  }, [totalCards,isauto,currentIndex]);

  const handleMouseEnter = () => {
    setIsAuto(true)
  };

  const handleMouseLeave = () => {
    setIsAuto(false)
  };

   const handleTouchStart=()=>{
    if(window.innerWidth <= 980){
      setIsAuto(true)
    }
   }
   const handelTouchEnd=()=>{
    if(window.innerWidth <= 980){
      setIsAuto(false)
    }
   }

  return (
    <div
      className="h-[45dvh] sm:h-[40dvw] overflow-x-scroll lg:overflow-x-hidden overflow-y-hidden transition-all element w-100vw"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handelTouchEnd}
    >
      {!open ? (
        <div
          ref={containerRef}
          className="flex w-full justify-evenly items-center element overflow-x-scroll lg:overflow-x-hidden lg:overflow-y-hidden transition-all mx-auto relative h-full"
        >
          {displayedGames?.length > 5 && (
            <button
              onClick={moveLeft}
              className="lg:block hidden p-1 fixed top-[47%] left-0 rounded-xl bg-opacity-50 scale-[1.3] z-[99]"
            >
              <Arrows />
            </button>
          )}
          <GameContainer
            displayedGames={displayedGames}
            currentIndex={currentIndex}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
            handleDrag={handleDrag}
          />
          {displayedGames?.length > 5 && (
            <button
              onClick={moveRight}
              className="lg:block hidden rotate-180 p-1 fixed top-[47%] right-0 rounded-xl bg-opacity-50 scale-[1.3] z-[99]"
            >
              <Arrows />
            </button>
          )}
        </div>
      ) : (
        <Modal
          isOpen={open}
          setOpen={setOpen}
          modalType="Maintenance"
          setModalType={() => { }}
          disableClose={true}
        >
          <Maintenance data={games} />
        </Modal>
      )}
    </div>
  );
};

export default Game;
