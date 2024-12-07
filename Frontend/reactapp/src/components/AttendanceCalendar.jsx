import React from 'react';
import './AttendanceCalendar.css';

const AttendanceCalendar = () => {
  const attendanceData = [10, 25, 30, 50, 75, 90, 23, 56, 68, 23, 42, 73, 84]; // Example attendance data
  const maxAttendance = Math.max(...attendanceData);
  
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
      {attendanceData.map((attendance, index) => {
        const intensity = (attendance / maxAttendance) * 255; // Intensity proportion
        const color = `rgb(0, ${intensity}, 0)`; // Green color scale
        
        return (
          <div
            key={index}
            style={{
              width: '30px', // size of each cell
              height: '30px', // size of each cell
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              borderRadius: '3px',
              fontSize: '12px',
              backgroundColor: color
            }}
          >
          </div>
        );
      })}
    </div>
  );
};

export default AttendanceCalendar;
