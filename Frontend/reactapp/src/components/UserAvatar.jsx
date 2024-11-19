import React from 'react'

const UserAvatar = () => {
    //im assuming some usercontext will be used which will return user data to all comps 
    //write a function that extracts intials

    const user = 'Jane Doe';
    const email = 'janedoe@example.com'

    const getInitials = (name) => {
        if (!name) return "U"; // Default to "U" if no name
        return name
          .split(" ")
          .map((word) => word[0]?.toUpperCase())
          .join("");
    };

    return (
    <div className='flex justify-center'>
        <div className='rounded-full bg-[#2F4550] font-bold text-xl text-white px-4 py-4'>{getInitials('Jane Doe')}</div>
        <div className='flex flex-col mx-2'>
            <div className='font-semibold'>{user}</div>
            <div className='text-[#1E1E1E]'>{email}</div>
        </div>
    </div>
    )
}

export default UserAvatar