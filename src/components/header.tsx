import { Github, Linkedin } from "lucide-react";
import ModeToggle from "@/components/mode_toogle";


export default function Header() {
  return (
    <header className="z-10 w-full flex justify-center mb-6 max-w-[350px] text-sm sm:max-w-4xl md:max-w-4xl lg:max-w-5xl">
      <nav className="flex w-full items-center justify-between space-x-2">
        {/* <AppearanceToggleDropdown /> */}
        <ModeToggle />
        <div className="flex items-center justify-start space-x-2">
          <a
            href="https://www.linkedin.com/in/winnipegdatafan/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white bg-transparent text-white transition-colors hover:bg-white hover:text-black focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
          >
            <Linkedin className="text-accent-foreground h-4 w-4" />
          </a>
          <a
            href="https://github.com/alancj731"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white bg-transparent text-white transition-colors hover:bg-white hover:text-black focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
          >
            <Github className="text-accent-foreground h-4 w-4" />
          </a>
        </div>
      </nav>
    </header>
  );
}
