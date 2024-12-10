//Home dashboard page

//Imports
import { useEffect, useState } from "react";
import { fetchData } from "../utils/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/global.css";

const Home = () => {
  //State
  const [goals, setGoals] = useState([]);

  //Get goals from api.js
  useEffect(() => {
    fetchData("/api/goals/", setGoals);
  }, []);

  return (
    <div>
      <Header />
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
      <Footer />
    </div>
  );
};

export default Home;
