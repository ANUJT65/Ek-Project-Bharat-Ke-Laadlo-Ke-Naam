import React from 'react';

const VideoRecordingCard = ({ subjectName, date, videoName, notesLink, illustrationsLink, videoUrl }) => {
  return (
    <div className='bg-[#2F4550] text-white mt-2 flex justify-between p-5 rounded-md border border-gray-200 border-2'>
      <div className='flex flex-col'>
        <div className='font-bold text-xl'>{videoName}</div>
        <div className='text-xl'>{subjectName}</div>
      </div>

      <div className='flex flex-col'>
        <div className='font-semibold'>Date</div>
        <div className=''>{date}</div>
      </div>

      <a href={notesLink} target='_blank' rel='noopener noreferrer' className='flex flex-col text-blue-400'>
        <div className='font-semibold'>Notes</div>
      </a>

      <a href={illustrationsLink} target='_blank' rel='noopener noreferrer' className='flex flex-col text-blue-400'>
        <div className='font-semibold'>Illustrations</div>
      </a>

      <a href={videoUrl} target='_blank' rel='noopener noreferrer' className='flex flex-col text-blue-400'>
        <div className='font-semibold'>Watch Video</div>
      </a>
    </div>
  );
};

export default VideoRecordingCard;