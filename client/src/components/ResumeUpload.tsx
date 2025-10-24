// app/upload-resume/page.jsx
'use client';

import { useState } from 'react';

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setMessage('Please select a PDF file');
      return;
    }

    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await fetch('http://localhost:3000/api/resume/upload-resume', {
        method: 'POST',
        body: formData,
        credentials: 'include' // if using cookies for auth
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Resume uploaded successfully!');
        // Redirect to edit page or show success
        window.location.href = '/resume/edit';
      } else {
        setMessage(data.error || 'Upload failed');
      }
    } catch (error) {
      setMessage('Error uploading resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">Upload Your Resume</h1>
      
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="block w-full mb-4"
        />
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded disabled:bg-gray-400"
        >
          {loading ? 'Uploading...' : 'Upload Resume'}
        </button>
      </form>

      {message && (
        <p className={`mt-4 ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}