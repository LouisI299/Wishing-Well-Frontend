import React, { useState, useEffect } from "react";
import { fetchData, postDataWithToken } from "../utils/api";
import { useAuth } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faThumbsUp,
  faComment,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

import {
  StyledCard,
  CardBody,
  CardHeader,
  CardFooter,
  CardImg,
  CardTitle,
  StyledBody,
  ProfileImg,
  GoalProgress,
  commentSection,
  CommentSection,
} from "../styles/SocialStyles";
import electronicsImg from "../images/categoryImages/electronics.jpg";
import businessImg from "../images/categoryImages/business.jpg";
import charityImg from "../images/categoryImages/charity.jpg";
import drivingLessonsImg from "../images/categoryImages/driving-lessons.jpg";
import carImg from "../images/categoryImages/car.jpg";
import emergencyFundImg from "../images/categoryImages/emergency-fund.jpg";
import festivalImg from "../images/categoryImages/festival.jpg";
import gamingImg from "../images/categoryImages/gaming.jpg";
import houseImg from "../images/categoryImages/house.jpg";
import sportsImg from "../images/categoryImages/sports.jpg";
import studiesImg from "../images/categoryImages/studies.jpg";
import weddingImg from "../images/categoryImages/wedding.jpg";
import customImg from "../images/categoryImages/custom.jpg";
import vacationImg from "../images/categoryImages/vacation.jpg";
import StyledContainer from "../styles/StyledContainer";
import profilePicture from "../images/emptyProfilePicture.jpg";

//Social feed page

