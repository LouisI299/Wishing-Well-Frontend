import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";

const Footer = () => {
  return (
    <footer>
      <div>
        <div>
            <Link to="/Home">Home</Link>
        </div>
        <div>
            <Link to="/Social">Social</Link>
        </div>
        <div>
            <Link to="/AddGoal">Add goal</Link>
        </div>
        <div>
            <Link to="/Settings">Settings</Link>
        </div>
        <div>
            <Link to="/Profile">Profile</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;