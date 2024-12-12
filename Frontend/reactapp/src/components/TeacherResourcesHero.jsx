import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ALLOWED_TYPES = {
  document: ['.pdf', '.docx', '.pptx'],
  lecture: ['.mp4', '.mov', '.avi']
};

const TeacherResourcesHero = () => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fileType, setFileType] = useState('lecture');
  const [error, setError] = useState('');
  const [lecture, setLecture] = useState(''); 
  const [formData, setFormData] = useState({
    lecture: '',
    subject: '',
    time: new Date().toISOString().substring(11, 16), // Default to current time
    date: new Date().toISOString().substring(0, 10), // Default to current date
    s3Key: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await axios.get('https://backendfianlsih.azurewebsites.net/dy_db/get_data');
      setResources(response.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
      setError('Failed to fetch resources');
    }
  };

  const validateFile = (file, type) => {
    const fileExt = '.' + file.name.split('.').pop().toLowerCase();
    return ALLOWED_TYPES[type].includes(fileExt);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!validateFile(selectedFile, fileType)) {
      setError(`Invalid file type. Allowed types: ${ALLOWED_TYPES[fileType].join(', ')}`);
      return;
    }

    setFile(selectedFile);
    setError('');

    if (fileType === 'lecture') {
      const timestamp = new Date().getTime();
      setFormData(prev => ({ ...prev, s3Key: `videos/${timestamp}_${selectedFile.name}` }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a file');
      return;
    }

    if (!formData.lecture || !formData.subject || !formData.time || !formData.date) {
      setError('All fields are required');
      return;
    }

    setIsLoading(true);
    setError('');
    const formDataToSend = new FormData();

    try {
      if (fileType === 'lecture') {
        formDataToSend.append('file_path', file);
        formDataToSend.append('s3_key', formData.s3Key);
      } else {
        formDataToSend.append('file', file);
      }

      formDataToSend.append('lecture', formData.lecture.trim());
      formDataToSend.append('subject', formData.subject.trim());
      formDataToSend.append('time', formData.time);
      formDataToSend.append('date', formData.date);

      const endpoint = fileType === 'lecture'
        ? 'https://backendfianlsih.azurewebsites.net/video_to_text/process'
        : 'https://backendfianlsih.azurewebsites.net/data_form_media/upload_and_extract';

      await axios.post(endpoint, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload Progress: ${percentCompleted}%`);
        }
      });

      await fetchResources();
      handleCloseModal();
      alert(`${fileType === 'lecture' ? 'Video' : 'Document'} uploaded successfully`);
    } catch (error) {
      console.error('Upload error:', error);
      setError(error.response?.data?.error || 'Upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFile(null);
    setError('');
    setFormData({
      lecture: '',
      subject: '',
      time: new Date().toISOString().substring(11, 16),
      date: new Date().toISOString().substring(0, 10),
      s3Key: ''
    });
  };

  const UploadModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[480px] relative max-h-[90vh] overflow-y-auto">
        <button 
          onClick={handleCloseModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4">Upload Resource</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Resource Type</label>
            <select
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="lecture">Video Lecture</option>
              <option value="document">Document</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">File</label>
            <input
              type="file"
              onChange={handleFileChange}
              accept={ALLOWED_TYPES[fileType].join(',')}
              className="w-full p-2 border rounded-md"
            />
            {file && (
              <p className="mt-1 text-sm text-gray-500">
                Selected file: {file.name}
              </p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Allowed: {ALLOWED_TYPES[fileType].join(', ')}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Lecture Name</label>
            <input
  type="text"
  name="lecture"
  value={lecture}
  onChange={(e) => setLecture(e.target.value)}
  className="w-full p-2 border rounded-md"
  required
/>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={()=>  handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {fileType === 'lecture' && file && (
            <div>
              <label className="block text-sm font-medium mb-2">
                S3 Key
                <span className="text-gray-500 text-xs ml-2">(Editable)</span>
              </label>
              <input
                type="text"
                name="s3Key"
                value={formData.s3Key}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Must start with "videos/" - Auto-generated but can be customized
              </p>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={handleCloseModal}
              disabled={isLoading}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !file}
              className={`px-4 py-2 rounded-md text-white transition-colors
                ${isLoading ? 'bg-gray-400' : 'bg-[#CE4760] hover:bg-[#CE4760]/90'}`}
            >
              {isLoading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="bg-white flex flex-col p-5 px-7 font-inter max-h-[calc(100vh-64px)] overflow-auto">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="text-xl font-bold my-1">Resources</div>
          <div className="text-sm text-gray-600 mb-2">View all your resources at a single place.</div>
        </div>

        <button className="bg-[#CE4760] text-white my-3 px-4 py-2 rounded-md" onClick={() => setShowModal(true)}>
          + Upload Resource
        </button>
      </div>

      {showModal && <UploadModal />}

      <table className="table-auto w-full mt-5 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((resource, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{resource.document_id || resource.video_id}</td>
              <td className="border border-gray-300 px-4 py-2">{resource.document_id ? 'Document' : 'Video'}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button 
                  className="text-blue-600 hover:underline mr-4"
                  onClick={() => navigate(`/teacher/engagement-analytics/${resource.document_id || resource.video_id}`)}
                >
                  View Analytics
                </button>
                <button 
                  className="text-blue-600 hover:underline"
                  onClick={() => navigate(`/teacher/resource/${resource.document_id || resource.video_id}`)}
                >
                  View Resource
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherResourcesHero;