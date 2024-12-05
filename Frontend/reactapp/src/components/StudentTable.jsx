import React from 'react';

const StudentTable = () => {
  // Sample data for the table
  const students = [
    { name: 'Alice', attendance: 75, engagementScore: 95 },
    { name: 'Bob', attendance: 79, engagementScore: 85 },
    { name: 'Charlie', attendance: 93, engagementScore: 92 },
    { name: 'Diana', attendance: 70, engagementScore: 75 },
    { name: 'Evan', attendance: 58, engagementScore: 88 },
  ];

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">See how your students are performing</h2>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Attendance</th>
            <th className="border px-4 py-2">Engagement Score</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border px-4 py-2 text-center">{student.name}</td>
              <td className="border px-4 py-2 text-center">{student.attendance}</td>
              <td className="border px-4 py-2 text-center">{student.engagementScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
