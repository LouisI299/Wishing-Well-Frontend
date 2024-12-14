// Profile.js
import React, { useEffect, useState } from "react";
import { fetchCurrentUser } from "../utils/api";
import { fetchData } from "../utils/api";
import { useAuth } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";
import logo from "../images/WishingWell800.png";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userData = await fetchData(
          "/api/users/current",
          setProfileData,
          token
        );
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [token]);

  const logout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
      <h1>Contact details</h1>
      <p>First name: {profileData.first_name} {profileData.last_name}</p>
      <p>Last Name: {profileData.last_name}</p>
      <p>Email: {profileData.email}</p>
      <p>Join Date: {profileData.join_date}</p>
      <p>Delete your account <a href="#">here</a></p>
      </div>
      <div style = {{display: "flex", justifyContent: "center"}}>
        <img src={logo} alt="logo" style = {{width: "20em", marginTop: "4em"}}></img>
      </div>
      
    </div>
  );
};

export default Profile;
