import React from 'react';

const VideoNotes = ({ pdfUrl, title }) => {
  const handleNoteClick = () => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <div 
      className='m-3 col-span-1 mt-2 border border-gray-300 p-4 rounded-md bg-white cursor-pointer hover:shadow-md transition-shadow duration-300'
      onClick={handleNoteClick}
    >
      <div className='text-lg font-bold mb-2'>Notes</div>
      <div className='text-sm text-gray-600 mb-2'>
        Click to view notes for {title}
      </div>
      <a 
        href={pdfUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className='text-blue-600 hover:text-blue-800 underline'
        onClick={(e) => e.stopPropagation()}
      >
        Open PDF
      </a>
    </div>
  );
};

export default VideoNotes;