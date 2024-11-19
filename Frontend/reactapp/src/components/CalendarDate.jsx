import React from 'react'

const CalendarDate = ({day, date, today}) => {
    const dateStyle = today ? 'text-center mt-2 font-bold text-white bg-[#2F4550] p-2 rounded-full' : 'text-center mt-2 p-2';
  return (
    
    <button className='flex flex-col'>
        <div className='text-[#878787]'>{day}</div>
        <div className={`${dateStyle}`}>{date}</div>
    </button>
  )
}

export default CalendarDate