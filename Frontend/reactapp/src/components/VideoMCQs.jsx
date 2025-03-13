import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VideoMCQs = ({ type, videoId }) => {
  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMCQs = async () => {
      try {
        setLoading(true);
        const difficulty = type.toLowerCase();
        const response = await axios.get(
          `https://backendfianlsih-ema2eqdrc8gwhzcg.canadacentral-01.azurewebsites.net/dy_db/get_mcqs_${difficulty}/${videoId}`
        );
        setMcqs(response.data[`mcqs_${difficulty}`]);
        setError(null);
      } catch (error) {
        console.error(`Error fetching ${type} MCQs:`, error);
        setError(`Failed to load ${type} MCQs`);
      } finally {
        setLoading(false);
      }
    };

    if (videoId) {
      fetchMCQs();
    }
  }, [videoId, type]);

  const getDifficultyColor = () => {
    switch (type.toLowerCase()) {
      case 'easy':
        return 'text-green-600';
      case 'medium':
        return 'text-yellow-600';
      case 'hard':
        return 'text-red-600';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className='m-3 col-span-1 mt-2 border border-gray-300 p-4 rounded-md bg-white'>
        <div className={`text-lg font-bold mb-2 ${getDifficultyColor()}`}>
          {type} MCQs
        </div>
        <div className='text-gray-600'>Loading questions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='m-3 col-span-1 mt-2 border border-gray-300 p-4 rounded-md bg-white'>
        <div className={`text-lg font-bold mb-2 ${getDifficultyColor()}`}>
          {type} MCQs
        </div>
        <div className='text-red-500'>{error}</div>
      </div>
    );
  }

  return (
    <div className='m-3 col-span-1 mt-2 border border-gray-300 p-4 rounded-md bg-white'>
      <div className={`text-lg font-bold mb-2 ${getDifficultyColor()}`}>
        {type} MCQs
      </div>
      <div className='h-48 overflow-auto'>
        {mcqs.map((mcq, index) => (
          <div key={index} className='mb-4 p-2 border border-gray-200 rounded'>
            <div className='font-semibold mb-2'>Q{index + 1}: {mcq.question}</div>
            <div className='ml-4'>
              {mcq.options.map((option, optIndex) => (
                <div key={optIndex} className='text-sm text-gray-700 mb-1'>
                  {String.fromCharCode(65 + optIndex)}. {option}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoMCQs;