import React from 'react'

const CommonSignupForm = ({url, type}) => {
  return (
    <>
    <div className='justify-start w-3/4 text-left'>You're loging in as a {type}</div>
    <div className='justify-start w-3/4 text-left'>Email ID:</div>
        <input className='p-1 w-3/4 mb-5 border border-gray-400'></input>
        <div className='justify-start w-3/4 text-left'>Password:</div>
        <input className='p-1 w-3/4 mb-5 border border-gray-400'></input>
        <div className='justify-start w-3/4 text-left'>Confirm Password:</div>
        <input className='p-1 w-3/4 mb-5 border border-gray-400'></input>

        {/*Suraj, idhar url naam ka ek param hai, usko signup page se pass karde. udhar redirect karwa dena */}
        <button className='p-3 bg-[#912F56] w-3/4 text-white'>Login as {type}</button>
    </>
  )
}

export default CommonSignupForm