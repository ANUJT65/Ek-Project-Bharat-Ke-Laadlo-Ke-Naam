import React from 'react';
import CalendarDate from './CalendarDate';

const StudentCalendarPreview = () => {
  return (
    <div className="col-span-2 py-2 rounded-md px-5 flex flex-col border shadow-md min-h-0">
      <div className="text-xl font-bold">September 2024</div>
      
      {/* Calendar Dates */}
      <div className="flex justify-around mt-2 font-semibold">
        <CalendarDate day="Mon" date="23" today={true} />
        <CalendarDate day="Tue" date="24" />
        <CalendarDate day="Wed" date="25" />
        <CalendarDate day="Thur" date="26" />
        <CalendarDate day="Fri" date="27" />
        <CalendarDate day="Sat" date="28" />
      </div>
      
      {/* Upcoming/Ongoing Events */}
      <div className="text-md font-bold mt-4">Upcoming/Ongoing</div>
      <div className="flex justify-between">
        <div>
          <div className="font-bold mt-3">Science Lecture</div>
          <div className="text-[#878787] mt-1">4:00 pm - 5:00 pm</div>
        </div>
        <div>
          <button className="mt-4 py-2 px-3 font-bold bg-red-500 text-white mr-2 rounded-md">
            Join Live
          </button>
        </div>
      </div>

      <hr className="mt-2" />

      {/* Additional Events */}
      <div className="font-bold mt-3">Vocational Exam</div>
      <div className="text-[#878787] mt-1">8:00 pm - 10:00 pm</div>
      <div className="font-bold mt-3">Doubt Session</div>
      <div className="text-[#878787] mt-1">10:00 pm - 11:30 pm</div>
    </div>
  );
};

export default StudentCalendarPreview;
