import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeacherResourcesCard from './TeacherResourcesCard';

const TeacherResourcesHero = () => {
  const [showModal, setShowModal] = useState(false);
  const [filePath, setFilePath] = useState('');
  const [s3Key, setS3Key] = useState('');
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('https://backendfianlsih.azurewebsites.net/dy_db/get_data');
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    fetchResources();
  }, []);

  const handleUploadClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFilePath('');
    setS3Key('');
  };

  const handleSubmit = async () => {
    setIsLoading(true); // Start loading
    const formData = new FormData();
    formData.append('file_path', filePath);
    formData.append('s3_key', s3Key);

    try {
      const response = await axios.post('https://backendfianlsih.azurewebsites.net/video_to_text/process', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Video uploaded successfully');
      handleCloseModal();
    } catch (error) {
      console.error('Error uploading video:', error);
      alert(error.response?.data?.error || 'An error occurred');
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className='bg-gray-200 flex flex-col p-5 px-7 font-inter max-h-[calc(100vh-64px)] overflow-auto'>
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <div className='text-xl font-bold my-1'>Videos</div>
          <div className='text-sm text-gray-600 mb-2'>View all your resources at a single place.</div>
        </div>

        <button className='bg-[#F64328] text-white my-3 px-2 rounded-md' onClick={handleUploadClick}>
          + Upload a new video
        </button>
      </div>

      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-5 rounded-md'>
            <h2 className='text-xl mb-4'>Upload a new video</h2>
            <input
              type='file'
              onChange={(e) => setFilePath(e.target.files[0])}
              className='mb-4 p-2 border border-gray-300 rounded-md'
            />
            <input
              type='text'
              placeholder='S3 Key'
              value={s3Key}
              onChange={(e) => setS3Key(e.target.value)}
              className='mb-4 p-2 border border-gray-300 rounded-md'
            />
            <div className='flex justify-end'>
              <button className='bg-gray-500 text-white px-4 py-2 rounded-md mr-2' onClick={handleCloseModal}>
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#F64328] text-white'
                }`}
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
        </div>
      )}

      {resources.map((resource, index) => (
        <TeacherResourcesCard
          key={index}
          title={resource.video_id}
          date='24 September, 2024'
          duration='Science'
          score={resource.video_url}
        />
      ))}
    </div>
  );
};

export default TeacherResourcesHero;
