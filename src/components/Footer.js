import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";

const Footer = () => {
  return (
    <footer>
      <div>
        <div>
          <Link
            to={{
              pathname: "/",
              state: {
                from: "Footer",
              },
            }}
          >
            Home
          </Link>
        </div>
        <div>
          <Link
            to={{
              pathname: "/social",
              state: {
                from: "Footer",
              },
            }}
          >
            Social
          </Link>
        </div>
        <div>
          <Link
            to={{
              pathname: "/add-goal",
              state: {
                from: "Footer",
              },
            }}
          >
            Add Goal
          </Link>
        </div>
        <div>
          <Link
            to={{
              pathname: "/settings",
              state: {
                from: "Footer",
              },
            }}
          >
            Settings
          </Link>
        </div>
        <div>
          <Link
            to={{
              pathname: "/profile",
              state: {
                from: "Footer",
              },
            }}
          >
            Profile
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
