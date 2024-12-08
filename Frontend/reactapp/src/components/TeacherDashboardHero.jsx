import React, { useState } from 'react';
import axios from 'axios';

const TeacherDashboardHero = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState('');
  const [s3Key, setS3Key] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUploadClick = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setIsLoading(false);
    setMessage('');
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFilePath(selectedFile ? selectedFile.name : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file');
      return;
    }

    setIsLoading(true);
    const data = new FormData();
    data.append('file_path', file);
    data.append('s3_key', s3Key);

    try {
      const response = await axios.post('https://backendfianlsih.azurewebsites.net/video_to_text/process', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', response);
      setMessage('Upload successful');
    } catch (error) {
      console.error('Error uploading the session:', error);
      setMessage('Upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col bg-[#2F4550] m-5 p-5 rounded-md text-white'>
      <div className='flex justify-between my-5'>
        <div>Science Lecture</div>
        <div>
          <button className='bg-red-500 p-2 mx-2 rounded-md'>Start Now</button>
          <button className='bg-white text-black p-2 mx-2 rounded-md'>Add Resource</button>
          <button className='bg-white text-black p-2 mx-2 rounded-md' onClick={handleUploadClick}>Upload Recorded Session</button>
          <button className='bg-white text-black p-2 mx-2 rounded-md'>Reschedule</button>
        </div>
      </div>

      {showDialog && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-5 rounded-md text-black'>
            <h2 className='text-black mb-4'>Upload Recorded Session</h2>
            {isLoading ? (
              <div className='flex justify-center items-center'>
                <div className='loader'></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                  <label className='block text-black mb-2'>File Path</label>
                  <input
                    type='text'
                    value={filePath}
                    readOnly
                    className='w-full p-2 border border-gray-300 rounded-md'
                  />
                  <input
                    type='file'
                    accept='video/*'
                    onChange={handleFileChange}
                    className='w-full p-2 border border-gray-300 rounded-md mt-2'
                    required
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-black mb-2'>S3 Key</label>
                  <input
                    type='text'
                    value={s3Key}
                    onChange={(e) => setS3Key(e.target.value)}
                    className='w-full p-2 border border-gray-300 rounded-md'
                    required
                  />
                </div>
                <div className='flex justify-end'>
                  <button type='button' onClick={handleCloseDialog} className='bg-gray-500 text-white p-2 rounded-md mr-2'>Cancel</button>
                  <button type='submit' className='bg-blue-500 text-white p-2 rounded-md'>Upload</button>
                </div>
              </form>
            )}
            {message && <div className='mt-4 text-center text-black'>{message}</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboardHero;