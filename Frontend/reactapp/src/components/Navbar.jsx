import React from 'react'
import UserAvatar from './UserAvatar'
import StudentDashboardHero from './StudentDashboardHero'

const Navbar = ({title}) => {
  return (
    <div className='flex justify-between p-5 w-full'>
      <div className='text-xl font-bold text-black'>{title}</div>
      <UserAvatar />
    </div>
  )
}

export default Navbar