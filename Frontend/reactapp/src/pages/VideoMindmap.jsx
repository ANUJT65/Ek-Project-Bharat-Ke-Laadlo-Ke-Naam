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
      <div className='text-xl font-bold mb-4'>Mind Maps</div> {/* Increased font size */}
      <div className='text-md text-gray-600 mb-4'>Click to view all mind maps</div> {/* Increased font size */}

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' onClick={closeModal}>
          <div className='bg-white p-6 rounded-md w-[90%] h-[90%] max-w-7xl max-h-7xl relative' onClick={handleModalClick}> {/* Increased width and height */}
            <button 
              className='absolute top-4 right-4 text-red-500 hover:text-red-700 text-lg' /* Increased button size */
              onClick={closeModal}
            >
              x
            </button>
            <div className='overflow-auto h-full'>
              <div className='grid grid-cols-1 gap-4'> {/* Increased gap between images */}
                {mindMapUrls.map((url, index) => (
                  <img key={index} src={url} alt={`Mind Map ${index + 1}`} className='w-full h-auto rounded-md shadow-lg' /> 
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
