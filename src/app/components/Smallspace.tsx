"use client"
import React, { useEffect, useState } from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Image from 'next/image';
import { imageDB } from '../../firebase/Config';

// const storage = getStorage();

interface SpaceData {
  spaceName: string;
  imageUrl: string;
}

const Smallspace: React.FC<{ spaceData: SpaceData }> = ({ spaceData }) => {
  const { spaceName, imageUrl } = spaceData; // Destructure spaceData to get spaceName and imageUrl
  const [urlImage, setUrlImage] = useState<string | null>(null);

  useEffect(() => {
    const imageRef = ref(imageDB, imageUrl);
    getDownloadURL(imageRef)
      .then((url) => {
        setUrlImage(url);
        console.log(url)
      })
      .catch((error) => {
        console.error("Error fetching image URL", error);
      });
  }, [imageUrl]);

  const  viewNewspace = () => {
    // Add logic to view the space
    
  }

  return (
    <div className="space-card border w-56 h-18"> {/* Add a className for styling */}
      <div className="space-image">
        {urlImage && <Image src={urlImage} alt={spaceName} width={224} height={72} />} {/* Use Image component from next/image */}
      </div>
      <div className="space-details">
        <div className='flex justify-end' onClick={viewNewspace}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
</div>
        <h3>{spaceName}</h3> {/* Display the space name */}
      </div>
    </div>
  );
};

export default Smallspace;
