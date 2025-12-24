"use client";
import { useState } from "react";
import { LogOut, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="border-b">
      <div className="flex items-center gap-x-96 py-2 justify-center ml-35">
        {/* Left Nav */}
        <div className="flex items-center gap-2">
          <Link
            href="/main/dashboard"
            className={`py-2 px-4 rounded-md ${
              pathname === "/main/dashboard"
                ? "text-[#fb64b6] bg-[#210d1c]"
                : "text-gray-400 hover:text-white hover:bg-white/3 transition-colors"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/main/ai-review"
            className={`py-2 px-4 rounded-md ${
              pathname === "/main/ai-review"
                ? "text-[#fb64b6] bg-[#210d1c]"
                : "text-gray-400 hover:text-white hover:bg-white/3 transition-colors"
            }`}
          >
            AI review
          </Link>
          <Link
            href="/main/jobs"
            className={`py-2 px-4 rounded-md ${
              pathname === "/main/jobs"
                ? "text-[#fb64b6] bg-[#210d1c]"
                : "text-gray-400 hover:text-white hover:bg-white/3 transition-colors"
            }`}
          >
            Jobs
          </Link>
        </div>

        {/* Right Nav */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] shadow-xs py-2 hidden sm:flex bg-[linear-gradient(to_right,#db2777,#9333ea)] hover:bg-[linear-gradient(to_right,#be185d,#7e22ce)] text-white h-9 px-4 text-sm"
          >
           Create New 
          </Link>

          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 py-2 px-3 hover:bg-white/3 transition-colors focus:outline-none rounded-md"
            >
              <img
                alt="p"
                className="h-8 w-8 rounded-full object-cover bg-indigo-600"
              />
              <span className="hidden sm:block font-medium text-sm max-w-32 truncate text-gray-400">
                User name
              </span>
              {open ? (
                <ChevronDown className="rotate-180" />
              ) : (
                <ChevronUp className="rotate-180" />
              )}
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-40 rounded-md border bg-gray-900 shadow-lg">
                <button
                  className="w-full p-2 text-sm text-left text-red-500 hover:bg-red-900/20"
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