const Social = () => {
  const { token } = useAuth();
  const [friends, setFriends] = useState([]);
  const [friendGoals, setFriendGoals] = useState({});
  const [goalLikes, setGoalLikes] = useState({});
  const [goalComments, setGoalComments] = useState({});
  const [commentText, setCommentText] = useState({});
  const [expandedComments, setExpandedComments] = useState({});

  const getImageByCategory = (category) => {
    switch (category) {
      case "electronics":
        return electronicsImg;
      case "business":
        return businessImg;
      case "charity":
        return charityImg;
      case "driving-lessons":
        return drivingLessonsImg;
      case "car":
        return carImg;
      case "emergency-fund":
        return emergencyFundImg;
      case "festival":
        return festivalImg;
      case "gaming":
        return gamingImg;
      case "house":
        return houseImg;
      case "sports":
        return sportsImg;
      case "studies":
        return studiesImg;
      case "wedding":
        return weddingImg;
      case "vacation":
        return vacationImg;
      case "custom":
        return customImg;
      default:
        return customImg;
    }
  };

  const handleLike = async (goal_id) => {
    try {
      const response = await postDataWithToken(
        `/api/likes/${goal_id}`,
        null,
        token
      );
      setGoalLikes((prevLikes) => ({
        ...prevLikes,
        [goal_id]:
          response.message === "Liked"
            ? prevLikes[goal_id] + 1
            : prevLikes[goal_id] - 1,
      }));
    } catch (error) {
      console.error("Error liking goal:", error);
    }
  };

  const handleCommentChange = (goal_id, text) => {
    setCommentText((PrevText) => ({
      ...PrevText,
      [goal_id]: text,
    }));
  };

  const handleCommentSubmit = async (goal_id) => {
    if (!commentText[goal_id]?.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    try {
      const response = await postDataWithToken(
        `/api/comments/${goal_id}`,
        { text: commentText[goal_id] },
        token
      );

      if (!response.id || !response.text || !response.goal_id) {
        console.error("Invalid comment response:", response);
        return;
      }

      const newComment = {
        id: response.id,
        text: response.text,
        user_id: response.user_id,
        goal_id: response.goal_id,
        created_at: response.created_at,
        user_name: response.user_name,
      };

      setGoalComments((prevComments) => ({
        ...prevComments,
        [goal_id]: [...(prevComments[goal_id] || []), newComment],
      }));

      setCommentText((prevText) => ({
        ...prevText,
        [goal_id]: "",
      }));
    } catch (error) {
      console.error("Error commenting on goal:", error);
    }
  };

  const toggleComments = (goal_id) => {
    setExpandedComments((prevExpanded) => ({
      ...prevExpanded,
      [goal_id]: !prevExpanded[goal_id],
    }));
    console.log("expanded comments: " + expandedComments);
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
    <StyledContainer>
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
        {friends.length === 0 && (
          <p key="no-friends">You have no friends yet.</p>
        )}
        {friends.map((friend) => (
          <StyledBody key={friend.id}>
            {friendGoals[friend.id] && friendGoals[friend.id].length > 0 ? (
              friendGoals[friend.id].map((goal, index) => (
                <StyledCard key={goal.id || index}>
                  <CardTitle>
                    <ProfileImg src={profilePicture} alt="Profile picture" />
                    <h2>
                      {friend.first_name} {friend.last_name}
                    </h2>
                  </CardTitle>

                  <CardImg
                    src={getImageByCategory(goal.category)}
                    alt={goal.category}
                  />

                  <CardHeader>
                    <h2>{goal.name}</h2>
                  </CardHeader>

                  <CardBody>
                    <GoalProgress>
                      <ProgressBar
                        now={(goal.current_amount / goal.target_amount) * 100}
                        label={`${(
                          (goal.current_amount / goal.target_amount) *
                          100
                        ).toFixed(2)}%`}
                      />
                    </GoalProgress>

                    <p>
                      {friend.first_name} has saved{" "}
                      {(
                        (goal.current_amount / goal.target_amount) *
                        100
                      ).toFixed(2)}
                      % of his goal!
                    </p>

                    <p>
                      <FontAwesomeIcon icon={faCalendarAlt} />
                      {
                        new Date(goal.start_date).toISOString().split("T")[0]
                      } - <FontAwesomeIcon icon={faCalendarAlt} />
                      {new Date(goal.end_date).toISOString().split("T")[0]}
                    </p>
                  </CardBody>

                  <div className="likeCommentCount">
                    <div className="likeDiv">
                      <FontAwesomeIcon icon={faThumbsUp} />
                      <p>{goalLikes[goal.id]}</p>
                    </div>
                    <div className="commentDiv">
                      <FontAwesomeIcon icon={faComment} />
                      <p>
                        {goalComments[goal.id] && goalComments[goal.id].length}
                      </p>
                    </div>
                  </div>

                  <CardFooter>
                    <div className="likeDiv">
                      <button onClick={() => handleLike(goal.id)}>Like</button>
                    </div>
                    <div className="commentDiv">
                      <button onClick={() => toggleComments(goal.id)}>
                        Comment
                      </button>
                    </div>
                  </CardFooter>

                  <CommentSection
                    className={expandedComments[goal.id] ? "expanded" : ""}
                  >
                    <div className="commentInput">
                      <textarea
                        value={commentText[goal.id] || ""}
                        onChange={(e) =>
                          handleCommentChange(goal.id, e.target.value)
                        }
                        placeholder="Add a comment"
                      />
                      <button onClick={() => handleCommentSubmit(goal.id)}>
                        <FontAwesomeIcon icon={faPaperPlane} />
                      </button>
                    </div>

                    {goalComments[goal.id] &&
                    goalComments[goal.id].length > 0 ? (
                      goalComments[goal.id].map((comment, commentIndex) => {
                        if (!comment.id || !comment.text) {
                          console.error("Invalid comment detected:", comment);
                        }

                        return (
                          <div
                            key={comment.id || `${goal.id}-${commentIndex}`}
                            className="comment"
                          >
                            {console.log("comment: " + comment)}
                            <div className="commentProfile">
                              <img src={profilePicture} alt="Profile picture" />
                              <p>{comment.user_name}</p>
                            </div>
                            <div className="commentText">
                              <p>{comment.text}</p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p>No comments found for this goal.</p>
                    )}
                  </CommentSection>
                </StyledCard>
              ))
            ) : (
              <p key={`no-goals-${friend.id}`}>
                Nothing to see here yet. Add friends to see their goals!
              </p>
            )}
          </StyledBody>
        ))}
      </div>
    </StyledContainer>
  );
};
export default Social;
