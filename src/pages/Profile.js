// Profile.js
import React, { useEffect, useState } from "react";
import { fetchCurrentUser } from "../utils/api";
import { useAuth } from "../contexts/AuthProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userData = await fetchCurrentUser(token);
        setProfileData(userData);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [token]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <h1>Profile</h1>
      <p>First Name: {profileData.first_name}</p>
      <p>Last Name: {profileData.last_name}</p>
      <p>Email: {profileData.email}</p>
      <p>Join Date: {profileData.join_date}</p>
      <p>Points: {profileData.points}</p>
      <p>Level: {profileData.level}</p>
      <Footer />
    </div>
  );
};

export default Profile;
