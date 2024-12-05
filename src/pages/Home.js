import { useEffect, useState } from "react";
import { fetchData } from "../utils/api";

const Home = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetchData(setGoals);
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            {goal.name}: {goal.status}. Target amount: {goal.target_amount},
            Current amount: {goal.current_amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
