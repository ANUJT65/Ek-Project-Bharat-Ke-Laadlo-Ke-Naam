import React from 'react'

const VocationalAIReply = ({aiResponse}) => {
  return (
    <div className='my-5 border border-black rounded-md p-2 m-5'>
        <div className='text-md font-bold'>AI's Response</div>
        <div>{aiResponse}</div>
    </div>
  )
}

export default VocationalAIReply