import Link from "next/link";
import { ArrowLeft, Pencil ,Download} from "lucide-react";
import { useState } from "react";

export default function NavbarEditPage() {
  const [heading, setHeading] = useState("Untitled Resume");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-[#101018] flex items-center border-b border-white/[0.06] px-4 py-3">
      <div className="px-2 py-1 mx-0.5">
        <button className="flex items-center gap-3.5 hover:bg-white/[0.08] transition-colors hover:text-white rounded-lg px-2 py-1.5">
          <ArrowLeft className="w-4 h-4 text-gray-300" />
          <span className="text-sm text-gray-300">Back</span>
        </button>
      </div>

      <div className="border-l border-white/[0.06] mx-4 self-stretch my-1.5"></div>

      <div className="flex items-center gap-2">
        {isEditing ? (
          <input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
            className="text-md font-semibold text-gray-200 bg-white/[0.08] border border-white/[0.12] h-8 px-2 py-1 outline-none focus:border-white/[0.24] rounded-lg focus:ring-2 focus:ring-[#e7099d]"
            autoFocus
          />
        ) : (
          <h2 className="text-lg font-semibold text-gray-200">{heading}</h2>
        )}
        <button
          onClick={() => setIsEditing(true)}
          className="p-1.5 hover:bg-white/[0.08] rounded transition-colors"
        >
          <Pencil className="w-4 h-4 text-gray-400 hover:text-gray-200" />
        </button>
      </div>

      <button
        className="flex items-center gap-2 py-2 bg-[linear-gradient(to_right,#db2777,#9333ea)] hover:bg-[linear-gradient(to_right,#be185d,#7e22ce)] text-white transition px-2 mx-3 font-medium rounded-md
            items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-xs hover:bg-primary/90 h-8 rounded-md gap-1.5 has-[>svg]:px-2.5 hidden lg:flex bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-4"
      >
        <Download className="size-4" />
        Download PDF
      </button>
    </div>
  );
}
