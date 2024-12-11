//Home dashboard page

//Imports
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { fetchData } from "../utils/api";
import { useAuth } from "../contexts/AuthProvider";

const Home = () => {
  //State
  const [goals, setGoals] = useState([]);
  const { token } = useAuth();

  //Get goals from api.js
  useEffect(() => {
    fetchData("/api/goals/user", setGoals, token);
  }, []);

  if (goals == null || goals.length === 0) {
    return (
      <div>
        <h1>Home</h1>
        <div>No goals yet! Click "Add goal" to start saving now.</div>
      </div>
    );
  }

  return (
    <div>
      <h1>Home</h1>
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
