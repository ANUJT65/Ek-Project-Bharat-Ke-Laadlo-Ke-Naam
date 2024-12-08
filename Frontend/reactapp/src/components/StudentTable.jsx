import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentTable = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/qa/get_all_test_details');
        const processedData = response.data.students.map(student => {
          // Calculate scores from test_detail_score
          let totalQuestions = 0;
          let correctAnswers = 0;

          Object.values(student.test_detail_score).forEach(video => {
            const questions = video.questions;
            Object.values(questions).forEach(result => {
              totalQuestions++;
              if (result === "1") correctAnswers++;
            });
          });

          const wrongAnswers = totalQuestions - correctAnswers;
          
          // Calculate attendance (based on actual attempts)
          const attendance = Math.round((totalQuestions / 20) * 100); // 20 as max questions
          
          // Calculate engagement from actual correct/total ratio
          const engagementScore = totalQuestions > 0 ? 
            Math.round((correctAnswers / totalQuestions) * 100) : 0;

          return {
            name: student.student_name,
            attendance: attendance,
            engagementScore: engagementScore,
            correctAnswers,
            wrongAnswers,
            totalQuestions
          };
        });
        
        setStudents(processedData);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">See how your students are performing</h2>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Questions Attempted</th>
            <th className="border px-4 py-2">Correct/Wrong</th>
            <th className="border px-4 py-2">Attendance (%)</th>
            <th className="border px-4 py-2">Engagement Score (%)</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border px-4 py-2 text-center">{student.name}</td>
              <td className="border px-4 py-2 text-center">{student.totalQuestions}</td>
              <td className="border px-4 py-2 text-center">
                {student.correctAnswers}/{student.wrongAnswers}
              </td>
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