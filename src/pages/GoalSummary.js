// Summary page for the goal
import { data, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import {
  deleteGoalData,
  fetchDataById,
  makeTransaction,
  postDataWithToken,
  updateGoalData,
} from "../utils/api";
import {
  ImgContainer,
  SummaryContainer,
  DepositBtn,
  EditContainer,
} from "../styles/GoalSummaryStyles";
import electronicsImg from "../images/categoryImages/electronics.jpg";
import businessImg from "../images/categoryImages/business.jpg";
import charityImg from "../images/categoryImages/charity.jpg";
import drivingLessonsImg from "../images/categoryImages/driving-lessons.jpg";
import carImg from "../images/categoryImages/car.jpg";
import emergencyFundImg from "../images/categoryImages/emergency-fund.jpg";
import festivalImg from "../images/categoryImages/festival.jpg";
import gamingImg from "../images/categoryImages/gaming.jpg";
import houseImg from "../images/categoryImages/house.jpg";
import sportsImg from "../images/categoryImages/sports.jpg";
import studiesImg from "../images/categoryImages/studies.jpg";
import weddingImg from "../images/categoryImages/wedding.jpg";
import customImg from "../images/categoryImages/custom.jpg";
import vacationImg from "../images/categoryImages/vacation.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import { Alert } from "react-bootstrap";
import { parse } from "@fortawesome/fontawesome-svg-core";
import EditGoal from "./EditGoal";

const GoalSummary = () => {
  const params = useParams();
  const { goalId } = params;
  const [goal, setGoal] = useState(null);
  const { token } = useAuth();
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("deposit");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [saving_method, setSavingMethod] = useState("");
  const [period_amount, setPeriodAmount] = useState("");
  const [timeNeeded, setTimeNeeded] = useState("");
  const [calculatedPayment, setCalculatedPayment] = useState("");
  const [calculatedEndDate, setCalculatedEndDate] = useState(""); // Added state for calculated end date
  const [paymentFrequency, setPaymentFrequency] = useState("monthly");
  const [endDateInput, setEndDateInput] = useState(""); // New state for end date input
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }

    try {
      await deleteGoalData(`/api/goals/${goalId}`, token);
      navigate("/");
    } catch (error) {
      setError("Failed to delete goal.");
      console.error("Error deleting goal:", error);
    }
  };

  const getImageByCategory = (category) => {
    switch (category) {
      case "electronics":
        return electronicsImg;
      case "business":
        return businessImg;
      case "charity":
        return charityImg;
      case "driving-lessons":
        return drivingLessonsImg;
      case "car":
        return carImg;
      case "emergency-fund":
        return emergencyFundImg;
      case "festival":
        return festivalImg;
      case "gaming":
        return gamingImg;
      case "house":
        return houseImg;
      case "sports":
        return sportsImg;
      case "studies":
        return studiesImg;
      case "wedding":
        return weddingImg;
      case "vacation":
        return vacationImg;
      case "custom":
        return customImg;
      default:
        return customImg;
    }
  };

  useEffect(() => {
    if (!goalId) {
      return;
    }

    const fetchGoal = async () => {
      try {
        const goalData = await fetchDataById("/api/goals", goalId, token);
        goalData.end_date = new Date(goalData.end_date).toISOString(); // Ensure end_date is in datetime format
        setGoal(goalData);
        setSavingMethod(
          goalData.saving_method === true
            ? "true"
            : goalData.saving_method === false
            ? "false"
            : "end_date"
        );
        setPeriodAmount(goalData.period_amount);
        setAmount(goalData.period_amount);
      } catch (error) {
        console.error("Error fetching goal:", error);
      }
    };

    fetchGoal();

    // setDueDate(new Date(goal.next_due_date));
  }, [goalId, token]);

  useEffect(() => {
    if (!goal || saving_method === "" || period_amount === "") return;

    setError("");
    if (saving_method === "true") {
      const monthsNeeded =
        (goal.target_amount - goal.current_amount) / period_amount;
      if (monthsNeeded > 0) {
        setTimeNeeded(`${Math.ceil(monthsNeeded)} months`);
      } else {
        setError("Monthly payment is too high or invalid.");
      }
    } else if (saving_method === "false") {
      const weeksNeeded =
        (goal.target_amount - goal.current_amount) / period_amount;
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
      totalMonths =
        (endDate.getFullYear() - currentDate.getFullYear()) * 12 +
        (endDate.getMonth() - currentDate.getMonth());
      if (totalMonths <= 0) {
        setError("End date must be in the future.");
        return;
      }
      calculatedPaymentAmount = remainingAmount / totalMonths;
      setCalculatedPayment(calculatedPaymentAmount.toFixed(2));
    } else if (paymentFrequency === "weekly") {
      totalWeeks = Math.ceil(
        (endDate - currentDate) / (1000 * 60 * 60 * 24 * 7)
      );
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
    const end_date_string = calculatedEndDate
      ? calculatedEndDate.split("T")[0]
      : endDateInput; // Use endDateInput if calculatedEndDate is not set

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

  const handleTransaction = (amount, goalId, token) => async (e) => {
    e.preventDefault();
    try {
      const transactionType = parseFloat(amount) > 0 ? "deposit" : "withdrawal";
      setType(transactionType);

      const data = {
        goal_id: goalId,
        amount: parseFloat(amount),
        type: transactionType, // Ensure correct type
      };

      if (
        transactionType === "withdrawal" &&
        parseFloat(amount) > goal.current_amount
      ) {
        setErrorMessage(
          "Amount must be less than or equal to the current amount"
        );
        return;
      }

      if (transactionType === "deposit" && goal.status === false) {
        setErrorMessage("Goal is already completed!");
        return;
      }

      if (
        transactionType === "deposit" &&
        parseFloat(amount) + goal.current_amount > goal.target_amount
      ) {
        setErrorMessage("Amount must be less than the target amount");
        return;
      }

      await postDataWithToken("/api/transactions/", data, token);

      const updatedGoal = await fetchDataById("/api/goals", goalId, token);
      setGoal(updatedGoal);
      setErrorMessage(""); // Clear any existing errors

      if (updatedGoal.current_amount == goal.target_amount) {
        setSuccessMessage("Congratulations, goal is completed!");
      } else {
        setSuccessMessage("Succesfully added amount!");
      }
    } catch (error) {
      console.log(error);
      console.error("error: ", error);
      if (error.response) {
        if (error.response.status === 400) {
          setErrorMessage(error.response.data.error || "Invalid transaction");
        } else {
          setErrorMessage("An unexpected error occurred");
        }
      }
    }
  };

  if (!goal) {
    return <div>Loading...</div>;
  }

  const startDate = new Date(goal.start_date).toLocaleDateString();
  const endDate = new Date(goal.end_date).toLocaleDateString();
  const NextDueDate = new Date(goal.next_due_date).toLocaleDateString();
  return (
    <>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <SummaryContainer>
        <ImgContainer>
          <img src={getImageByCategory(goal.category)} alt={goal.category} />
        </ImgContainer>
        <div className="summaryTitle">
          <h1>{goal.name}</h1>
          <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel edit " : "Edit "}
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </div>

        {isEditing ? (
          <EditContainer>
            <form onSubmit={handleSubmit} id="editGoalForm">
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
                      value={endDateInput} // Use endDateInput for input
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
                  {saving_method === "true"
                    ? "Monthly Payment"
                    : "Weekly Payment"}
                  :
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
            {(saving_method === "true" || saving_method === "false") &&
              timeNeeded && <p>Time Needed: {timeNeeded}</p>}
            {saving_method === "end_date" && calculatedPayment && (
              <p>
                Calculated{" "}
                {paymentFrequency === "monthly" ? "Monthly" : "Weekly"} Payment:{" "}
                {calculatedPayment}
              </p>
            )}
          </EditContainer>
        ) : (
          <>
            {goal.status === false && <p>Goal is completed!</p>}
            <p>Target Amount: {goal.target_amount}</p>
            <p>Current Amount: {goal.current_amount}</p>
            <p>Start Date: {startDate}</p>
            <p>End Date: {endDate}</p>
            <p>Next Due Date: {NextDueDate}</p>
            {goal.status === true && (
              <form onSubmit={handleTransaction(amount, goalId, token)}>
                <label>
                  {goal.saving_method === true ? (
                    <>Add Monthly Amount:</>
                  ) : (
                    <>Add Weekly Amount</>
                  )}
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </label>
                <button type="submit">
                  <DepositBtn icon={faPiggyBank} />
                </button>
              </form>
            )}
          </>
        )}
      </SummaryContainer>
    </>
  );
};

export default GoalSummary;
