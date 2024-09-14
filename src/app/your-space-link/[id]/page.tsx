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
    <div className='flex justify-center'>
      <div className='flex flex-col justify-center border'>
        <div>GIF</div>
        <h1>{formData.spaceName} Added successfully 🥳</h1>
        <h2>Here is the link for your customers:</h2>
        <h3 onClick={redirectUser}>{creatingLink()}</h3>
      </div>
    </div>
  );
}

export default YourSpaceLinkPage;
