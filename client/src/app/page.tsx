"use client";

export default function Home() {
  const googleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  // When you get 401 from any API call, call this function
 const fetchProtectedData = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/mainPage', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (response.status === 401) {
      googleLogin();
      return;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.message);
    console.log(data.user);

    window.location.href = "http://localhost:3000/main/dashboard";
  } catch (error) {
    console.error('Error:', error);
  }
};

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={googleLogin}>Get Started</button>
    </div>
  );
}
