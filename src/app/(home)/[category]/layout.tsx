import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ding Ding",
  description: "Gaming platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative w-full h-full flex items-center justify-center flex-col">
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
    </main>
  );
}
