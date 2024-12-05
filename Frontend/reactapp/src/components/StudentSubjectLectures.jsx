import React, { useEffect, useState } from 'react';
import StudentSubjectLectureCard from './StudentSubjectLectureCard';
import axios from 'axios';

const StudentSubjectLectures = () => {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await axios.get('http://localhost:5000/dy_db/get_video_ids_and_urls');
        setLectures(response.data);
      } catch (error) {
        console.error('Error fetching lectures:', error);
      }
    };

    fetchLectures();
  }, []);

  return (
    <div className='flex flex-col px-5 my-5 w-full'>
      <div className='text-xl font-bold'>Lectures</div>
      {lectures.map((lecture, index) => (
        <StudentSubjectLectureCard
          key={index}
          name={lecture.video_id}
          url={lecture.video_url}
        />
      ))}
    </div>
  );
};

export default StudentSubjectLectures;