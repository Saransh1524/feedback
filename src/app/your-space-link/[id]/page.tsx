"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

function YourSpaceLinkPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    // Fetch form data from localStorage
    const data = localStorage.getItem('formData');
    if (data) {
      setFormData(JSON.parse(data));
      console.log("Form data successfully retrieved from localStorage");
    } else {
      console.log("No form data found in localStorage");
    }
  }, []);

  const redirectUser = () => {
    if (formData && formData.spaceName) {
      // Dynamically route to the second page with spaceName
      router.push(`/feedback/${formData.spaceName}`);
    }
  };

  const creatingLink = () => {
    return formData ? `/feedback/${formData.spaceName}` : '';
  };

  if (!formData) {
    return <p>Loading...</p>;
  }

  return (
    <div className='flex justify-center h-3/4'>
      <div className='flex flex-col justify-center border rounded-md'>
        <div><img src="/excited-minions-gif.gif" alt="minions"  className='w-full rounded-md'/></div>
        <div className='flex justify-center flex-col'>
        <h1 className='mt-2 text-center font-semibold text-3xl'>{formData.spaceName} Added successfully 🥳</h1>
        <h2 className='text-center font-semibold mt-3 text-2xl'>Here is the link for your customers:</h2>
        <h3  className = 'font-mono text-center mt-2 text-xl' onClick={redirectUser}>{creatingLink()}</h3>
        </div>
        
      </div>
    </div>
  );
}

export default YourSpaceLinkPage;
