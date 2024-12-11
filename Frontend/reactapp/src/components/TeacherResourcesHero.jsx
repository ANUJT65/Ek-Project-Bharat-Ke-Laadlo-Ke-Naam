import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeacherResourcesCard from './TeacherResourcesCard';

const TeacherResourcesHero = () => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fileType, setFileType] = useState('lecture');
  const [error, setError] = useState('');

  // Allowed file types
  const ALLOWED_TYPES = {
    document: ['.pdf', '.docx', '.pptx'],
    lecture: ['.mp4', '.mov', '.avi']
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const fileExt = '.' + selectedFile.name.split('.').pop().toLowerCase();
    
    if (!ALLOWED_TYPES[fileType].includes(fileExt)) {
      setError(`Invalid file type. Allowed types for ${fileType}: ${ALLOWED_TYPES[fileType].join(', ')}`);
      return;
    }
    
    setFile(selectedFile);
    setError('');
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    setIsLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      let endpoint = fileType === 'document' 
        ? 'https://backendfianlsih.azurewebsites.net/data_form_media/upload_and_extract'
        : 'https://backendfianlsih.azurewebsites.net/video_to_text/process';

      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('File uploaded successfully');
      handleCloseModal();
      // Refresh resources list
      fetchResources();
    } catch (error) {
      console.error('Error uploading file:', error);
      setError(error.response?.data?.error || 'An error occurred during upload');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchResources = async () => {
    try {
      const response = await axios.get('https://backendfianlsih.azurewebsites.net/dy_db/get_data');
      setResources(response.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setFile(null);
    setError('');
  };

  return (
    <div className='bg-gray-200 flex flex-col p-5 px-7 font-inter max-h-[calc(100vh-64px)] overflow-auto'>
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <div className='text-xl font-bold my-1'>Resources</div>
          <div className='text-sm text-gray-600 mb-2'>View all your resources at a single place.</div>
        </div>

        <button className='bg-[#F64328] text-white my-3 px-4 py-2 rounded-md' onClick={() => setShowModal(true)}>
          + Upload Resource
        </button>
      </div>

      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg w-96'>
            <h2 className='text-xl font-bold mb-4'>Upload Resource</h2>

            {error && (
              <div className='mb-4 p-3 bg-red-100 text-red-700 rounded-md'>
                {error}
              </div>
            )}

            <div className='mb-4'>
              <label className='block text-sm font-medium mb-2'>Resource Type</label>
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded-md'
              >
                <option value='lecture'>Video Lecture</option>
                <option value='document'>Document</option>
              </select>
            </div>

            <div className='mb-6'>
              <label className='block text-sm font-medium mb-2'>File</label>
              <input
                type='file'
                onChange={handleFileChange}
                accept={ALLOWED_TYPES[fileType].join(',')}
                className='w-full p-2 border border-gray-300 rounded-md'
              />
              <p className='mt-1 text-sm text-gray-500'>
                Allowed types: {ALLOWED_TYPES[fileType].join(', ')}
              </p>
            </div>

            <div className='flex justify-end gap-3'>
              <button 
                className='px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md'
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#F64328] hover:bg-[#E33317]'
                } text-white`}
                onClick={handleSubmit}
                disabled={isLoading || !file}
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
          title={resource.document_id || resource.video_id}
          date='24 September, 2024'
          duration={resource.document_id ? 'Document' : 'Video'}
          score={resource.s3_url || resource.video_url}
        />
      ))}
    </div>
  );
};

export default TeacherResourcesHero;