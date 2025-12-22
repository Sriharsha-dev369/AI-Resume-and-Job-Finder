"use client";
import { useState } from "react";
import { LogOut, Moon, Sun, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  const pathname = usePathname();

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  return (
    <nav className="border-b">
      <div className="flex items-center gap-x-96 py-2 justify-center">
        {/* Left Nav */}
        <div className="flex items-center gap-4">
          <Link
            href="/main/dashboard"
            className={`p-2 rounded-sm ${
              pathname === "/main/dashboard"
                ? "text-pink-600 bg-pink-50 dark:text-[#fb64b6] dark:bg-[#210d1c]"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/main/ai-review"
            className={`p-2 rounded-sm ${
              pathname === "/main/ai-review"
                ? "text-pink-600 bg-pink-50 dark:text-[#fb64b6] dark:bg-[#210d1c]"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800"
            }`}
          >
            AI review
          </Link>
          <Link
            href="/main/jobs"
            className={`p-2 rounded-sm ${
              pathname === "/main/jobs"
                ? "text-pink-600 bg-pink-50 dark:text-[#fb64b6] dark:bg-[#210d1c]"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800"
            }`}
          >
            Jobs
          </Link>
        </div>

        {/* Right Nav */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] shadow-xs py-2 hidden sm:flex bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white h-9 px-4 text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-plus w-4 h-4 mr-1.5"
              aria-hidden="true"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            Create New
          </Link>

          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 p-2 hover:bg-gray-400 dark:hover:bg-gray-800 focus:outline-none rounded-md"
            >
              <img
                alt="p"
                className="h-8 w-8 rounded-full object-cover bg-indigo-600"
              />
              <span className="hidden sm:block font-medium text-sm max-w-32 truncate">
                User name
              </span>
              {open ? (
                <ChevronDown className="rotate-180" />
              ) : (
                <ChevronUp className="rotate-180" />
              )}
            </button>

            {open && (
              <div className="absolute left-0 mt-2 w-40 rounded-md border bg-white shadow-lg dark:bg-gray-900">
                <button
                  className="flex items-center text-sm w-full text-left gap-2 px-2 py-2 hover:bg-gray-400 dark:hover:bg-gray-800"
                  onClick={() => toggleTheme()}
                >
                  {dark ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                  <span>Toogle theme</span>
                </button>
                <button
                  className="w-full p-2 text-sm text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  onClick={() => alert("signing out")}
                >
                  <LogOut className="inline mr-1.5 ml-0.5 h-5 w-5" />
                  <span>Sign out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
