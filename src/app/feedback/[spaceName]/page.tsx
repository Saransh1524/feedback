"use client";
import React from 'react';
import { useParams } from 'next/navigation';

const Page = () => {
  const { spaceName } = useParams(); // Get the dynamic spaceName from the URL

  return (
    <div>
      <div>
        <div>
          Here the logo
          <img src="" alt="Logo" />
        </div>
        <div>
          <h1>{spaceName}</h1> {/* Display the dynamic spaceName */}
        </div>
        <div>Custom message maybe</div>
        <div>QUESTIONS</div>
        <div>
          <h1>One</h1>
          <h2>Two</h2>
          <h3>Maybe</h3>
        </div>
        
        {/* Buttons */}
        <button className='btn btn-primary'>Record a video</button>
        <button className='btn btn-primary'>Send a text</button>
      </div>
    </div>
  );
};

export default Page;
