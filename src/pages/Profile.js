import React, { useEffect, useState } from "react";
import { fetchData } from "../utils/api";
import { useAuth } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";
import {
  ProfileContainer,
  ProfileHeader,
  ProfileContent,
  ProfileText,
  ProfileStats,
  STR,
  Links,
  Arrow,
  ProgressBarContainer,
  StyledProgressBar,
  LogoutButton,
} from "../styles/ProfileStyles";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [streaks, setStreaks] = useState({ current: 0, highest: 0 });
  const { token } = useAuth();

  useEffect(() => {
    const fetchProfileAndStreaks = async () => {
      try {
        const [profile, currentStreak, highestStreak] = await Promise.all([
          fetchData("/api/users/current", null, token),
          fetchData("/api/streaks/", null, token),
          fetchData("/api/streaks/highest", null, token),
        ]);

        setProfileData(profile);
        setStreaks({
          current: currentStreak.current_streak || 0,
          highest: highestStreak.highest_streak || 0,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProfileAndStreaks();
  }, [token]);

  const logout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  if (!profileData) {
    return <div>Loading profile data...</div>;
  }

  const roundedPoints = Math.floor(profileData.points);

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileText>
          Hi, {profileData.first_name} {profileData.last_name}
        </ProfileText>
      </ProfileHeader>
      <ProfileContent>
        <ProfileStats>
          <STR>
            <p>Level:</p>
            <p>{profileData.level}</p>
          </STR>
          <ProgressBarContainer>
            <StyledProgressBar
              now={(roundedPoints / (profileData.level * 100)) * 100}
              label={`${roundedPoints} XP`}
              completed={profileData.level * 100}
            />
          </ProgressBarContainer>
          <STR>
            <p>🔥 Current Streak:</p>
            <p>{streaks.current}</p>
          </STR>
          <STR>
            <p>🏆 Highest Streak:</p>
            <p>{streaks.highest}</p>
          </STR>
        </ProfileStats>
        <Links>
          {[
            { to: "/ContactDetails", text: "Contact details" },
            { to: "/Friends", text: "Friends" },
            { to: "/FriendRequests", text: "Friend requests" },
          ].map((link) => (
            <Arrow key={link.to}>
              <Link to={link.to}>{link.text}</Link>
              <p>&gt;</p>
            </Arrow>
          ))}
          <LogoutButton onClick={logout}>Log out</LogoutButton>
        </Links>
      </ProfileContent>
    </ProfileContainer>
  );
};

export default Profile;
