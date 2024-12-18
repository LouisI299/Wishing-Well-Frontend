import React from "react";
import { StyledHeader } from "../styles/HeaderStyles";
import ToggleButton from "./ToggleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/WishingWellCircle.png";

const Header = () => {
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
            <p>26</p>
          </div>
        </div>
      </nav>
    </StyledHeader>
  );
};

export default Header;
