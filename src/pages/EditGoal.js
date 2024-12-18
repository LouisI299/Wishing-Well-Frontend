import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { fetchDataById, updateGoalData, deleteGoalData } from "../utils/api";

const EditGoal = () => {
  const { goalId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [goal, setGoal] = useState(null);
  const [saving_method, setSavingMethod] = useState("");
  const [period_amount, setPeriodAmount] = useState("");
  const [timeNeeded, setTimeNeeded] = useState("");
  const [calculatedPayment, setCalculatedPayment] = useState("");
  const [calculatedEndDate, setCalculatedEndDate] = useState(""); // Added state for calculated end date
  const [paymentFrequency, setPaymentFrequency] = useState("monthly");
  const [endDateInput, setEndDateInput] = useState(""); // New state for end date input
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (!goalId) {
      console.error("Goal ID is missing from the URL");
      return;
    }

    const fetchGoal = async () => {
      try {
        const goalData = await fetchDataById("/api/goals", goalId, token);
        goalData.end_date = new Date(goalData.end_date).toISOString(); // Ensure end_date is in datetime format
        setGoal(goalData);
        setSavingMethod(goalData.saving_method === true ? "true" : goalData.saving_method === false ? "false" : "end_date");
        setPeriodAmount(goalData.period_amount);
      } catch (error) {
        console.error("Error fetching goal data:", error);
        setError("Failed to fetch goal data.");
      }
    };

    fetchGoal();
  }, [goalId, token]);

  useEffect(() => {
    if (!goal || saving_method === "" || period_amount === "") return;

    setError("");
    if (saving_method === "true") {
      const monthsNeeded = (goal.target_amount - goal.current_amount) / period_amount;
      if (monthsNeeded > 0) {
        setTimeNeeded(`${Math.ceil(monthsNeeded)} months`);
      } else {
        setError("Monthly payment is too high or invalid.");
      }
    } else if (saving_method === "false") {
      const weeksNeeded = (goal.target_amount - goal.current_amount) / period_amount;
      if (weeksNeeded > 0) {
        setTimeNeeded(`${Math.ceil(weeksNeeded)} weeks`);
      } else {
        setError("Weekly payment is too high or invalid.");
      }
    }
  }, [goal, saving_method, period_amount]);

  // Calculate the end date when the payment frequency is set
  useEffect(() => {
    if (!goal || !period_amount) return;

    setError("");

    const remainingAmount = goal.target_amount - goal.current_amount;
    let totalMonths, totalWeeks, calculatedPaymentAmount;

    if (saving_method === "true") {
      totalMonths = Math.ceil(remainingAmount / period_amount);
      if (totalMonths <= 0) {
        setError("Monthly payment is too high.");
        return;
      }
      // Calculate payment and end date
      calculatedPaymentAmount = remainingAmount / totalMonths;
      setCalculatedPayment(calculatedPaymentAmount.toFixed(2));

      const calculatedEndDate = new Date();
      calculatedEndDate.setMonth(calculatedEndDate.getMonth() + totalMonths);
      setCalculatedEndDate(calculatedEndDate.toISOString());
    } else if (saving_method === "false") {
      totalWeeks = Math.ceil(remainingAmount / period_amount);
      if (totalWeeks <= 0) {
        setError("Weekly payment is too high.");
        return;
      }
      // Calculate payment and end date
      calculatedPaymentAmount = remainingAmount / totalWeeks;
      setCalculatedPayment(calculatedPaymentAmount.toFixed(2));

      const calculatedEndDate = new Date();
      calculatedEndDate.setDate(calculatedEndDate.getDate() + totalWeeks * 7); // Add weeks
      setCalculatedEndDate(calculatedEndDate.toISOString());
    }
  }, [goal, saving_method, period_amount]);

  // Calculate the payment amount based on the end date input
  useEffect(() => {
    if (!goal || !endDateInput || !paymentFrequency) return;

    setError("");

    const remainingAmount = goal.target_amount - goal.current_amount;
    const endDate = new Date(endDateInput);
    const currentDate = new Date();
    let totalMonths, totalWeeks, calculatedPaymentAmount;

    if (paymentFrequency === "monthly") {
      totalMonths = (endDate.getFullYear() - currentDate.getFullYear()) * 12 + (endDate.getMonth() - currentDate.getMonth());
      if (totalMonths <= 0) {
        setError("End date must be in the future.");
        return;
      }
      calculatedPaymentAmount = remainingAmount / totalMonths;
      setCalculatedPayment(calculatedPaymentAmount.toFixed(2));
    } else if (paymentFrequency === "weekly") {
      totalWeeks = Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24 * 7));
      if (totalWeeks <= 0) {
        setError("End date must be in the future.");
        return;
      }
      calculatedPaymentAmount = remainingAmount / totalWeeks;
      setCalculatedPayment(calculatedPaymentAmount.toFixed(2));
    }
  }, [goal, endDateInput, paymentFrequency]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure end_date is in the proper format (ISO 8601 date string without time) before sending
    const end_date_string = calculatedEndDate ? calculatedEndDate.split('T')[0] : endDateInput;  // Use endDateInput if calculatedEndDate is not set

    if (!end_date_string) {
      setError("End date is required.");
      return;
    }

    let savingMethodValue;
    if (saving_method === "end_date") {
      savingMethodValue = paymentFrequency === "monthly" ? true : false;
    } else {
      savingMethodValue = saving_method === "true" ? true : false;
    }

    try {
      const updatedGoal = {
        name: goal.name,
        target_amount: goal.target_amount,
        current_amount: goal.current_amount,
        end_date: end_date_string, // Pass date format for end_date
        saving_method: savingMethodValue,
        period_amount: calculatedPayment, // Update period_amount with calculated payment
      };
      await updateGoalData(`/api/goals/${goalId}`, updatedGoal, token);
      navigate("/"); // Navigate to the home page after updating the goal
    } catch (error) {
      setError("Failed to update goal.");
      console.error("Error updating goal:", error);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }

    try {
      await deleteGoalData(`/api/goals/${goalId}`, token);
      navigate("/goals");
    } catch (error) {
      setError("Failed to delete goal.");
      console.error("Error deleting goal:", error);
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
            Saving Method:
            <select
                value={saving_method}
                onChange={(e) => setSavingMethod(e.target.value)}
            >
              <option value="">Select a method</option>
              <option value="true">Monthly Amount</option>
              <option value="false">Weekly Amount</option>
              <option value="end_date">End Date</option>
            </select>
          </label>
          {saving_method === "end_date" && (
              <>
                <label>
                  End Date:
                  <input
                      type="date"
                      value={endDateInput}  // Use endDateInput for input
                      onChange={(e) => setEndDateInput(e.target.value)}
                  />
                </label>
                <label>
                  Payment Frequency:
                  <select
                      value={paymentFrequency}
                      onChange={(e) => setPaymentFrequency(e.target.value)}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </label>
              </>
          )}
          {(saving_method === "true" || saving_method === "false") && (
              <label>
                {saving_method === "true" ? "Monthly Payment" : "Weekly Payment"}:
                <input
                    type="number"
                    value={period_amount}
                    onChange={(e) => setPeriodAmount(e.target.value)}
                />
              </label>
          )}
          <button type="submit">Update Goal</button>
          <button
              type="button"
              onClick={handleDelete}
              style={{ backgroundColor: confirmDelete ? "red" : "initial" }}
          >
            {confirmDelete ? "Confirm Delete" : "Delete Goal"}
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {(saving_method === "true" || saving_method === "false") && timeNeeded && <p>Time Needed: {timeNeeded}</p>}
        {saving_method === "end_date" && calculatedPayment && (
            <p>Calculated {paymentFrequency === "monthly" ? "Monthly" : "Weekly"} Payment: {calculatedPayment}</p>
        )}
      </div>
  );
};

export default EditGoal;
