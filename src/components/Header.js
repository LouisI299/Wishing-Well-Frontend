import React from "react";
import "../styles/Header.css";
import ToggleButton from "./ToggleButton";

const Header = () => {
  return (
    <header>
      <nav>
        <div>
          <div>
            <img src="#" alt="Logo" />
          </div>
          <ToggleButton />
          <div>
            <img src="#" alt="Flame" />
            <p>Streak</p>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
