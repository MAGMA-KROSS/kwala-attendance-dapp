"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function Navbar() {
  const [NavSlide, setNavSlide] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  

  return (
    <div className="sticky top-0 z-25 md:p-12">
      {/* Desktop Header */}
      <header className="text-purple-500 hidden md:block body-font backdrop-blur-xl bg-white/3 border-1 border-gray-200/40 rounded-full">
        <div className="container mx-auto flex flex-wrap p-5 justify-center md:flex-row">
          <Link
            href="/"
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <span className="ml-3 text-2xl text-white">Attendance Tracker with NFT</span>
          </Link>
          

          
          
        </div>
      </header>

      {/* Mobile Header */}
      <header className="text-purple-500 relative block md:hidden z-25 body-font">
        <div className="container mx-auto flex flex-wrap p-5 justify-center flex-col">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <svg
                onClick={() => {
                  setNavSlide(!NavSlide);
                }}
                className="scale-110 mr-2 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>

              <Link
                href="/"
                className="flex title-font font-medium items-center text-gray-900"
              >
                <span className="text-2xl text-white">MagmaBuilder</span>
              </Link>
            </div>

            {/* Auth Button - Mobile (Top Right) */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 text-sm rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition-all duration-300"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/login"
                className="px-4 py-1.5 text-sm rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all duration-300"
              >
                Sign In
              </Link>
            )}
          </div>

          
        </div>
      </header>
    </div>
  );
}

export default Navbar;