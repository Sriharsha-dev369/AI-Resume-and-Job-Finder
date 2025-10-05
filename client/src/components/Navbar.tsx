'use client';
import { useState } from 'react';
import { FaHome, FaUser, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    console.log('Logging out...');
  };

  return (
    <nav className="navbar bg-[#0f172a] h-20 flex justify-between items-center px-4 py-4 w-full">
      <div className="navbar-brand flex items-center w-1/5">
        <Image src="" alt="Logo" width={32} height={32} className="navbar-logo" />
        <span className="navbar-name text-2xl text-[#ffffff] font-extrabold">ResuMax</span>
      </div>

      <div className="navbar-links flex items-center justify-center gap-8 w-">
        <Link href="/" className="text-white flex items-center gap-2 hover:text-blue-400 transition-colors">
          <FaHome className="icon" />
          <span>Home</span>
        </Link>
        <Link href="/profile" className="nav-link text-white flex items-center gap-2 hover:text-blue-400 transition-colors">
          <span>Profile</span>
        </Link>
        <Link href="/settings" className="nav-link text-white flex items-center gap-2 hover:text-blue-400 transition-colors">
          <span>Settings</span>
        </Link>
      </div>

      <div className="dropdown-container w-1/5">
        <button 
          className="dropdown-trigger"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <FaUser className="icon" />
          <span>Account</span>
          <FaChevronDown className="dropdown-arrow" />
        </button>
        
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <button onClick={handleLogout} className="dropdown-item">
              <FaSignOutAlt className="icon" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;