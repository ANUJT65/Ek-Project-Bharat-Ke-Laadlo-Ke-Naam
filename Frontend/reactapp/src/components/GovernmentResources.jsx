import React from "react";

const RecentRequests = () => {
  // Sample data for recent requests
  const requests = [
    { requestee: "Kendriya Vidyalaya, IIT Chennai", loggedAt: new Date("2024-12-11T14:25:00") },
    { requestee: "Jawahar Navodaya Vidyalaya, Pune", loggedAt: new Date("2024-12-11T13:50:00") },
    { requestee: "Government Senior Secondary School, Chandigarh", loggedAt: new Date("2024-12-11T12:15:00") },
    { requestee: "Delhi Government Model School", loggedAt: new Date("2024-12-11T11:45:00") },
    { requestee: "Government-Aided Higher Secondary School, Coimbatore", loggedAt: new Date("2024-12-11T10:30:00") },
  ];

  // Function to calculate time from current time
  const timeFromNow = (date) => {
    const now = new Date();
    const diff = Math.abs(now - date); // Difference in milliseconds

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  return (
    <div style={{ margin: "20px", fontFamily: "Arial, sans-serif" }}>
      <h3>Recent Requests</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {requests.map((request, index) => (
          <React.Fragment key={index}>
            <div style={{ fontWeight: "bold" }}>{request.requestee}</div>
            <div style={{ color: "#555" }}>{timeFromNow(request.loggedAt)}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default RecentRequests;
