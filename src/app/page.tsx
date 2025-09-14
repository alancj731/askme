"use client";

import Header from "@/components/header";
import { useTheme } from "next-themes";
import { StarField } from "@/components/star-field";
import ChatBox from "@/components/chatbox";

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className="bg-background text-accent-foreground flex  min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] md:justify-start lg:p-8 dark:bg-[#0a0a0a]">
      <main className="w-full flex flex-col gap-[32px] justify-start items-center">
        <Header />

        <ChatBox />

        <div className="absolute inset-0">
          <StarField
            blurAmount={0}
            appearence={theme as "light" | "dark" | "system"}
          />
        </div>
      </main>
      <footer className="row-start-3 w-full px-4 py-2 flex gap-4 flex-wrap items-center justify-center italic text-sm md:text-base text-center break-words">
        This demo uses TogetherAI free tier, which can be slow or unresponsive at times.
      </footer>
    </div>
  );
}
