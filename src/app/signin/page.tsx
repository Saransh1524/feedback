"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import axios from "axios";
import SignInButton from "../components/SignInButton";
import { useSession, signIn, signOut } from "next-auth/react";

import { useRouter } from 'next/navigation';
// import handler from "../api/auth/signup"
function Signup() {
  const router = useRouter(); // Initialize the useRouter hook
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // env varibles cannot be accessed on the client side 
    // console.log('MONGO_URI:', process.env.MONGO_URI);
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
      router.push('/dashboard');

      // Handle success, e.g., redirect to login page
    } catch (error: any) {
      setError(error.response.data.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center">
        <div className="font-bold text-4xl flex justify-center">
          <h1 className="p-4 m-4">Welcome back 👋</h1>
        </div>
        <div className="justify-center flex">
          <div className="max-h-screen border-spacing-1 w-1/3 flex-col bg-gray-800 rounded-xl mb-12">
            <div className="justify-center flex ">
              <button className="btn btn-primary font-bold text-lg mt-3"
              onClick={() => signIn('google')}
              >
                Signin with google
              </button>
            </div>

            <h1 className="text-center font-bold text-xl mt-6">
              or, Enter your email and password
            </h1>
            <div className="flex flex-col">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center"
              >
                

                <label className="m-2 ml-10 font-bold text-lg">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white  h-12 rounded-md mx-10 text-black"
                />

                <label className="m-2 ml-10 font-bold text-lg">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-white  h-12 rounded-md mx-10 text-black"
                />
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="btn btn-primary font-bold text-xl mt-4 w-1/4"
                    
                  >
                    Sign in
                  </button>
                </div>
              </form>
              <div className="flex justify-center m-3">
                <p className="font-bold text-xl">
                  Do you have an account?{" "}
                  <Link href="/signup" className="text-blue-500">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
