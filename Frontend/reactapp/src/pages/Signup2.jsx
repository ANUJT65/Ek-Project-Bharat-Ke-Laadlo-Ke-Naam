import React from 'react';
import coverImage from '../assets/images/logo1.jpg';

const Signup2 = () => {
  return (
    <div className="bg-gradient-to-r from-[#CE4760] via-[#2F4550] to-[#CE4760] font-inter h-screen w-screen bg-cover bg-center flex items-center justify-center">
      <div className="w-2/3 bg-white rounded-lg p-8">
        <div className="branding flex justify-center items-center gap-2 p-3 my-2 font-inter text-[#131B1F]">
          
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">Student Registration</h2>
        
        <form className="space-y-4">
          <div>
            <label htmlFor="currentSchool" className="block text-sm font-medium text-[#131B1F]">
              Current School
            </label>
            <input
              type="text"
              id="currentSchool"
              name="currentSchool"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-[#131B1F]">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="familyIncome" className="block text-sm font-medium text-[#131B1F]">
              Family Income (INR)
            </label>
            <select
              id="familyIncome"
              name="familyIncome"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              required
            >
              <option value="">Select Income</option>
              <option value="0-5000">0 - 5000</option>
              <option value="5001-10000">5001 - 10000</option>
              <option value="10001-20000">10001 - 20000</option>
              <option value="20001-50000">20001 - 50000</option>
              <option value="50001-100000">50001 - 100000</option>
              <option value="100001+">100001+</option>
            </select>
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-[#131B1F]">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              min="3"
              max="100"
              required
            />
          </div>

          <div>
            <label htmlFor="grade" className="block text-sm font-medium text-[#131B1F]">
              Grade
            </label>
            <input
              type="text"
              id="grade"
              name="grade"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#CE4760] text-white py-2 rounded-md hover:bg-[#2F4550] transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup2;
