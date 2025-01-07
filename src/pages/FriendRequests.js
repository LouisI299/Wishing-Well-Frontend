import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { fetchData, postDataWithToken, putDataWithToken } from "../utils/api";

const FriendRequests = () => {
  const { token } = useAuth();
  const [friendRequests, setFriendRequests] = useState([]);
  const [requestUser, setRequestUser] = useState([]);

  const GetFriendRequests = useCallback(async () => {
    try {
      const requests = await fetchData("/api/friends/requests", null, token);
      console.log("Friend requests:", requests); // Log requests for debugging
      const requestsWithUserData = await Promise.all(
        requests.map(async (request) => {
          const user = await fetchData(
            `/api/users/${request.user_id1}`,
            null,
            token
          );
          if (!user) {
            console.error("User not found for request:", request);
            return request;
          }
          return { ...request, user };
        })
      );
      setFriendRequests(requestsWithUserData);
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    }
  }, [token]);

  const handleAccept = async (id) => {
    try {
      const response = await putDataWithToken(
        `/api/friends/accept/${id}`,
        null,
        token
      );
      console.log(response);
      // Refresh friend requests after accepting
      GetFriendRequests();
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const handleDecline = async (id) => {
    try {
      const response = await postDataWithToken(
        `/api/friends/decline/${id}`,
        null,
        token
      );
      console.log(response);
      // Refresh friend requests after declining
      GetFriendRequests();
    } catch (error) {
      console.error("Error declining friend request:", error);
    }
  };

  useEffect(() => {
    GetFriendRequests();
  }, [GetFriendRequests]);

  return (
    <div>
      <h1>Friend requests</h1>
      {friendRequests.length === 0 && (
        <p>You have no friend requests at the moment.</p>
      )}
      {friendRequests.map((request) => (
        <div key={request.id}>
          {request.user ? (
            <>
              <p>
                {request.user.first_name} {request.user.last_name} wants to be
                your friend
              </p>
              <button onClick={() => handleAccept(request.id)}>Accept</button>
              <button onClick={() => handleDecline(request.id)}>Decline</button>
            </>
          ) : (
            <p>User information not available</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FriendRequests;
