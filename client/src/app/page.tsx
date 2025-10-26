"use client";

export default function Home() {
  const googleLogin = () => {
  window.location.href = "http://localhost:5000/auth/google";
};

// When you get 401 from any API call, call this function
const fetchProtectedData = async () => {
  try {
    const response = await fetch('/api/mainPage', {
      credentials: 'include'
    });
    
    if (response.status === 401) {
      googleLogin(); // Redirect to Google signup
      return;
    }else {
        window.location.href = "http://localhost:3000/main/dashboard";
      }
  } catch (error) {
    console.error('Error:', error);
  }
};

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={fetchProtectedData}>Get Started</button>
    </div>
  );
}
