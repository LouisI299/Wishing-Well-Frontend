import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/goals/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setGoals(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Goals</h1>
        <ul>
          {goals.map((goal) => (
            <li>
              Id: {goal.id}, Name: {goal.name}, Target amount:{" "}
              {goal.target_amount}, Current amount: {goal.current_amount},
              Deadline: {goal.end_date}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
