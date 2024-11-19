import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const StudentAttendanceCard = () => {
  return (
    <div className="col-span-1 m-3 border p-4 rounded-md shadow-md">
      <div>
        <PieChart
          series={[
            {
              innerRadius: 30, 
              outerRadius: 40, 
              data: [
                { id: 0, value: 70 }, 
                { id: 1, value: 30 }, 
              ],
            },
          ]}
          width={200}
          height={100}
        />
      </div>

      <div className="flex flex-col justify-center">
        <div className="text-xl font-semibold">Maths</div>
        <div className="text-gray-500">Teacher1</div>
      </div>
    </div>
  );
};

export default StudentAttendanceCard;
