import Footer from "@/components/Footer";
import Game from "@/components/Game";
import Header from "@/components/Header";
import { fetchGames } from "@/utils/action";
import Image from "next/image";

const Home = async ({ params }: any) => {
  const games = await fetchGames(params?.category);
  return (
    <>
      <Image
        src="/home/bg.png"
        fill
        sizes={"100%"}
        alt="bg"
        priority={true}
        quality={100}
        className="z-[-2] object-cover blur-sm object-center"
      />
      <Image
        src="/home/coin.gif"
        fill
        unoptimized
        sizes={"100%"}
        alt="coin-animation"
        priority={true}
        quality={100}
        className="z-[-1] object-contain blur-md object-center"
      />
      <div className="h-[100vh]  flex flex-col justify-between">
        <Header />
        <Game games={games} />
        <Footer />
      </div>
    </>
  );
};

export default Home;
