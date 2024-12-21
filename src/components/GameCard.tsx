'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import GameBorder from "./svg/GameBorder";

export default function GameCard({ data, displayeGame, middleind }:any) {
  const [isAnimating, setIsAnimating] = useState(false)
  const router = useRouter()

  const handleClick = (e:any) => {
    e.preventDefault()
    setIsAnimating(true)
    setTimeout(() => {
      router.push(`/game/${data?.slug}`)
    }, 150) 
  }

  return (
    <div className="w-full cursor-pointer h-full transition-all relative flex items-center justify-center pointer-events-auto">
      <div
        // href={`/game/${data?.slug}`}
        className={`scale-[.9] relative ${isAnimating ? 'card-blast' : ''}`}
        onClick={handleClick}
      >
        <Image
          alt={data?.name}
          draggable="false"
          src={data?.thumbnail}
          quality={100}
          priority
          width={3000}
          height={2000}
          className="landscape:rounded-[8vh] portrait:rounded-[8vw] sm:rounded-[4vw] lg:rounded-[3vw] shadow-2xl gameCard"
        />
        {displayeGame?.length >= 5 && middleind && (
          <div className="absolute z-[-3] bottom-0 lg:block hidden left-0 w-full h-full">
            <Image
              src="/card.gif"
              alt=""
              quality={100}
              priority
              height={4000}
              width={4000}
              className="h-full scale-[1.35] w-full"
            />
          </div>
        )}
        <GameBorder className="top-0 scale-y-[1.08] scale-x-[1.25] absolute h-full w-full z-[-2]" />
      </div>
    </div>
  )
}

