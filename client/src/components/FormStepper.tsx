"use client";
import PersonalInfoForm from "./forms/personalInfo";
import CareerObjectiveForm from "./forms/careerObjectiveForm";
import EducationInfoForm from "./forms/educationForm";
import { JSX, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  UserRound,
  Sparkles,
  Award,
  Code,
  BriefcaseBusiness,
  GraduationCap,
  FileText,
  PencilLine,
  Plus,
} from "lucide-react";
import { JSXSource } from "react/jsx-dev-runtime";

const resumeSections = [
  "Education",
  "Work Experience",
  "Projects",
  "Certificates & Awards",
  "Skills",
];

const iconMap: Record<string, JSX.ElementType> = {
  "Career Objective": FileText,
  Education: GraduationCap,
  "Work Experience": BriefcaseBusiness,
  Projects: Code,
  "Certificates & Awards": Award,
  Skills: Sparkles,
};

const formTitles: Record<string, JSX.ElementType> = {
  "Personal Info": PersonalInfoForm,
  "Career Objective": CareerObjectiveForm,
  Education: EducationInfoForm,
  "Work Experience": CareerObjectiveForm,
  Projects: CareerObjectiveForm,
  "Certificates & Awards": CareerObjectiveForm,
  Skills: CareerObjectiveForm,
};

function EditPencil({ section }: { section: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const Form = formTitles[section] ?? CareerObjectiveForm;

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="ml-auto">
        <PencilLine className="w-8 h-8 p-2 rounded-md text-[#e85daa] hover:bg-[#892e6bd7] hover:text-gray-300 transition-colors " />
      </button>

      <Form isOpen={isOpen} setOpen={setIsOpen} />
    </>
  );
}

function AddIcon({section}:{section:string}) {
  const [isOpen, setIsOpen] = useState(false);
  const Form = formTitles[section] ?? CareerObjectiveForm;

  return (
    <>
      <button onClick={()=>setIsOpen(true)} className="ml-auto">
        <Plus className="w-8 h-8 p-2 rounded-md text-[#e85daa] hover:bg-[#892e6bd7] hover:text-gray-300 transition-colors" />
      </button>

      <Form isOpen={isOpen} setOpen={setIsOpen} />
    </>
  );
}

function SectionItem({ title }: { title: string }) {
  const Icon = iconMap[title] ?? FileText;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="flex items-center gap-2 p-3 text-md">
      <Icon className="w-4 h-4" />
      {title}

      <div className="ml-auto mr-1 flex items-center gap-1">
        <AddIcon section={title} />
        {open ? (
          <ChevronDown
            className="w-6 h-6 text-gray-400 rotate-180 hover:bg-gray-700 p-1 rounded-sm"
            onClick={handleClick}
          />
        ) : (
          <ChevronUp
            className="w-6 h-6 text-gray-400 rotate-180 hover:bg-gray-700 p-1 rounded-sm"
            onClick={handleClick}
          />
        )}
      </div>
    </div>
  );
}

export default function FormStepper() {
  return (
    <div className="w-1/2 h-full bg-[#0e0e14] border-r border-white/[0.06] flex justify-center items-start px-2">
      <div className="bg-[#161e2d] w-[95%] self-start mt-6 border border-white/[0.06] rounded-2xl">
        <div className="border-b flex-c items-center px-4 py-3">
          <h2 className="text-sm mb-1">Resume Sections</h2>
          <p className="text-xs text-gray-400 ">Click any section to edit</p>
        </div>

        <div className="p-2">
          <div className="flex items-center gap-2 p-3 text-md">
            <UserRound className="w-4 h-4" />
            Personal Info
            <EditPencil section="Personal Info" />
          </div>

          <div className="flex items-center gap-2 p-3 text-md">
            <FileText className="w-4 h-4" />
            Career Objective
            <EditPencil section="Career Objective" />
          </div>

          {resumeSections.map((section) => (
            <SectionItem key={section} title={section} />
          ))}
        </div>
      </div>
    </div>
  );
}
