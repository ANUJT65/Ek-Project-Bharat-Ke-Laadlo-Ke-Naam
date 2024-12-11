import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const RecordedLectureAttachments = ({ notes, mindMap, sendMessage }) => {
  const buttonStyles = 'bg-yellow-300 text-xl text-black mx-5 p-2 rounded-md';
  const [openSection, setOpenSection] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the video_id from the URL

  const toggleSection = (section) => {
    if (section === 'mindMap') {
      setShowPopup(true);
    } else if (section === 'vocational') {
      navigate(`/student/vocational-learning/${id}`);
    }
    setOpenSection(openSection === section ? null : section);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col w-2/3">
      <div className="grid grid-cols-3">
        <a
          className={buttonStyles}
          href={JSON.parse(notes).pdf_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Notes
        </a>
        <button
          className={buttonStyles}
          onClick={() => toggleSection('mindMap')}
        >
          Mind Map
        </button>
        <button
          className={buttonStyles}
          onClick={() => toggleSection('vocational')}
        >
          Vocational Learning Module
        </button>
      </div>

      {showPopup && openSection === 'mindMap' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 border border-gray-300 rounded-md shadow-lg w-2/3 max-h-96 overflow-y-auto relative">
            <button className="absolute top-2 right-2 text-red-500" onClick={closePopup}>X</button>
            {mindMap.urls.map((url, index) => (
              <div key={index} className="mb-4">
                <img src={url} alt={`Mind Map ${index + 1}`} className="w-full h-auto" />
                <div className="text-center mt-2">Mind Map {index + 1}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {openSection === 'vocational' && <div>Vocational Learning</div>}
    </div>
  );
};

export default RecordedLectureAttachments;