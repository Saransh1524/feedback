import React, { useEffect, useState } from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Image from 'next/image';
import { videoDB } from '../../firebase/Config';
function page() {
  return (
    <div>
        <h1>your space</h1>

    </div>
  )
}


export default page