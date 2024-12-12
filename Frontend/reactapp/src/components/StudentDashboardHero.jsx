import React from 'react';
import StudentSubjectCard from './StudentSubjectCard';
import mathsImage from '../assets/images/maths.jpg'; // Import the specific image
import sciImage from '../assets/images/science.jpg'; // Import the specific image
import historyImage from '../assets/images/history.jpg'; // Import the specific image
import StudentDashboardAttendance from './StudentDashboardAttendance';
import StudentResources from './StudentResources';
import StudentVocationalLearning from './StudentVocationalLearning';
import StudentCalendarPreview from './StudentCalendarPreview';

const StudentDashboardHero = () => {
  return (
    <>
      <div className="p-5 font-inter flex justify-start">
        <div className="px-5 pt-3 flex flex-col w-1/2">
          <div className="text-6xl font-semibold">
            Hello Student! <br />
            Let's Start Learning
          </div>
          <div className="text-xl mt-3">
            Take a look at your classes, schedule, assignments, tests, and attendance: all in one place!
          </div>
        </div>
        <div className="grid grid-cols-3 justify-start gap-4">
          <div className="shadow-md border border-gray-300 rounded-lg p-4 flex items-center justify-center bg-[#CE4760] text-white">
            <div>
              <h3 className="text-xl font-bold">Join Live</h3>
              <p className="text-sm mt-1">Connect to your live class session</p>
              <a
                className="mt-4 py-2 px-3 font-bold bg-[#2F4550] text-white rounded-md inline-block"
                href="https://sync-space-nine.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Now
              </a>
            </div>
          </div>
          <StudentSubjectCard subjectName="Maths" teacherName="Teacher1" link={mathsImage} />
          <StudentSubjectCard subjectName="Science" teacherName="Teacher2" link={sciImage} />

        </div>
      </div>

      <div className="mt-10 grid grid-cols-5 gap-4 flex-grow">
        <div className="col-span-3 flex flex-col">
          <StudentResources />
        </div>

      </div>
    </>
  );
};

export default StudentDashboardHero;
