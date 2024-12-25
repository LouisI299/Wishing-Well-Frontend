// Profile.js
import React, { useEffect, useState } from "react";
import { fetchCurrentUser } from "../utils/api";
import { fetchData } from "../utils/api";
import { useAuth } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";
import logo from "../images/WishingWell800.png";
import { CDContainer, Title, Text, Image } from '../styles/ContactDetailsStyles';

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
    <CDContainer>
      <Title><h1>Contact details</h1></Title>
      <Text>
        <p>First name: {profileData.first_name}</p>
        <p>Last Name: {profileData.last_name}</p>
        <p>Email: {profileData.email}</p>
        <p>Join Date: {profileData.join_date}</p>
        <p>Delete your account <a href="#" style = {{textDecoration: "none", fontWeight: "bold"}}>here</a></p>
      </Text>
      <Image>
        <img src={logo} alt="logo" style = {{width: "20em"}}></img>
      </Image>
    </CDContainer>
  );
};

export default Profile;
