// Profile.js
import React, { useEffect, useState } from "react";
import { fetchCurrentUser } from "../utils/api";
import { fetchData } from "../utils/api";
import { useAuth } from "../contexts/AuthProvider";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { ProfileContainer, ProfileText, STR, Links, Arrow } from '../styles/ProfileStyles';


const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const { token } = useAuth();

  const [streak, setStreak] = React.useState(0);
  
    const [streakCount, setStreakCount] = React.useState(0);
    React.useEffect(() => {
      fetchData("/api/streaks/", setStreak, token);
      if (streak == "0") {
        setStreakCount(0);
      } else {
        setStreakCount(streak.current_streak);
      }
    }, []);

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
    <ProfileContainer>
    <ProfileText>Hi, {profileData.first_name} {profileData.last_name}</ProfileText>
    <STR>
        <p>Current streak:</p>
        <p style={{marginLeft: "0.5em"}}>{streakCount}</p>
        {/* <FontAwesomeIcon icon={faFire}/> */}
    </STR>
    {/* <h1 style = {{marginLeft: "0.5em"}}>Account settings</h1> */}
    <Links>
      <Arrow><Link to="/ContactDetails" style = {{textDecoration: "none"}}>Contact details</Link><p>&gt;</p></Arrow>
      <Arrow><Link to="/Friends" style = {{textDecoration: "none"}}>Friends</Link><p>&gt;</p></Arrow>
      <Arrow><Link to="/FriendRequests" style = {{textDecoration: "none"}}>Friend requests</Link><p>&gt;</p></Arrow>
      <button onClick={logout} style={{ width: "auto", padding: "0.3em", alignSelf: "flex-start", borderRadius: "2em", border: "none", paddingLeft: "1em", paddingRight: "1em" }}>Log out</button>
    </Links>
  </ProfileContainer>
  );
};

export default Profile;
