import React, { useState, useEffect } from "react";
import { fetchData } from "../utils/api";
import { useAuth } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";
import { StyledCard } from "../styles/SocialStyles";

//Social feed page

const Social = () => {
  const { token } = useAuth();
  const [friends, setFriends] = useState([]);
  const [friendGoals, setFriendGoals] = useState({});

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

  useEffect(() => {
    const fetchFriendGoals = async () => {
      const goals = {};
      for (let friend of friends) {
        try {
          const response = await fetchData(
            `/api/goals/friend/${friend.id}`,
            null,
            token
          );
          goals[friend.id] = response || []; // Ensure response is an array
        } catch (error) {
          console.error(`Error fetching goals for friend ${friend.id}:`, error);
        }
      }
      setFriendGoals(goals);
    };

    if (friends.length > 0) {
      fetchFriendGoals();
    }
  }, [friends, token]);

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
      <div>
        {friends.length === 0 && <p>You have no friends yet.</p>}
        {friends.map((friend) => (
          <div key={friend.id}>
            {console.log("friend id: " + friend.id)}
            {console.log("goals for friend: " + friendGoals[friend.id])}

            {friendGoals[friend.id] && friendGoals[friend.id].length > 0 ? (
              friendGoals[friend.id].map((goal) => (
                <StyledCard key={goal.id}>
                  <h2>
                    {friend.first_name} {friend.last_name}
                  </h2>
                  <p>Goal: {goal.name}</p>
                  <p>Target Amount: {goal.target_amount}</p>
                  <p>Current Amount: {goal.current_amount}</p>
                </StyledCard>
              ))
            ) : (
              <p>No goals found for this friend.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Social;
