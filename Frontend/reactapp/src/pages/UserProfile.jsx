import React from 'react';
import Navbar2 from '../components/Navbar2';
import { useAuth } from '../contexts/userContext'; // Ensure to import the user context

const UserProfile = () => {
  const { user } = useAuth(); // Use the user context to get user data

  return (
    <div className="flex flex-col">
      <Navbar2 /> {/* Navbar for navigation */}
      
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>
        
        {user ? (
          <div className="profile-details bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-semibold mb-2">Profile Details</h2>
            <ul>
              <li><strong>Name:</strong> {user.name}</li>
              <li><strong>Email:</strong> {user.email}</li>
              <li><strong>Grade:</strong> {user.grade}</li>
              <li><strong>Age:</strong> {user.age}</li>
              <li><strong>School:</strong> {user.school}</li>
              <li><strong>Location:</strong> {user.location}</li>
              <li><strong>Family Income:</strong> {user.familyIncome}</li>
              <li><strong>Subjects Enrolled:</strong> {user.subjects.join(', ')}</li>
            </ul>
          </div>
        ) : (
          <p className="text-gray-500">User is not logged in.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
