import Header from "@/components/header";

export default function Home() {
  return (
    <div className="bg-background text-accent-foreground flex  min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] md:justify-start lg:p-8 dark:bg-[#0a0a0a]">
      <main className="w-full flex flex-col gap-[32px] justify-start items-center">
          <Header />
          
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
