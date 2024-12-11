import React from 'react'
import Scene from './ThreeDTest'
import Navbar from './Navbar'
import StudentSidebar from './StudentSidebar'
import Navbar2 from './Navbar2'

const ARVR = () => {
  return (
    <>
    <div className='w-full flex'>
        <StudentSidebar />

        <div className='w-4/5 flex flex-col'>
            <Navbar2 />
            <Scene />
        </div>
    </div>
    
    </>
  )
}

export default ARVR