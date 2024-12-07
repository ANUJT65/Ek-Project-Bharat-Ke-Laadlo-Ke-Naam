import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/userContext';

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
      login(response.data.user);
      console.log(user) // Save user data in context
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
    <form onSubmit={handleSubmit} className='w-full max-w-sm'>
      <div className='justify-start w-3/4 text-left'>You're logging in as a {type}</div>

      <div className='justify-start w-3/4 text-left'>Email ID:</div>
      <input
        className='p-1 w-3/4 mb-5 border border-gray-400'
        type='email'
        name='email'
        value={formData.email}
        onChange={handleChange}
        required
      />

      <div className='justify-start w-3/4 text-left'>Password:</div>
      <input
        className='p-1 w-3/4 mb-5 border border-gray-400'
        type='password'
        name='password'
        value={formData.password}
        onChange={handleChange}
        required
      />

      <button type='submit' className='p-3 bg-[#912F56] w-3/4 text-white'>
        Login as {type}
      </button>
    </form>
  );
};

export default CommonLoginForm;