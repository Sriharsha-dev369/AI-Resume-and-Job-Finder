'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    const googleLogin = () => {
  window.location.href = 'http://localhost:5000/auth/google';
};

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <button onClick={googleLogin}>Get Started</button>
        </div>    
    );    
} 
