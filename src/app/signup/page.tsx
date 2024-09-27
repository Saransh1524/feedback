"use client";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";

function Signup() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
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
      const response = await axios.post("/api/auth/signup", formData);
      console.log(response.data);
      // Redirect after signup
      router.push('/dashboard');
    } catch (error: any) {
      setError(error.response?.data.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="flex flex-col items-center w-full px-4 md:w-1/2 lg:w-1/3">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6">
          Sign up for free 🤗
        </h1>
        <div className="w-full bg-gray-800 p-8 rounded-xl">
          <button
            className="btn btn-primary w-full py-3 text-lg sm:text-xl font-bold text-white bg-blue-500 hover:bg-blue-600 mb-6"
            onClick={() => signIn('google')}
          >
            Sign up with Google
          </button>

          <h2 className="text-lg sm:text-xl text-center font-semibold mb-6 text-white">
            or, register with your email
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <label className="text-lg font-bold text-white">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-white h-12 rounded-md px-4 text-black"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-bold text-white">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-white h-12 rounded-md px-4 text-black"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-bold text-white">Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-white h-12 rounded-md px-4 text-black"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary font-bold text-lg sm:text-xl py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
              {isLoading ? 'Signing up...' : 'Sign up'}
            </button>
          </form>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          <div className="text-center mt-6">
            <p className="text-white">
              Already have an account?{" "}
              <Link href="/signin" className="text-blue-400 underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
