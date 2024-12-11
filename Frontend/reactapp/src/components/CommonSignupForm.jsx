import React, { useState } from 'react';
import axios from 'axios';

const CommonSignupForm = ({ url, type }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    teacherId: '',
    studentId: '',
    teacherName: '',
    studentName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const data = {
      role: type.toLowerCase(),
      email: formData.email,
      password: formData.password,
      teacher_id: formData.teacherId,
      student_id: formData.studentId,
      teacher_name: formData.teacherName,
      student_name: formData.studentName,
    };

    try {
      const response = await axios.post(url, data);
      alert(response.data.message);
    } catch (error) {
      console.error('Error registering:', error);
      alert(error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center w-full max-w-sm'>
      <div className='text-left mb-2'>You're logging in as a {type}</div>

      <label className='text-left w-full mb-2'>Email ID:</label>
      <input
        className='p-1 w-full  mb-5 border border-gray-400'
        type='email'
        name='email'
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label className='text-left w-full mb-2'>Password:</label>
      <input
        className='p-1 w-full  mb-5 border border-gray-400'
        type='password'
        name='password'
        value={formData.password}
        onChange={handleChange}
        required
      />

      <label className='text-left w-full mb-2'>Confirm Password:</label>
      <input
        className='p-1 w-full  mb-5 border border-gray-400'
        type='password'
        name='confirmPassword'
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />

      {type === 'Teacher' && (
        <>
          <label className='text-left w-full mb-2'>Teacher Name:</label>
          <input
            className='p-1 w-full  mb-5 border border-gray-400'
            type='text'
            name='teacherName'
            value={formData.teacherName}
            onChange={handleChange}
            required
          />
          <label className='text-left w-full mb-2'>Teacher ID:</label>
          <input
            className='p-1 w-full  mb-5 border border-gray-400'
            type='text'
            name='teacherId'
            value={formData.teacherId}
            onChange={handleChange}
            required
          />
        </>
      )}

      {type === 'Student' && (
        <>
          <label className='text-left w-full mb-2'>Student Name:</label>
          <input
            className='p-1 w-full  mb-5 border border-gray-400'
            type='text'
            name='studentName'
            value={formData.studentName}
            onChange={handleChange}
            required
          />
          <label className='text-left w-full mb-2'>Student ID:</label>
          <input
            className='p-1 w-full  mb-5 border border-gray-400'
            type='text'
            name='studentId'
            value={formData.studentId}
            onChange={handleChange}
            required
          />
        </>
      )}

      <button type='submit' className='p-3 bg-[#912F56] w-3/4 text-white'>
        Sign Up as {type}
      </button>
    </form>
  );
};

export default CommonSignupForm;
