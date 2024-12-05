import React from 'react';

const StudentClassPoll = ({ question, options, onAnswer }) => {
  const optionsStyle = 'text-[#CE4760] bg-white hover:bg-[#CE4760] hover:text-white border border-[#CE4760] p-1 px-2 rounded-md my-1 text-left';

  return (
    <div className="bg-[#F4F4F8] h-full flex p-3 flex-col border-l-2 border-[#D9D9D9]">
      <div className='text-xl font-bold'>Poll</div>
      <div className=''>{`Q: ${question}`}</div>
      {options.map((option, index) => (
        <button key={index} className={`${optionsStyle}`} onClick={() => onAnswer(option)}>
          {`${String.fromCharCode(65 + index)}: ${option}`}
        </button>
      ))}
    </div>
  );
};

export default StudentClassPoll;