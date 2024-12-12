import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUserGroup, faCirclePlus, faGear, faUser } from "@fortawesome/free-solid-svg-icons";

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
            <FontAwesomeIcon icon={faHouse} style={{ fontSize: "2em" }} /> {/* Pas de grootte aan met inline CSS */}
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
            <FontAwesomeIcon icon={faUserGroup} style={{ fontSize: "2em" }} /> {/* Pas de grootte aan met inline CSS */}
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
            <FontAwesomeIcon icon={faCirclePlus} style={{ fontSize: "2em" }} /> {/* Pas de grootte aan met inline CSS */}
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
            <FontAwesomeIcon icon={faGear} style={{ fontSize: "2em" }} /> {/* Pas de grootte aan met inline CSS */}
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
            <FontAwesomeIcon icon={faUser} style={{ fontSize: "2em" }} /> {/* Pas de grootte aan met inline CSS */}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
