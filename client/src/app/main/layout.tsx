import { ReactNode } from "react";
import Navbar from "@/components/Navbar";

//this layout is for Sidebar
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />

      <main>{children}</main>
    </div>
  );
}
