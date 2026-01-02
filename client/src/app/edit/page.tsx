'use client'
import FormStepper from "@/components/FormStepper";
import Navbar from "@/components/Navbar";
import NavbarEditPage from "@/components/Navbar_editpage";

import { useState } from 'react';

export default function Editpage() {
  return (
    <div>
      <NavbarEditPage />
      <div className="flex w-screen h-screen">
        <FormStepper />
      </div>
    </div>
  );
}
