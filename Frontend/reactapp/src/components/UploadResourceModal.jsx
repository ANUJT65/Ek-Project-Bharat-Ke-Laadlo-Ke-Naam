import React, { useState } from 'react';

const ALLOWED_TYPES = {
  lecture: ['video/mp4', 'video/mkv'],
  document: ['application/pdf', 'application/msword'],
};

const UploadResourceModal = ({ handleCloseModal }) => {
  const [fileType, setFileType] = useState('lecture');
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    lecture: '',
    subject: '',
    time: '',
    date: '',
    s3Key: 'videos/',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && ALLOWED_TYPES[fileType].includes(selectedFile.type)) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError(`Invalid file type. Allowed: ${ALLOWED_TYPES[fileType].join(', ')}`);
      setFile(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulate file upload
    setTimeout(() => {
      console.log('File uploaded:', file);
      console.log('Form data:', formData);
      setIsLoading(false);
      handleCloseModal();
    }, 2000);
  };

  return (
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
              <p className="mt-1 text-sm text-gray-500">Selected file: {file.name}</p>
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
              value={formData.lecture}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
};

export default UploadResourceModal;
