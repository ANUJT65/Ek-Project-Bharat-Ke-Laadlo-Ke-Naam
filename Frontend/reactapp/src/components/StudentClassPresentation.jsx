import React from 'react';
import SamplePPTScreen from '../assets/images/SamplePPTScreen.png'; // Import the image

const StudentClassPresentation = () => {
  return (
    <div className="h-full bg-red-200 relative shadow-md ">
      <img src={SamplePPTScreen} alt="Presentation" className="w-full h-full object-cover rounded-md hover:border " />

      <div className="absolute bottom-5 left-0 w-full flex justify-center space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded shadow">
            Mute
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded shadow">
          Leave Meet
        </button>
      </div>
    </div>
  );
};

export default StudentClassPresentation;
