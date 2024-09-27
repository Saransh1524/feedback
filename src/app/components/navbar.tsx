"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';  // Import session handling

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();  // Get the session data

  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto flex justify-between items-center p-6">
        <h1 className="text-white font-bold text-xl sm:text-2xl lg:text-3xl">
          Testimonials 😊😖
        </h1>

        {/* Hamburger Menu for Mobile */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            {/* Hamburger Icon */}
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex space-x-6 text-white font-bold text-lg">
          <li>Home</li>
          <li>Customers</li>
          <li>Features</li>
          <li>Integration</li>
          <li>Pricing</li>
        </ul>

        {/* Conditional Buttons */}
        <div className="hidden sm:flex space-x-3">
          {!session ? (
            <>
              <Link href="/signup">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Sign Up
                </button>
              </Link>
              <Link href="/signin">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Login
                </button>
              </Link>
            </>
          ) : (
            <button
              onClick={() => signOut()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-gray-700">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li className="text-white font-bold">Home</li>
            <li className="text-white font-bold">Customers</li>
            <li className="text-white font-bold">Features</li>
            <li className="text-white font-bold">Integration</li>
            <li className="text-white font-bold">Pricing</li>
            <div className="flex flex-col space-y-3">
              {!session ? (
                <>
                  <Link href="/signup">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Sign Up
                    </button>
                  </Link>
                  <Link href="/signin">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Login
                    </button>
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => signOut()}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              )}
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
