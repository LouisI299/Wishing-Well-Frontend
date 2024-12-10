import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { fetchDataById, updateGoalData } from "../utils/api"; // Make sure you have the correct API utility

const EditGoal = () => {
    const { goalId } = useParams();
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedGoal = {
                name: goal.name,
                target_amount: goal.target_amount,
                current_amount: goal.current_amount,
                start_date: goal.start_date,
                end_date: goal.end_date,
            };
            await updateGoalData(`/api/goals/${goalId}`, updatedGoal, token);
            console.log("Goal updated successfully!");
        } catch (error) {
            console.error("Error updating goal:", error);
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
                        onChange={(e) => setGoal({ ...goal, target_amount: e.target.value })}
                    />
                </label>
                <label>
                    Current Amount:
                    <input
                        type="number"
                        value={goal.current_amount}
                        onChange={(e) => setGoal({ ...goal, current_amount: e.target.value })}
                    />
                </label>
                <label>
                    Start Date:
                    <input
                        type="date"
                        value={goal.start_date}
                        onChange={(e) => setGoal({ ...goal, start_date: e.target.value })}
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        value={goal.end_date}
                        onChange={(e) => setGoal({ ...goal, end_date: e.target.value })}
                    />
                </label>
                <button type="submit">Update Goal</button>
            </form>
        </div>
    );
};

export default EditGoal;
