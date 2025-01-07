import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";

//Social feed page

const Social = () => {
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false); // Track when to display results
  const [view, setView] = useState("main");
  const { token } = useAuth();

  return (
    <div>
      <h1>Social</h1>
      <Link
        to={{
          pathname: "/friends",
          state: {
            from: "Footer",
          },
        }}
      >
        <button>My Friends</button>
      </Link>
    </div>
  );
};
export default Social;
