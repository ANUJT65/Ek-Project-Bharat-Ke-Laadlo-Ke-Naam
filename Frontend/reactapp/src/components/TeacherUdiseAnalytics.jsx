import React, { useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);


const TeacherUdiseAnalytics = () => {
    const [udiseCode, setUdiseCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [enrollmentData, setEnrollmentData] = useState(null);
    const [infrastructureData, setInfrastructureData] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setPdfUrl(null);
      setImageUrls([]);
      setEnrollmentData(null);
      setInfrastructureData(null);
      setLoading(true);
  
      try {
        const response = await axios.post("http://localhost:5000/fetch_convert_analyze", {
          udiseCode,
        });
        setPdfUrl(response.data.pdf_url);
        setImageUrls(response.data.image_urls);
        setEnrollmentData(response.data.enrollment_data);
        setInfrastructureData(response.data.infrastructure_data);
      } catch (err) {
        setError(err.response?.data?.error || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };
  
    const enrollmentGraphData = enrollmentData
      ? {
        labels: Object.keys(enrollmentData),
        datasets: [
          {
            label: "Total Students",
            data: Object.values(enrollmentData).map((d) => d.Total),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "Male Students",
            data: Object.values(enrollmentData).map((d) => d.B),
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
          {
            label: "Female Students",
            data: Object.values(enrollmentData).map((d) => d.G),
            backgroundColor: "rgba(255, 99, 132, 0.6)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      }
      : null;
  
    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
          labels: {
            font: {
              size: 16,
            },
          },
        },
        title: {
          display: true,
          text: "Enrollment by Category and Gender",
          font: {
            size: 20,
            weight: "bold",
          },
        },
      },
    };
  
    const createGraphData = (labels, data, title, backgroundColor) => ({
      labels,
      datasets: [
        {
          label: title,
          data,
          backgroundColor,
          borderColor: backgroundColor.replace("0.6", "1"),
          borderWidth: 1,
        },
      ],
    });
  
    const infrastructureGraphs = infrastructureData && {
      Classrooms: createGraphData(
        ["Total Classrooms", "Good Condition", "Minor Repair", "Major Repair"],
        [
          infrastructureData.Classrooms["Total Classrooms"],
          infrastructureData.Classrooms["Good Condition"],
          infrastructureData.Classrooms["Minor Repair"],
          infrastructureData.Classrooms["Major Repair"],
        ],
        "Classrooms Condition",
        "rgba(153, 102, 255, 0.6)"
      ),
      Toilets: createGraphData(
        [
          "Boys Total",
          "Girls Total",
          "Boys Functional",
          "Girls Functional",
          "CWSN Friendly Boys",
          "CWSN Friendly Girls",
          "Urinal Boys",
          "Urinal Girls",
        ],
        [
          infrastructureData.Toilets["Total Toilets"]["B"],
          infrastructureData.Toilets["Total Toilets"]["G"],
          infrastructureData.Toilets["Functional Toilets"]["B"],
          infrastructureData.Toilets["Functional Toilets"]["G"],
          infrastructureData.Toilets["Func. CWSN Friendly"]["B"],
          infrastructureData.Toilets["Func. CWSN Friendly"]["G"],
          infrastructureData.Toilets["Urinal"]["B"],
          infrastructureData.Toilets["Urinal"]["G"],
        ],
        "Toilet Facilities",
        "rgba(255, 159, 64, 0.6)"
      ),
      DigitalFacilities: createGraphData(
        ["Laptops", "Projectors", "Desktop", "DigiBoard", "Printer"],
        [
          infrastructureData.DigitalFacilities["Laptops"],
          infrastructureData.DigitalFacilities["Projectors"],
          infrastructureData.DigitalFacilities["Desktop"],
          infrastructureData.DigitalFacilities["DigiBoard"],
          infrastructureData.DigitalFacilities["Printer"],
        ],
        "Digital Facilities",
        "rgba(54, 162, 235, 0.6)"
      ),
    };
  
    const createGraphOptions = (title) => ({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
          labels: {
            font: {
              size: 16,
            },
          },
        },
        title: {
          display: true,
          text: title,
          font: {
            size: 20,
            weight: "bold",
          },
        },
      },
    });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <header className="flex justify-start items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">UDISE PDF Fetch, Convert & Analyze</h1>
          
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mb-6">
          <input
            type="text"
            value={udiseCode}
            onChange={(e) => setUdiseCode(e.target.value)}
            placeholder="Enter UDISE Code"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Processing..." : "Fetch & Analyze"}
          </button>
        </form>

        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        {pdfUrl && (
          <div className="bg-white shadow-md rounded-lg p-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">PDF Link:</h2>
            <p>
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {pdfUrl}
              </a>
            </p>
          </div>
        )}

        {imageUrls.length > 0 && (
          <div className="bg-white shadow-md rounded-lg p-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Converted Images:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <img src={url} alt={`Slide ${index + 1}`} className="w-full h-48 object-cover" />
                  </a>
                  <p className="text-sm text-gray-600 text-center p-2">Slide {index + 1}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {enrollmentData && infrastructureData && (
          <div className="bg-white shadow-md rounded-lg p-6 mt-6 space-y-6">
            {/* Enrollment Data and Classroom Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Enrollment Data:</h2>
                <Bar data={enrollmentGraphData} options={chartOptions} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Classroom Details:</h2>
                <Bar data={infrastructureGraphs.Classrooms} options={createGraphOptions("Classrooms Condition")} />
              </div>
            </div>

            {/* Toilet Facilities and Digital Facilities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Toilet Facilities:</h2>
                <Doughnut data={infrastructureGraphs.Toilets} options={createGraphOptions("Toilet Facilities")} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Digital Facilities:</h2>
                <Bar data={infrastructureGraphs.DigitalFacilities} options={createGraphOptions("Digital Facilities")} />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>

  )
}

export default TeacherUdiseAnalytics