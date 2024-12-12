import React from 'react';
import StudentSubjectCard from './StudentSubjectCard';
import mathsImage from '../assets/images/maths.jpg';
import sciImage from '../assets/images/science.jpg';
import historyImage from '../assets/images/history.jpg';
import StudentResources from './StudentResources';

const StudentDashboardHero = () => {
  return (
    <>
      <div className="p-5 font-inter flex flex-wrap lg:flex-nowrap justify-start items-start gap-5">
        {/* Hero Text Section */}
        <div className="px-5 pt-3 flex flex-col lg:w-1/2 w-full">
          <div className="text-3xl sm:text-5xl lg:text-6xl font-semibold">
            Hello Student! <br />
            Let's Start Learning
          </div>
          <div className="text-lg sm:text-xl mt-3">
            Take a look at your classes, schedule, assignments, tests, and attendance: all in one place!
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full lg:w-auto">
          {/* Join Live Card */}
          <div className="shadow-md border border-gray-300 rounded-lg p-4 flex items-center justify-center bg-[#CE4760] text-white">
            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-bold">Join Live</h3>
              <p className="text-sm mt-1">Connect to your live class session</p>
              <a
                className="mt-4 py-2 px-3 font-bold bg-[#2F4550] text-white rounded-md inline-block hover:bg-white hover:text-black"
                href="https://sync-space-nine.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Now
              </a>
            </div>
          </div>
          {/* Subject Cards */}
          <StudentSubjectCard subjectName="Maths" teacherName="Teacher1" link={mathsImage} />
          <StudentSubjectCard subjectName="Science" teacherName="Teacher2" link={sciImage} />
        </div>
      </div>

      {/* Resources and Additional Content */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-4 flex-grow">
        {/* Left Section (Resources) */}
        <div className="col-span-1 lg:col-span-3 flex flex-col">
          <StudentResources />
        </div>

        {/* Placeholder for other components */}
        <div className="hidden lg:block lg:col-span-2">
          {/* Add other components like `StudentDashboardAttendance` or `StudentCalendarPreview` here */}
        </div>
      </div>
    </>
  );
};

export default StudentDashboardHero;
