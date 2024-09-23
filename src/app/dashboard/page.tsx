import React from 'react';
import Emptyspace from 'app/components/Emptyspace';
import Newspace from 'app/components/newspace';
import Link from 'next/link';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import Smallspace from 'app/components/Smallspace';
import NewSpace from 'models/NewSpaceModel';
import connectDB from 'lib/mongodb';

interface Space {
  _id: string;
  spaceName: string;
  imgUrl: string;
}

async function page() {
  await connectDB(); // Ensure database connection

  const authToken = cookies().get('authToken')?.value;
  if (!authToken) {
    return <p>You need to be logged in to view this page.</p>;
  }

  let userEmail = '';
  try {
    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET!);
    userEmail = (decodedToken as any).userEmail;
  } catch (error) {
    console.error('Invalid token:', error);
    return <p>Invalid token. Please log in again.</p>;
  }

  // Fetch the data from the database
  let spaces: Space[] = [];
  try {
    spaces = await NewSpace.find({ createdBy: userEmail }, 'spaceName imgUrl').lean(); // Fetch only necessary fields
  } catch (error) {
    console.error('Error fetching spaces:', error);
  }

  // Render the component with fetched data
  return (
    <div className='h-screen'>
      <div className='flex justify-between p-4'>
        <div className='text-bold text-2xl'>Spaces</div>
        <div>
          <button className='btn btn-primary text-bold text-xl'>
            <Link href="newspace">+Create new space</Link>
          </button>
        </div>
      </div>
      <div className='mt-10'>
        {spaces.length === 0 ? (
          <Emptyspace />
        ) : (
          spaces.map((space) => (
            <Smallspace key={space._id} spaceData={{ spaceName: space.spaceName, imageUrl: space.imgUrl }}  />
          ))
        )}
      </div>
    </div>
  );
}

export default page;
