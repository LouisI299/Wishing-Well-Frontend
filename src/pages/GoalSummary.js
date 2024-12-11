// Summary page for the goal
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { fetchDataById, makeTransaction } from "../utils/api";

const GoalSummary = () => {
  const params = useParams();
  const { goalId } = params;
  const [goal, setGoal] = useState(null);
  const { token } = useAuth();
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("deposit");

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

  const handleTransaction = (amount, goalId, token) => async (e) => {
    e.preventDefault();
    try {
      if (parseFloat(amount) > 0) {
        setType("deposit");
      } else {
        setType("withdrawal");
      }
      const data = {
        goal_id: goalId,
        amount: parseFloat(amount),
        type: type,
      };
      await makeTransaction(data, token);
      const updatedGoal = await fetchDataById("/api/goals", goalId, token);
      setGoal(updatedGoal);
    } catch (error) {
      console.error("Error making transaction:", error);
    }
  };

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
      <form onSubmit={handleTransaction(amount, goalId, token)}>
        <label>
          Add Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Amount</button>
      </form>
      <button>
        <Link to={`/edit-goal/${goal.id}`}>Edit Goal</Link>
      </button>
    </div>
  );
};

export default GoalSummary;
