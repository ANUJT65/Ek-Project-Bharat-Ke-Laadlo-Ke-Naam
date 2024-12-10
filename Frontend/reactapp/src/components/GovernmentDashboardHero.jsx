import React from 'react'
import RequestChart from './RequestChart'
import RequestComboChart from './RequestComboChart'

const GovernmentDashboardHero = () => {
  return (
    <div className='p-5 bg-gray-200 font-inter grid grid-cols-3'>

        <div className='col-span-3 flex flex-col my-2'>
            <div className=' text-xl font-bold'>Welcome, Government Representative!</div>
            <div className=''>Have a brief look at the issues in your jurisdiction.</div>
        </div>

        <div className='col-span-1 bg-blue-400 m-3 rounded-md p-5 flex flex-col'>
            <div className='text-white text-md'>Resource requests</div>
            <div className='text-white text-4xl'>15</div>
        </div>

        <div className='col-span-1 bg-blue-600 m-3 rounded-md p-5 flex flex-col'>
            <div className='text-white text-md'>Available Budget</div>
            <div className='text-white text-4xl'>INR 10 Crore</div>
        </div>

        <div className='col-span-1 bg-blue-800 m-3 rounded-md p-5 flex flex-col'>
            <div className='text-white text-md'>Approved Requests</div>
            <div className='text-white text-4xl'>8</div>
        </div>

        <div className='col-span-1 bg-white border border-gray-300  m-3 rounded-md p-5 '>
            <RequestChart />
        </div>

        <div className='col-span-2 bg-white border border-gray-300  m-3 rounded-md p-5 '>
            <RequestComboChart />
        </div>

    </div>
  )
}

export default GovernmentDashboardHero