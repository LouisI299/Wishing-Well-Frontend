//Home dashboard page

//Imports
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { fetchData } from "../utils/api";
import { useAuth } from "../contexts/AuthProvider";

const Home = () => {
  //State
  const [goals, setGoals] = useState([]);
  const { token } = useAuth();
  const location = useLocation();
  const successMessage = location.state?.successMessage;

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
    <div>
      <h1>Home</h1>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {/* Display each goal */}
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            <Link to={`/goal-summary/${goal.id}`}>
              {goal.name}: {goal.status}. Target amount: {goal.target_amount},
              Current amount: {goal.current_amount}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
