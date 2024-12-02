import React from "react";

const StudentDashboardCalendar = () => {
  const times = ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM"];
  const days = ["GMT + 5:30", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Define events
  const events = [
    { day: "Monday", startTime: "9 AM", endTime: "10 AM", title: "Math Class" },
    { day: "Tuesday", startTime: "10 AM", endTime: "12 PM", title: "Science Workshop" },
    { day: "Wednesday", startTime: "8 AM", endTime: "9 AM", title: "Team Meeting" },
    { day: "Thursday", startTime: "11 AM", endTime: "12 PM", title: "Project Review" },
    { day: "Friday", startTime: "9 AM", endTime: "11 AM", title: "Coding Session" },
  ];

  // Helper function to check if an event falls within a time slot
  const getEventForCell = (day, time) => {
    return events.find(event => event.day === day && event.startTime === time);
  };

  return (
    <div className="h-screen flex">
      <div className="m-5 border rounded-md grid grid-cols-6 grid-rows-14 flex-grow">
        {/* Days of the week */}
        {days.map((day, index) => (
          <div key={index} className="row-span-1 col-span-1 text-center border border-gray-200">
            {day}
          </div>
        ))}

        {/* Time slots and events */}
        {times.map((time, index) => (
          <React.Fragment key={index}>
            {/* Time column */}
            <div className="row-span-2 col-span-1 bg-[#F4F4F8] text-right pr-4 border-gray-200">
              {time}
            </div>
            {/* Day columns */}
            {Array(5)
              .fill("")
              .map((_, dayIndex) => {
                const day = days[dayIndex + 1]; // Skip GMT + 5:30
                const event = getEventForCell(day, time);
                return (
                  <div
                    key={dayIndex}
                    className={`row-span-2 col-span-1 bg-[#F4F4F8] border border-gray-200 ${
                      event ? "bg-blue-200" : ""
                    }`}
                  >
                    {event && (
                      <div className="text-sm text-center font-medium p-1">
                        {event.title}
                      </div>
                    )}
                  </div>
                );
              })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboardCalendar;
