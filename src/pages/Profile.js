// Profile.js
import React, { useEffect, useState } from "react";
import { fetchCurrentUser } from "../utils/api";
import { fetchData } from "../utils/api";
import { useAuth } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";

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
      <img src="#" alt="Profle Picture"></img>
      <h1>Hi, {profileData.first_name} {profileData.last_name}</h1>
      <p>Level: {profileData.level}</p>
      <p>Points: {profileData.points}</p>
      <h1>Account settings</h1>
      <div style = {{display: "flex", flexDirection: "column"}}>
        <Link to="/ContactDetails">Contact details</Link>
        <Link to="/Friends">Friends</Link>
        <Link to="/FriendRequests">Friend requests</Link>
        <button onClick={logout} style={{ width: "auto", padding: "0.3em", alignSelf: "flex-start", borderRadius: "2em", border: "none", paddingLeft: "1em", paddingRight: "1em"}}>Log out</button>
      </div>
    </div>
  );
};

export default Profile;
