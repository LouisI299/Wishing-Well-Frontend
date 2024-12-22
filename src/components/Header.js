import React from "react";
import { StyledHeader } from "../styles/HeaderStyles";
import ToggleButton from "./ToggleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/WishingWellCircle.png";
import { fetchData } from "../utils/api";
import { useAuth } from "../contexts/AuthProvider";

const Header = () => {
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
  return (
    <StyledHeader>
      <nav>
        <div>
          <div>
            <img
              src={logo}
              alt="Logo"
              style={{ width: "50px", height: "50px" }}
            />
          </div>
          <ToggleButton />
          <div>
            <FontAwesomeIcon icon={faFire} style={{ fontSize: "2em" }} />
            <p>{streakCount}</p>
          </div>
        </div>
      </nav>
    </StyledHeader>
  );
};

export default Header;
