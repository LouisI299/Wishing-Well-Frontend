import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../contexts/AuthProvider";
import { fetchDataById, updateGoalData, deleteGoalData } from "../utils/api"; // Make sure you have the correct API utility

const EditGoal = () => {
  const { goalId } = useParams();
  const [goal, setGoal] = useState(null);
  const { token } = useAuth();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (!goalId) {
      console.error("Goal ID is missing from the URL");
      return;
    }

    const fetchGoal = async () => {
      try {
        const goalData = await fetchDataById("/api/goals", goalId, token);
        goalData.end_date = new Date(goalData.end_date)
          .toISOString()
          .split("T")[0];
        setGoal(goalData);
      } catch (error) {
        console.error("Error fetching goal data:", error);
      }
    };

    fetchGoal();
  }, [goalId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const end_date_string = goal.end_date.toString();
    try {
      const updatedGoal = {
        name: goal.name,
        target_amount: goal.target_amount,
        current_amount: goal.current_amount,
        end_date: end_date_string,
      };
      await updateGoalData(`/api/goals/${goalId}`, updatedGoal, token);
      console.log("Goal updated successfully!");
    } catch (error) {
      console.error("Error updating goal:", error);
      alert(`Failed to update goal: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }

    try {
      await deleteGoalData(`/api/goals/${goalId}`, token);
      console.log("Goal deleted successfully!");
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Error deleting goal:", error);
      alert(`Failed to delete goal: ${error.message}`);
    }
  };

  if (!goal) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Goal</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={goal.name}
            onChange={(e) => setGoal({ ...goal, name: e.target.value })}
          />
        </label>
        <label>
          Target Amount:
          <input
            type="number"
            value={goal.target_amount}
            onChange={(e) =>
              setGoal({ ...goal, target_amount: e.target.value })
            }
          />
        </label>
        <label>
          Current Amount:
          <input
            type="number"
            value={goal.current_amount}
            onChange={(e) =>
              setGoal({ ...goal, current_amount: e.target.value })
            }
          />
        </label>

        <label>
          End Date:
          <input
            type="date"
            placeholder={goal.end_date}
            value={goal.end_date}
            onChange={(e) => setGoal({ ...goal, end_date: e.target.value })}
          />
        </label>
        <button type="submit">Update Goal</button>
        <button
          type="button"
          onClick={handleDelete}
          style={{ backgroundColor: confirmDelete ? "red" : "initial" }}
        >
          {confirmDelete ? "Confirm Delete" : "Delete Goal"}
        </button>
      </form>
    </div>
  );
};

export default EditGoal;
