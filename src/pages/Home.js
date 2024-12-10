//Home dashboard page

//Imports
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { fetchData } from "../utils/api";

const Home = () => {
  //State
  const [goals, setGoals] = useState([]);
  const { token } = useAuth();

  //Get goals from api.js
  useEffect(() => {
    fetchData("/api/goals/user", setGoals, token);
  }, []);

  return (
    <div>
      <Header />
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
      <Link to="/Profile">Profile</Link>
      <Footer />
    </div>
  );
};

export default Home;
