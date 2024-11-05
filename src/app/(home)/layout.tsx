import type { Metadata } from "next";
import "../globals.css";
import StoreProvider from "@/components/StateProvider";
import { SocketProvider } from "@/components/context/SocketProvider";
import { getCookie } from "@/utils/util";

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
    <main className="relative w-full h-full flex items-center justify-center flex-col">
      <StoreProvider>
        <SocketProvider token={token as string}>{children}</SocketProvider>
      </StoreProvider>
    </main>
  );
}
