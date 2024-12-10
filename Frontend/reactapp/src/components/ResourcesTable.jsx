import React from "react";

const ResourcesTable = () => {
  // Sample data for the table
  const tableData = [
    {
      id: "REQ001",
      requestee: "Kendriya Vidyalaya, IIT Chennai",
      item: "Laptops",
      quantity: 50,
      status: "New",
    },
    {
      id: "REQ002",
      requestee: "Jawahar Navodaya Vidyalaya, Pune",
      item: "Projectors",
      quantity: 10,
      status: "Accepted",
    },
    {
      id: "REQ003",
      requestee: "Government Senior Secondary School, Chandigarh",
      item: "Smartboards",
      quantity: 5,
      status: "Rejected",
    },
    {
      id: "REQ004",
      requestee: "Delhi Government Model School",
      item: "Chairs",
      quantity: 100,
      status: "Withdrawn",
    },
    {
      id: "REQ005",
      requestee: "Government-Aided Higher Secondary School, Coimbatore",
      item: "Desktops",
      quantity: 20,
      status: "Accepted",
    },
  ];

  return (
    <div style={{ margin: "20px", fontFamily: "Arial, sans-serif" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Request ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Requestee</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Request Item</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Quantity</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{row.id}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{row.requestee}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{row.item}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{row.quantity}</td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  color:
                    row.status === "New"
                      ? "blue"
                      : row.status === "Accepted"
                      ? "green"
                      : row.status === "Rejected"
                      ? "red"
                      : "gray",
                }}
              >
                {row.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResourcesTable;
