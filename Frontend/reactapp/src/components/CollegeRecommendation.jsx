import React, { useState } from 'react';
import axios from 'axios';
import Navbar2 from './Navbar2';

const CollegeRecommendation = () => {
  const [formData, setFormData] = useState({
    current_area: '',
    medium: '',
    fees: '',
    facilities: '',
    class: '',
    preferred_area: ''
  });

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'facilities' ? value.split(',').map(f => f.trim()) :
        name === 'fees' ? parseInt(value) : value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const facilities = prevData.facilities || [];
      if (checked) {
        // Add facility to array if checked
        return { ...prevData, facilities: [...facilities, value] };
      } else {
        // Remove facility from array if unchecked
        return { ...prevData, facilities: facilities.filter((f) => f !== value) };
      }
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'https://backendfianlsih.azurewebsites.net/school_recommendation/recommend',
        formData
      );
      setRecommendations(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch recommendations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar2/>
    <div className="bg-gradient-to-r from-[#CE4760] via-[#2F4550] to-[#CE4760] min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">School Recommendations</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="current_area" className="block text-sm font-medium">
              Current Area
            </label>
            <select
              id="current_area"
              name="current_area"
              value={formData.current_area}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Current Area</option>
              <option value="Kothrud">Kothrud</option>
              <option value="Bibwewadi">Bibwewadi</option>
              <option value="Hadapsar">Hadapsar</option>
              <option value="Sinhagad Rd.">Sinhagad Rd.</option>
              <option value="Kondhwa">Kondhwa</option>
              <option value="Katraj">Katraj</option>
            </select>
          </div>


          <div>
            <label htmlFor="medium" className="block text-sm font-medium">
              Medium
            </label>
            <select
              id="medium"
              name="medium"
              value={formData.medium}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Medium</option>
              <option value="English">English</option>
              <option value="Marathi">Marathi</option>
            </select>
          </div>

          <div>
            <label htmlFor="fees" className="block text-sm font-medium">
              Maximum Affordable Fees (INR)
            </label>
            <input
              type="range"
              id="fees"
              name="fees"
              min={5000} // Minimum value
              max={100000} // Maximum value
              step={1000} // Step value for increments
              value={formData.fees}
              onChange={handleChange}
              className="w-full"
            />
            <div className="text-sm text-gray-700 mt-1">
              Value: ₹{formData.fees}
            </div>
          </div>




          <div>
            <label htmlFor="facilities" className="block text-sm font-medium">
              Required Facilities
            </label>
            <div id="facilities" className="mt-2">
              {["Sports", "Labs", "Arts", "Basic Facilities", "Robotics"].map((facility) => (
                <div key={facility} className="flex items-center">
                  <input
                    type="checkbox"
                    id={facility}
                    name="facilities"
                    value={facility}
                    checked={formData.facilities.includes(facility)}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <label htmlFor={facility} className="text-sm">
                    {facility}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="class" className="block text-sm font-medium">
              Student's Class
            </label>
            <input
              type="range"
              id="class"
              name="class"
              min={1} // Minimum value
              max={10} // Maximum value
              step={1} // Step value for increments
              value={formData.class}
              onChange={handleChange}
              className="w-full"
            />
            <div className="text-sm text-gray-700 mt-1">
              Value: Std. {formData.class}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md transition ${loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#CE4760] hover:bg-[#2F4550] text-white'
              }`}
          >
            {loading ? 'Finding Schools...' : 'Get Recommendations'}
          </button>
        </form>

        {
          recommendations.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Recommended Schools:</h3>
              <div className="space-y-4">
                {recommendations.map((school, index) => (
                  <div key={index} className="p-4 border border-gray-300 rounded-md">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-lg">{school.name}</h4>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        {school.match_percentage.toFixed(1)}% Match
                      </span>
                    </div>
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <p>Area: {school.area}</p>
                      <p>Medium: {school.medium}</p>
                      <p>Fees: ₹{school.fees.toLocaleString()}</p>
                      <p>Classes: {school.classes}</p>
                      <p>Facilities: {school.facilities.join(', ')}</p>
                      <p>Transport Available: {school.transport ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        }
      </div >
    </div >
    </div>
  );
};

export default CollegeRecommendation;