import React from 'react'
import coverImage from '../assets/images/logo1.jpg';


const Navbar2 = () => {
  return (
    <div className='flex justify-between w-full p-2 px-4'>
        <div className="branding flex items-center gap-4  font-inter text-[#131B1F]">
            <img 
                src={coverImage}
                alt="Gram Shiksha Logo" 
                className="w-12 h-12 object-cover" 
            />
            <div className="text-2xl font-bold">Gram-Shiksha</div>
        </div>

    <div className="user-avatar flex items-center gap-2">
    <img 
      src="/path-to-avatar.jpg" 
      alt="User Avatar" 
      className="w-10 h-10 rounded-full object-cover" 
    />
    <span className="text-sm font-medium">John Doe</span>
  </div>
    </div>
  )
}

export default Navbar2