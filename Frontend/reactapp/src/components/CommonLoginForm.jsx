import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/userContext';
import GoogleTranslate from './GoogleTranslate';

const CommonLoginForm = ({ url, type }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { user, login, logout } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      role: type.toLowerCase(),
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await axios.post(url, data);
      alert(response.data.message);
      login(data);
      if (type.toLowerCase() === 'student') {
        navigate('/student/dashboard');
      } else if (type.toLowerCase() === 'teacher') {
        navigate('/teacher/dashboard');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert(error.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded ">
        <div className="text-center text-xl font-bold mb-4">
          You're logging in as a {type}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email ID:
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password:
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#CE4760] text-white py-2 rounded hover:bg-[#2F4550] transition"
        >
          Login as {type}
        </button>
      </form>
    </div>
  );
};

export default CommonLoginForm;
