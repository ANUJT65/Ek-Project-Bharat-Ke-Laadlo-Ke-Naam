// TeacherResourcesHero.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UploadModal from './UploadModal';

const TeacherResourcesHero = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [resources, setResources] = useState([]);
  const [error, setError] = useState('');

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

  return (
    <div className="bg-white flex flex-col p-5 px-7 font-inter max-h-[calc(100vh-64px)] overflow-auto">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="text-xl font-bold my-1">Resources</div>
          <div className="text-sm text-gray-600 mb-2">View all your resources at a single place.</div>
        </div>

        <button 
          className="bg-[#CE4760] text-white my-3 px-4 py-2 rounded-md" 
          onClick={() => setShowModal(true)}
        >
          + Upload Resource
        </button>
      </div>

      {showModal && (
        <UploadModal 
          onClose={() => setShowModal(false)} 
          onSuccess={fetchResources}
        />
      )}

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
              <td className="border border-gray-300 px-4 py-2">
                {resource.document_id || resource.video_id}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {resource.document_id ? 'Document' : 'Video'}
              </td>
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