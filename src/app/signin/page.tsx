"use client";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";

function Signup() {
  const router = useRouter(); // Initialize the useRouter hook
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/auth/login", formData); // Replace with your API endpoint
      console.log(response.data);
      router.push('/dashboard'); // Redirect after login
    } catch (error: any) {
      setError(error.response?.data.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 text-white">
          Welcome back 👋
        </h1>
        
        <div className="flex justify-center mb-6">
          <button
            className="w-full py-3 text-lg sm:text-xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            onClick={() => signIn('google')}
          >
            Sign in with Google
          </button>
        </div>

        <h2 className="text-lg sm:text-xl text-center font-semibold mb-6 text-white">
          or, enter your email and password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-lg font-bold text-white">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="h-12 px-4 rounded-md bg-white text-black"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-bold text-white">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="h-12 px-4 rounded-md bg-white text-black"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-3 text-lg sm:text-xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>

        <div className="text-center mt-6">
          <p className="text-white">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-400 underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
