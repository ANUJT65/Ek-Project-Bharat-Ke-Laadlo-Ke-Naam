import React from 'react'

const StudentResources = () => {
  return (
    <div className='flex flex-col p-5'>
    <div className='text-xl font-bold mt-5'>Resources</div>
    <div className='flex justify-between'>
        <button className='bg-[#2F4550] p-3 mt-2 rounded-md flex flex-col text-white text-left mx-3'>
            <div className='text-3xl font-semibold'>Roman numbers worksheet</div>
            <div className='text-md'>Recently Added</div>
            <div className='text-md mt-4'>Teacher1</div>
        </button>
        <button className='bg-white border border-gray-400 border-1 p-3 mt-2 rounded-md flex flex-col text-[#2F4550] text-left'>
            <div className='text-3xl font-semibold'>Battle of Panipat notes</div>
            <div className='text-md'></div>
            <div className='text-md mt-4'>Teacher2</div>
        </button>
    </div>
    
    </div>
  )
}

export default StudentResources