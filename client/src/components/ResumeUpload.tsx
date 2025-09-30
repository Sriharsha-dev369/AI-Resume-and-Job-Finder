'use client';
import {useState} from "react";

function ResumeUploader() {

    const [file,setFile] = useState<File | null>(null);

    const handleSubmit = (event: React.FormEvent<HTMLButtonElement>)=>{
      event.preventDefault();

    }
  return (
    <div>
      <h1>Upload the Resume</h1>
      <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button type="submit" onClick={handleSubmit}>Upload</button>
    </div>
  );
}

export default ResumeUploader;