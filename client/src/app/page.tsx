'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <button onClick={() => router.push('/auth')}>Get Started</button>
        </div>    
    );    
} 