import React, { useEffect, useState } from "react";
import { fetchData, postDataWithToken } from "../utils/api";
import { useAuth } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";

const Friends = () => {
  const { token } = useAuth();
  const [view, setView] = useState("main");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [friends, setFriends] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return; // Don't search if query is empty
    try {
      const response = await fetchData(
        `/api/users/search?query=${searchQuery}`,
        setSearchResults,
        token
      );
      console.log("Search response:", response);
      console.log("Search results:", searchResults);
      setView("search");
    } catch (error) {
      console.error("Error searching for friends:", error);
    }
  };

  const handleAddFriend = async (friend_id) => {
    try {
      await postDataWithToken("/api/friends/add", { friend_id }, token);
      console.log("Friend added successfully");
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  useEffect(() => {
    // Fetch friends list
    const fetchFriends = async () => {
      try {
        const response = await fetchData("/api/friends/all", null, token);
        console.log("Friends response:", response);
        setFriends(response || []); // Ensure response is an array
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, [token]);

  if (view === "main") {
    return (
      <div>
        <h1>My Friends</h1>
        {friends.length === 0 && <p>You have no friends yet.</p>}
        {friends.map((friend) => (
          <div key={friend.id}>
            <p>
              {friend.first_name} {friend.last_name}
            </p>
            <button>Remove Friend</button>
          </div>
        ))}
      </div>
    );
  }

  if (view === "search") {
    return (
      <div>
        <h1>Search Results</h1>
        <div>
          <h1>Friends</h1>
        </div>
        {searchResults.length === 0 && (
          <p>No results found for "{searchQuery}"</p>
        )}
        {searchResults.map((user) => (
          <div key={user.id}>
            <p>
              {user.first_name} {user.last_name}
            </p>
            <button onClick={() => handleAddFriend(user.id)}>Add Friend</button>
          </div>
        ))}
      </div>
    );
  }
};

export default Friends;
