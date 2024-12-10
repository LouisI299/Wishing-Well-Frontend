//Home dashboard page

//Imports
import { useEffect, useState } from "react";
import { fetchData } from "../utils/api";
import { Link } from "react-router-dom";

const Home = () => {
  //State
  const [goals, setGoals] = useState([]);

  //Get goals from api.js
  useEffect(() => {
    fetchData("/api/goals/", setGoals);
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {/* Display each goal */}
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            {goal.name}: {goal.status}. Target amount: {goal.target_amount},
            Current amount: {goal.current_amount}
          </li>
        ))}
      </ul>
      <Link to="/Profile">Profile</Link>
    </div>
  );
};

export default Home;
