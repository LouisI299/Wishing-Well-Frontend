// Profile.js
import React, { useEffect, useState } from "react";
import { fetchData } from "../utils/api";
import { useAuth } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";
import {
  ProfileContainer,
  ProfileText,
  STR,
  Links,
  Arrow,
  ProgressBarContainer,
  StyledProgressBar,
} from "../styles/ProfileStyles";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const { token } = useAuth();

  const [currentStreak, setCurrentStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);

  // ✅ Fetch huidige streak en hoogste streak
  useEffect(() => {
    const fetchStreaks = async () => {
      try {
        // Huidige streak ophalen
        const currentStreakData = await fetchData("/api/streaks/", null, token);
        setCurrentStreak(currentStreakData.current_streak || 0);

        // Hoogste streak ophalen
        const highestStreakData = await fetchData(
          "/api/streaks/highest",
          null,
          token
        );
        setHighestStreak(highestStreakData.highest_streak || 0);
      } catch (error) {
        console.error("Error fetching streak data:", error);
      }
    };

    fetchStreaks();
  }, [token]);

  // ✅ Fetch profielgegevens
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        await fetchData("/api/users/current", setProfileData, token);
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

  const roundedPoints = Math.floor(profileData.points);

  return (
    <ProfileContainer>
      <ProfileText>
        Hi, {profileData.first_name} {profileData.last_name}
      </ProfileText>
      <STR>
        <p>Level:</p>
        <p style={{ marginLeft: "0.5em" }}>{profileData.level}</p>
      </STR>
      <ProgressBarContainer>
        <StyledProgressBar
          bgcolor={"#6a1b9a"}
          now={(roundedPoints / (profileData.level * 100)) * 100}
          label={`${roundedPoints} XP`}
          completed={profileData.level * 100}
        />
      </ProgressBarContainer>
      <STR>
        <p>🔥 Current Streak:</p>
        <p style={{ marginLeft: "0.5em" }}>{currentStreak}</p>
      </STR>
      <STR>
        <p>🏆 Highest Streak:</p>
        <p style={{ marginLeft: "0.5em" }}>{highestStreak}</p>
      </STR>
      <Links>
        <Arrow>
          <Link to="/ContactDetails" style={{ textDecoration: "none" }}>
            Contact details
          </Link>
          <p>&gt;</p>
        </Arrow>
        <Arrow>
          <Link to="/Friends" style={{ textDecoration: "none" }}>
            Friends
          </Link>
          <p>&gt;</p>
        </Arrow>
        <Arrow>
          <Link to="/FriendRequests" style={{ textDecoration: "none" }}>
            Friend requests
          </Link>
          <p>&gt;</p>
        </Arrow>
        <button
          onClick={logout}
          style={{
            width: "auto",
            padding: "0.3em",
            alignSelf: "flex-start",
            borderRadius: "2em",
            border: "none",
            paddingLeft: "1em",
            paddingRight: "1em",
          }}
        >
          Log out
        </button>
      </Links>
    </ProfileContainer>
  );
};

export default Profile;
