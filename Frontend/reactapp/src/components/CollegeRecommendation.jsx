import React, { useState } from 'react';

const CollegeRecommendation = () => {
  const [formData, setFormData] = useState({
    preferredArea: '',
    medium: '',
    maxFees: '',
    facilities: '',
    studentClass: '',
    currentArea: '',
  });

  const [recommendations, setRecommendations] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate generating recommendations
    const generatedRecommendations = [
      "ABC College of Science",
      "XYZ Arts Academy",
      "National Institute of Technology",
    ];
    setRecommendations(generatedRecommendations);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">College Recommendations</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="preferredArea" className="block text-sm font-medium">
              Preferred Area
            </label>
            <input
              type="text"
              id="preferredArea"
              name="preferredArea"
              value={formData.preferredArea}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="medium" className="block text-sm font-medium">
              Medium
            </label>
            <input
              type="text"
              id="medium"
              name="medium"
              value={formData.medium}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="maxFees" className="block text-sm font-medium">
              Maximum Affordable Fees (INR)
            </label>
            <input
              type="number"
              id="maxFees"
              name="maxFees"
              value={formData.maxFees}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="facilities" className="block text-sm font-medium">
              Required Facilities (comma-separated)
            </label>
            <input
              type="text"
              id="facilities"
              name="facilities"
              value={formData.facilities}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="studentClass" className="block text-sm font-medium">
              Student's Class
            </label>
            <input
              type="text"
              id="studentClass"
              name="studentClass"
              value={formData.studentClass}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="currentArea" className="block text-sm font-medium">
              Current Area
            </label>
            <input
              type="text"
              id="currentArea"
              name="currentArea"
              value={formData.currentArea}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Get Recommendations
          </button>
        </form>

        <div className="mt-6">
          <h3 className="text-lg font-semibold">Recommended Colleges:</h3>
          <ul className="mt-2 space-y-1">
            {recommendations.length > 0 ? (
              recommendations.map((college, index) => (
                <li key={index} className="p-2 border border-gray-300 rounded-md">
                  {college}
                </li>
              ))
            ) : (
              <p className="text-gray-500">No recommendations yet. Fill the form to get started!</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CollegeRecommendation;
