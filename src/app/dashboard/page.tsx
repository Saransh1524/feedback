import React from 'react'
import Emptyspace from 'app/components/Emptyspace'
import Newspace from 'app/components/newspace'
import Link from 'next/link'
function page() {
  
  return (
    <div className='h-screen'>
        <div className='flex justify-between p-4'>
            <div className='text-bold text-2xl'>Spaces</div>
            <div><button className='btn btn-primary text-bold text-xl' ><Link href="newspace">+Create new space</Link></button></div>
        </div>
        <div className='mt-10'><Emptyspace/>
        <Newspace/>
        </div>
        
    </div>
  )
}

export default page