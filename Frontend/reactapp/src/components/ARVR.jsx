import React from 'react'
import Scene from './ThreeDTest'
import Navbar from './Navbar'
import StudentSidebar from './StudentSidebar'
import Navbar2 from './Navbar2'
import ModelGrid from './ModelGrid'

const ARVR = () => {
  return (
    <>
    <div className='w-full flex'>
        <StudentSidebar />

        <div className='w-4/5 flex flex-col'>
            <Navbar2 />
            <ModelGrid />
            
        </div>
    </div>
    
    </>
  )
}

export default ARVR