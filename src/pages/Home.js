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
import { faCalendarAlt, faChevronUp } from "@fortawesome/free-solid-svg-icons";

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

  return (
    <HomeContainer>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {/* Display each goal */}
      {goals.map((goal) => {
        const progress = (goal.current_amount / goal.target_amount) * 100;
        return (
          <Link to={`/goal-summary/${goal.id}`} key={goal.id}>
            <StyledCard>
              <CardImg
                className="card-img"
                src="https://via.placeholder.com/150"
                alt="Placeholder"
              />
              <CardHeader>
                <p className="title">{goal.name}</p>
                <p>
                  <FontAwesomeIcon icon={faCalendarAlt} />{" "}
                  {formatDate(goal.end_date)}
                </p>
              </CardHeader>

              <CardBody>
                <div id="targetDiv">
                  <p>Target:</p>
                </div>
                <div id="progressTargetDiv">
                  <GoalProgress>
                    <ProgressBar
                      now={progress}
                      label={`${progress.toFixed(2)}%`}
                    />

                    <Chevron progress={progress}>
                      <FontAwesomeIcon
                        icon={faChevronUp}
                        className="chevron-icon"
                      />
                      {goal.current_amount}€
                    </Chevron>
                  </GoalProgress>
                  <p>{goal.target_amount}€</p>
                </div>
              </CardBody>
            </StyledCard>
          </Link>
        );
      })}
    </HomeContainer>
  );
};
export default Home;
