import React, { useState, useEffect } from "react";
import { fetchData, postDataWithToken } from "../utils/api";
import { useAuth } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";
import { StyledCard } from "../styles/SocialStyles";

//Social feed page

const Social = () => {
  const { token } = useAuth();
  const [friends, setFriends] = useState([]);
  const [friendGoals, setFriendGoals] = useState({});
  const [goalLikes, setGoalLikes] = useState({});
  const [goalComments, setGoalComments] = useState({});

  const handleLike = async (goal_id) => {
    try {
      const response = await postDataWithToken(
        `/api/likes/${goal_id}`,
        null,
        token
      );
      if (response.message === "Liked") {
        setGoalLikes((prevLikes) => ({
          ...prevLikes,
          [goal_id]: prevLikes[goal_id] + 1,
        }));
      }

      if (response.message === "Unliked") {
        setGoalLikes((prevLikes) => ({
          ...prevLikes,
          [goal_id]: prevLikes[goal_id] - 1,
        }));
      }
      console.log("Like response:", response);
    } catch (error) {
      console.error("Error liking goal:", error);
    }
  };

  useEffect(() => {
    // Fetch friends list
    const fetchFriends = async () => {
      try {
        const response = await fetchData("/api/friends/all", null, token);

        setFriends(response || []);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, [token]);

  useEffect(() => {
    const fetchFriendGoals = async () => {
      const goals = {};
      const likes = {};
      const comments = {};
      for (let friend of friends) {
        try {
          const response = await fetchData(
            `/api/goals/friend/${friend.id}`,
            null,
            token
          );
          goals[friend.id] = response || [];

          for (let goal of goals[friend.id]) {
            const likesResponse = await fetchData(
              `/api/likes/${goal.id}`,
              null,
              token
            );
            likes[goal.id] = likesResponse.total_likes || 0;

            const commentsResponse = await fetchData(
              `/api/comments/${goal.id}`,
              null,
              token
            );
            comments[goal.id] = commentsResponse || [];
          }
        } catch (error) {
          console.error(`Error fetching goals for friend ${friend.id}:`, error);
        }
      }
      setFriendGoals(goals);
      setGoalLikes(likes);
      setGoalComments(comments);
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
                  <button onClick={() => handleLike(goal.id)}>Like</button>
                  <p>Likes: {goalLikes[goal.id]}</p>
                  <p>Comments:</p>
                  {goalComments[goal.id] && goalComments[goal.id].length > 0 ? (
                    goalComments[goal.id].map((comment) => (
                      <div key={comment.id}>
                        <p>{comment.text}</p>
                      </div>
                    ))
                  ) : (
                    <p>No comments found for this goal.</p>
                  )}
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
