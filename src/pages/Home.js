//Home dashboard page

//Imports
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Alert,
  Card,
  CardHeader,
  CardBody,
  CardImg,
  ProgressBar,
} from "react-bootstrap";
import { fetchData } from "../utils/api";
import { useAuth } from "../contexts/AuthProvider";
import {
  StyledCard,
  HomeContainer,
  Chevron,
  GoalProgress,
  CommentSection,
} from "../styles/HomeStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faChevronDown,
  faChevronUp,
  faPiggyBank,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
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
import profileImg from "../images/emptyProfilePicture.jpg";

const Home = () => {
  //State
  const [goals, setGoals] = useState([]);
  const { token } = useAuth();
  const location = useLocation();
  const [commentsExpanded, setCommentsExpanded] = useState({});
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState({});
  const successMessage = location.state?.successMessage;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

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
      case "emergency_fund":
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

  const toggleComments = (goalId) => () => {
    setCommentsExpanded((prevState) => ({
      ...prevState,
      [goalId]: !prevState[goalId],
    }));
  };

  const imageUrl = "../images/categoryImages/";

  //Get goals from api.js
  useEffect(() => {
    const fetchGoals = async () => {
      const goalsData = await fetchData("/api/goals/user", null, token);
      setGoals(goalsData);

      const likesData = [];
      const commentsData = [];

      for (const goal of goalsData) {
        const likes = await fetchData(`/api/likes/${goal.id}`, null, token);
        likesData[goal.id] = likes.total_likes || 0;
        const goalComments = await fetchData(
          `/api/comments/${goal.id}`,
          null,
          token
        );
        commentsData[goal.id] = goalComments || [];
      }

      setLikes(likesData);
      setComments(commentsData);
    };

    fetchGoals();
  }, [token]);

  if (goals == null || goals.length === 0) {
    return (
      <div>
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        <h1>Home</h1>
        <div>No goals yet! Click "Add goal" to start saving now.</div>
      </div>
    );
  }
  const sortedGoals = goals.sort((a, b) => b.status - a.status);
  return (
    <HomeContainer>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {/* Display each goal */}
      {sortedGoals.map((goal) => {
        const progress = (goal.current_amount / goal.target_amount) * 100;
        return (
          <StyledCard>
            <CardImg
              className="card-img"
              src={getImageByCategory(goal.category)}
              alt={`${goal.cate}`}
            />
            <CardHeader>
              <p className="title">{goal.name}</p>
              <FontAwesomeIcon icon={faPiggyBank} />
            </CardHeader>

            <CardBody>
              <div id="progressTargetDiv">
                <GoalProgress>
                  <ProgressBar
                    now={progress}
                    label={`${goal.current_amount}€`}
                  />
                </GoalProgress>
                <p>{goal.target_amount}€</p>
              </div>
              <div id="targetDiv">
                {goal.status === true && (
                  <p>You have saved {progress.toFixed(2)}% of your goal!</p>
                )}
                {goal.status === false && <p>Goal is completed!</p>}
              </div>
              <div className="dateSummary">
                <p>
                  {" "}
                  <FontAwesomeIcon icon={faCalendarAlt} />{" "}
                  {formatDate(goal.end_date)}
                </p>
                <Link to={`/goal-summary/${goal.id}`} key={goal.id}>
                  Summary
                </Link>
              </div>

              <div className="likesComments">
                <p>
                  <FontAwesomeIcon icon={faThumbsUp} /> {likes[goal.id]}
                </p>
                <p>
                  {comments[goal.id] && comments[goal.id].length} comments{" "}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    onClick={toggleComments(goal.id)}
                  />
                </p>
              </div>
              <CommentSection
                className={commentsExpanded[goal.id] ? "expanded" : ""}
              >
                {comments[goal.id] &&
                  comments[goal.id].map((comment) => (
                    <div key={comment.id}>
                      <div className="commentProfile">
                        <img src={profileImg} alt="Profile" />
                        <p>{comment.user_name}</p>
                      </div>
                      <div className="commentContent">
                        <p>{comment.text}</p>
                      </div>
                    </div>
                  ))}
              </CommentSection>
            </CardBody>
          </StyledCard>
        );
      })}
    </HomeContainer>
  );
};
export default Home;
