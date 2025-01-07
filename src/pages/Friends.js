import React, { useEffect, useState } from "react";
import { deleteGoalData, fetchData, postDataWithToken } from "../utils/api";
import { useAuth } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import {
  FriendsPageWrapper,
  PageTitle,
  SearchBarContainer,
  SearchInput,
  SearchButton,
  FriendsGrid,
  FriendCard,
  ProfileImage,
  FriendName,
  FriendButton,
  EmptyMessage,
} from "../styles/FriendsStyles";
import emptyProfilePicture from "../images/emptyProfilePicture.jpg";

const Friends = () => {
  const { token } = useAuth();
  const [view, setView] = useState("main");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [friends, setFriends] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [requestSent, setRequestSent] = useState([]);

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
      setSuccessMessage("Friend added successfully");
      setRequestSent([friend_id]);
    } catch (error) {
      console.error("Error adding friend:", error);
      setErrorMessage("Error adding friend. Please try again.");
    }
  };

  const handleRemoveFriend = async (friend_id) => {
    try {
      await deleteGoalData(`/api/friends/decline/${friend_id}`, token);
      console.log("Friend removed successfully");
      setSuccessMessage("Friend removed successfully");
    } catch (error) {
      console.error("Error removing friend:", error);
      setErrorMessage("Error removing friend. Please try again.");
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

  return (
    <>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <PageTitle>My Friends</PageTitle>

      {/* Search bar */}
      <SearchBarContainer>
        <SearchInput
          type="text"
          placeholder="Search for friends..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </SearchBarContainer>

      <FriendsPageWrapper>
        {/* Main view */}
        {view === "main" && (
          <>
            {friends.length === 0 && <p>You have no friends yet.</p>}
            <FriendsGrid>
              {friends.map((friend) => (
                <FriendCard key={friend.id}>
                  <ProfileImage
                    src={emptyProfilePicture}
                    alt="Profile Picture"
                  />
                  <FriendName>{`${friend.first_name} ${friend.last_name}`}</FriendName>
                  <FriendButton onClick={() => handleRemoveFriend(friend.id)}>
                    Remove Friend
                  </FriendButton>
                </FriendCard>
              ))}
            </FriendsGrid>
          </>
        )}

        {/* Search results view */}
        {view === "search" && (
          <>
            {searchResults.length === 0 ? (
              <EmptyMessage>No results found for "{searchQuery}"</EmptyMessage>
            ) : (
              <FriendsGrid>
                {searchResults.map((user) => (
                  <FriendCard key={user.id}>
                    <ProfileImage src={emptyProfilePicture} alt="Profile" />
                    <FriendName>{`${user.first_name} ${user.last_name}`}</FriendName>
                    <FriendButton
                      onClick={() => handleAddFriend(user.id)}
                      disabled={requestSent.includes(user.id)}
                    >
                      Add Friend
                    </FriendButton>
                  </FriendCard>
                ))}
              </FriendsGrid>
            )}
          </>
        )}
      </FriendsPageWrapper>
    </>
  );
};

export default Friends;
