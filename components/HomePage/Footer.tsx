import Link from "next/link";
import { Button } from "../ui/button";
import { Github, Linkedin, Globe } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 px-6 mt-auto transition-colors duration-200 animate-fade-in">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-gray-600 dark:text-gray-300">
            &copy; {currentYear} DailyDo. Created by  <span className="text-[#3879e2]">Shazin V.</span>
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* GitHub */}
          <Link
            href={process.env.NEXT_PUBLIC_GITHUB_URL || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors"
          >
            <Button variant="ghost" size="icon" className="hover-scale">
              <Github className="h-5 w-5 text-[#3879e2]" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>

          {/* LinkedIn */}
          <Link
            href={process.env.NEXT_PUBLIC_LINKEDIN_URL || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors"
          >
            <Button variant="ghost" size="icon" className="hover-scale">
              <Linkedin className="h-5 w-5 text-[#3879e2]" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </Link>

          {/* Portfolio */}
          <Link
            href={process.env.NEXT_PUBLIC_PORTFOLIO_URL || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors"
          >
            <Button variant="ghost" size="icon" className="hover-scale">
              <Globe className="h-5 w-5 text-[#3879e2]" />
              <span className="sr-only">Portfolio</span>
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  );
}
