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

      <div className='justify-start w-3/4 text-left'>Confirm Password:</div>
      <input
        className='p-1 w-3/4 mb-5 border border-gray-400'
        type='password'
        name='confirmPassword'
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />

      {type === 'Teacher' && (
        <>
          <div className='justify-start w-3/4 text-left'>Teacher Name:</div>
          <input
            className='p-1 w-3/4 mb-5 border border-gray-400'
            type='text'
            name='teacherName'
            value={formData.teacherName}
            onChange={handleChange}
            required
          />
          <div className='justify-start w-3/4 text-left'>Teacher ID:</div>
          <input
            className='p-1 w-3/4 mb-5 border border-gray-400'
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
          <div className='justify-start w-3/4 text-left'>Student Name:</div>
          <input
            className='p-1 w-3/4 mb-5 border border-gray-400'
            type='text'
            name='studentName'
            value={formData.studentName}
            onChange={handleChange}
            required
          />
          <div className='justify-start w-3/4 text-left'>Student ID:</div>
          <input
            className='p-1 w-3/4 mb-5 border border-gray-400'
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