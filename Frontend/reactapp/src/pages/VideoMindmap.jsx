import React, { useState } from 'react';

const VideoMindmap = ({ mindMapUrls }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBoxClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = (e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setIsModalOpen(false);
  };

  const handleModalClick = (e) => {
    e.stopPropagation(); // Prevent clicks inside modal from triggering parent onClick
  };

  return (
    <div className='m-3 col-span-1 mt-2 border border-gray-300 p-4 rounded-md bg-white cursor-pointer' onClick={handleBoxClick}>
      <div className='text-lg font-bold mb-2'>Mind Maps</div>
      <div className='text-sm text-gray-600'>Click to view all mind maps</div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' onClick={closeModal}>
          <div className='bg-white p-4 rounded-md w-96 h-96 relative' onClick={handleModalClick}>
            <button 
              className='absolute top-2 right-2 text-red-500 hover:text-red-700'
              onClick={closeModal}
            >
              Close
            </button>
            <div className='overflow-auto h-full mt-8'>
              <div className='grid grid-cols-1 gap-2'>
                {mindMapUrls.map((url, index) => (
                  <img key={index} src={url} alt={`Mind Map ${index + 1}`} className='w-full h-auto rounded-md' />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoMindmap;