import React, { useEffect, useState } from 'react';
import Navbar2 from '../components/Navbar2';
import { useAuth } from '../contexts/userContext';
import axios from 'axios';
import { FaUser, FaEnvelope, FaGraduationCap, FaBirthdayCake, FaSchool, FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa';
import StudentSidebar from '../components/StudentSidebar';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';


const UserProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      axios.get(`https://backendfianlsih.azurewebsites.net/qa/get_student_details?email=${user.email}`)
        .then(response => {
          setStudentData(response.data);
        })
        .catch(error => {
          setError(error.response ? error.response.data.error : 'Error fetching data');
        });
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-[#2F4550]/10 flex">
      {/* <StudentSidebar /> */}
      <div className='flex flex-col w-full '>
        <Navbar2 />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-[#2F4550] mb-8 text-center">My Profile</h1>

            {user ? (
              studentData ? (
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-[#CE4760] to-[#2F4550] h-32"></div>
                  <div className="relative px-6 -mt-16">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <div className="flex items-center justify-center mb-6">
                        <div className="w-32 h-32 bg-gray-300 rounded-full border-4 border-white shadow-lg overflow-hidden">
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(studentData.student_name)}&size=128`}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      <button className="flex items-center gap-2" onClick={()=> navigate(-1)}>
                    <FaArrowLeft />Dashboard</button>
                      <div className="grid md:grid-cols-2 gap-6">
                        <InfoItem icon={<FaUser />} label="Name" value={studentData.student_name} />
                        <InfoItem icon={<FaEnvelope />} label="Email" value={studentData.email} />
                        <InfoItem icon={<FaGraduationCap />} label="Grade" value={studentData.grade} />
                        <InfoItem icon={<FaBirthdayCake />} label="Age" value={studentData.age} />
                        <InfoItem icon={<FaSchool />} label="School" value={studentData.current_school} />
                        <InfoItem icon={<FaMapMarkerAlt />} label="Location" value={studentData.location} />
                        <InfoItem icon={<FaMoneyBillWave />} label="Family Income" value={studentData.family_income} />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                error ? (
                  <div className="text-center p-4 bg-[#CE4760]/10 rounded-lg">
                    <p className="text-[#CE4760]">{error}</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CE4760] mx-auto"></div>
                    <p className="text-[#2F4550] mt-4">Loading profile data...</p>
                  </div>
                )
              )
            ) : (
              <div className="text-center p-8 bg-[#2F4550]/5 rounded-lg">
                <p className="text-[#2F4550]">Please log in to view your profile.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-[#2F4550]/5">
    <div className="text-[#CE4760] text-xl mr-3">
      {icon}
    </div>
    <div>
      <p className="text-sm text-[#2F4550]/70">{label}</p>
      <p className="font-semibold text-[#2F4550]">{value || 'Not provided'}</p>
    </div>
  </div>
);

export default UserProfile;