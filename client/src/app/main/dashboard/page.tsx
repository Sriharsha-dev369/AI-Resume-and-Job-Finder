import UploadResume from "@/components/ResumeUpload";
import React from "react";
// import ResumeEditor from "@/components/Resumes";



export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <UploadResume />

      {/* <ResumeEditor /> */}
    </div>
  );
}
