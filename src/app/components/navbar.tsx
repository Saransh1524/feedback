import React from 'react'
import Link from 'next/link'
const navbar = () => {
  return (
    <div>
      <div className='flex m-6 p-3 justify-evenly'>
      <h1 className=' text-white font-bold text-xl text-3xl'>Testimonials 😊😖</h1>
      <div className='flex ml-10  text-white font-bold text-xl'>
      <ul className='flex space-x-4'>
        <li>Home</li>
        <li>Customers</li>
        <li>Features</li>
        <li>Integration</li>
        <li>Pricing</li>
      </ul>
      </div>

      <div className='ml-20'>
        <Link href="/signup">
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-3 rounded' >
          Sign Up
        </button>
        </Link>
       
       <Link href= "signin">
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' >
          Login
        </button>
       </Link>
        
      </div>
      </div>
      
      </div>
  )
}

export default navbar