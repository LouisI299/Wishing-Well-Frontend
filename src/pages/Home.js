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
} from "../styles/HomeStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faChevronUp,
  faPiggyBank,
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

const Home = () => {
  //State
  const [goals, setGoals] = useState([]);
  const { token } = useAuth();
  const location = useLocation();
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

  const imageUrl = "../images/categoryImages/";

  //Get goals from api.js
  useEffect(() => {
    fetchData("/api/goals/user", setGoals, token);
  }, []);

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
          <Link to={`/goal-summary/${goal.id}`} key={goal.id}>
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
                <p>
                  {" "}
                  <FontAwesomeIcon icon={faCalendarAlt} />{" "}
                  {formatDate(goal.end_date)}
                </p>
              </CardBody>
            </StyledCard>
          </Link>
        );
      })}
    </HomeContainer>
  );
};
export default Home;
