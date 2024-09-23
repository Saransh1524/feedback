import React, { useEffect, useState } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';


interface SpaceData {
  spaceName: string;
  imageUrl: string;
}

const Smallspace: React.FC<{ spaceData: SpaceData }> = ({ spaceData }) => {
  const { spaceName, imageUrl } = spaceData; // Destructure spaceData to get spaceName and imageUrl

  return (
    <div className="space-card border"> {/* Add a className for styling */}
      <div className="space-image">
        <img src={imageUrl} alt={spaceName} /> {/* Use imageUrl and spaceName from the destructured object */}
      </div>
      <div className="space-details">
        <h3>{spaceName}</h3> {/* Display the space name */}
      </div>
    </div>
  );
};

export default Smallspace;
