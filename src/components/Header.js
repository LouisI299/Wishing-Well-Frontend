import React from "react";
import "../styles/Header.css";
import ToggleButton from "./ToggleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/WishingWellCircle.png";

const Header = () => {
  return (
    <header>
      <nav>
        <div>
          <div>
            <img src={logo} alt="Logo" style={{ width: "50px", height: "50px" }} />
          </div>
          <ToggleButton />
          <div>
            <FontAwesomeIcon icon={faFire} />
            <p>26</p>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
