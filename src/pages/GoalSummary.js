// Summary page for the goal

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { fetchDataById } from "../utils/api";

const GoalSummary = () => {
  const params = useParams();
  const { goalId } = params;
  const [goal, setGoal] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    if (!goalId) {
      console.error("Goal ID is missing from the URL");
      return;
    }

    const fetchGoal = async () => {
      try {
        const goalData = await fetchDataById("/api/goals", goalId, token);
        setGoal(goalData);
      } catch (error) {
        console.error("Error fetching goal data:", error);
      }
    };

    fetchGoal();
  }, [goalId, token]);

  if (!goal) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Goal Summary</h1>
      <p>Name: {goal.name}</p>
      <p>Status: {goal.status}</p>
      <p>Target Amount: {goal.target_amount}</p>
      <p>Current Amount: {goal.current_amount}</p>
      <p>Start Date: {goal.start_date}</p>
      <p>End Date: {goal.end_date}</p>
    </div>
  );
};

export default GoalSummary;
