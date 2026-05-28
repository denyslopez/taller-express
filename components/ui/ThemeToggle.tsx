"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle({ isMobile = false }: { isMobile?: boolean }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Check initial theme class on html tag
    const isLight = document.documentElement.classList.contains("light");
    setTheme(isLight ? "light" : "dark");
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  const buttonClasses = isMobile
    ? "text-te-muted hover:text-te-orange transition-colors duration-300 cursor-pointer select-none outline-none group flex items-center justify-center p-2"
    : "w-10 h-10 rounded-full bg-te-glass-bg border border-te-glass-border hover:border-te-orange/30 hover:bg-te-glass-bg/10 transition-all duration-300 flex items-center justify-center cursor-pointer select-none outline-none group text-te-muted hover:text-te-text";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={buttonClasses}
      aria-label="Cambiar tema"
    >
      <svg
        className="w-5 h-5 transition-transform duration-500 group-hover:rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M10.0018 0.666992C4.85543 0.666992 0.666656 4.85439 0.666656 10.0008C0.666656 15.1471 4.85543 19.3359 10.0018 19.3359C15.1482 19.3359 19.337 15.1471 19.337 10.0008C19.337 4.85439 15.1482 0.666992 10.0018 0.666992ZM10.7212 2.13662C14.7526 2.49852 17.8982 5.87302 17.8982 10.0008C17.8982 14.1285 14.7526 17.503 10.7212 17.8649V2.13662Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
}

