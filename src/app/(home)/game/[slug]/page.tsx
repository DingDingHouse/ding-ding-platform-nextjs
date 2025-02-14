import GameFrame from "@/components/GameFrame";
import { getGameBySlug } from "@/utils/action";
import React from "react";

const page = async ({ params, searchParams }: any) => {
  const gameData = await getGameBySlug(params?.slug);

  return (
    <div className={` ${searchParams?.view==="portrait"?"portrait:rotate-[270deg] portrait:h-[100vh] portrait:w-[100vw] landscape:rotate-[270deg] landscape:h-[100vw] landscape:w-[100vh] landscape:lg:w-full landscape:lg:h-full landscape:lg:rotate-0":"w-full h-full"}`}>
      <GameFrame data={gameData} dimension={searchParams?.view} />
    </div>
  );
};


export default page;
