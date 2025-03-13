import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VideoTranscript = ({ videoId }) => {
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTranscript = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://backendfianlsih-ema2eqdrc8gwhzcg.canadacentral-01.azurewebsites.net/dy_db/transcript/${videoId}`);
        setTranscript(response.data.transcript);
        setError(null);
      } catch (error) {
        console.error('Error fetching transcript:', error);
        setError('Failed to load transcript');
      } finally {
        setLoading(false);
      }
    };

    if (videoId) {
      fetchTranscript();
    }
  }, [videoId]);

  if (loading) {
    return (
      <div className='m-3 col-span-1 mt-2 border border-gray-300 p-4 rounded-md bg-white'>
        <div className='text-lg font-bold mb-2'>Transcript</div>
        <div className='text-gray-600'>Loading transcript...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='m-3 col-span-1 mt-2 border border-gray-300 p-4 rounded-md bg-white'>
        <div className='text-lg font-bold mb-2'>Transcript</div>
        <div className='text-red-500'>{error}</div>
      </div>
    );
  }

  return (
    <div className='m-3 col-span-1 mt-2 border border-gray-300 p-4 rounded-md bg-white'>
      <div className='text-lg font-bold mb-2'>Transcript</div>
      <div className='h-48 overflow-auto text-sm text-gray-700 whitespace-pre-wrap'>
        {transcript}
      </div>
    </div>
  );
};

export default VideoTranscript;