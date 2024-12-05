import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardSidebar from '../components/DashboardSidebar';
import Navbar from '../components/Navbar';
import VideoRecordingCard from '../components/VideoRecordingCard';

const TeacherSingleSubjectPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/dy_db/get_data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='flex justify-around'>
      <DashboardSidebar />
      <div className='w-full flex flex-col'>
        <Navbar title='Subject Resources' />
        <div className='flex justify-start'>
          <div className='mx-5 my-2 w-1/2 h-64 grid grid-cols-2 grid-rows-3'>
            <div className="mx-2 my-2 row-span-1 col-span-1 border border-gray-300 rounded-md p-4 flex items-center ml-5 bg-white hover:bg-gray-100 shadow-md transition duration-200 text-left">
              <div className="text-4xl font-bold text-indigo-600">7</div>
              <div className="text-2xl mx-2 text-gray-700">Videos</div>
            </div>
            <div className="mx-2 my-2 row-span-1 col-span-1 border border-gray-300 rounded-md p-4 flex items-center ml-5 bg-white hover:bg-gray-100 shadow-md transition duration-200 text-left">
              <div className="text-4xl font-bold text-indigo-600">30</div>
              <div className="text-2xl mx-2 text-gray-700">Students</div>
            </div>
            <div className="mx-2 my-2 row-span-1 col-span-1 border border-gray-300 rounded-md p-4 flex items-center ml-5 bg-white hover:bg-gray-100 shadow-md transition duration-200 text-left">
              <div className="text-4xl font-bold text-indigo-600">2</div>
              <div className="text-2xl mx-2 text-gray-700">Tests</div>
            </div>
            <div className="mx-2 my-2 row-span-1 col-span-1 border border-gray-300 rounded-md p-4 flex items-center ml-5 bg-white hover:bg-gray-100 shadow-md transition duration-200 text-left">
              <div className="text-4xl font-bold text-indigo-600">7</div>
              <div className="text-2xl mx-2 text-gray-700">Suraj daal kuch</div>
            </div>
            <div className="mx-2 my-2 row-span-1 col-span-2 border border-gray-300 rounded-md p-4 flex items-center ml-5 bg-white hover:bg-gray-100 shadow-md transition duration-200 text-left">
              <div className="text-2xl mx-2 text-gray-700">Check Class analytics</div>
            </div>
          </div>
        </div>

        <div className='flex flex-col mt-10 mx-10'>
          <div className='text-2xl'>Videos</div>
          {data && data.map((item, index) => (
            <div key={index} className='mb-4'>
              <VideoRecordingCard videoUrl={item.video_url} />
              <div className='mt-2'>
                <h3 className='text-xl'>Mind Maps</h3>
                <div className='flex flex-wrap'>
                  {item.mind_map.urls.map((url, idx) => (
                    <img key={idx} src={url} alt={`Mind Map ${idx + 1}`} className='w-1/5 h-auto m-2' />
                  ))}
                </div>
              </div>
              <div className='mt-2'>
                <h3 className='text-xl'>Image Links</h3>
                <div className='flex flex-wrap'>
                  {Object.entries(item.image_links).map(([key, url], idx) => (
                    <div key={idx} className='w-1/5 h-auto m-2'>
                      <img src={url} alt={key} className='w-full h-auto' />
                      <p className='text-center'>{key}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className='mt-2'>
                <h3 className='text-xl'>Notes</h3>
                <a href={JSON.parse(item.notes).pdf_url} target='_blank' rel='noopener noreferrer' className='text-blue-500 underline'>
                  Download Notes
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherSingleSubjectPage;