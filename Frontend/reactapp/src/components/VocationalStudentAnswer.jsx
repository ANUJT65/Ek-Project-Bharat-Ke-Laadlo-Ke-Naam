import React from 'react'

const VocationalStudentAnswer = ({studentAnswer}) => {
  return (
    <div className='my-5 border border-black rounded-md p-2 m-5'>
        <div className='text-md font-bold'>Your Answer</div>
        <div>{studentAnswer}</div>
    </div>
  )
}

export default VocationalStudentAnswer