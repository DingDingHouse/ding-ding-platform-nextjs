import Game from "@/components/Game";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchGames } from "@/utils/action";
import Image from "next/image";
import { SocketProvider } from "@/components/context/SocketProvider";
import { getCookie } from "@/utils/util";
import type { Metadata } from "next";
import "../globals.css";
import StoreProvider from "@/components/StateProvider";

export const metadata: Metadata = {
  title: "Ding Ding",
  description: "Gaming platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getCookie();
  return (
    <StoreProvider>
      <main className="relative w-full h-full flex items-center justify-center flex-col">
        <SocketProvider token={token as string}>
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
          <Header />
          {children}
          <Footer />
        </SocketProvider>
      </main>
    </StoreProvider>
  );
}
