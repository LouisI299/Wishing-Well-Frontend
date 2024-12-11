import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { postDataWithToken } from "../utils/api";

const AddGoal = () => {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [goalName, setGoalName] = useState("");
  const [target_amount, setTargetAmount] = useState("");
  const [current_amount, setCurrentAmount] = useState(0);
  const [savingMethod, setSavingMethod] = useState("");
  const [payment, setPayment] = useState("");
  const [end_date, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [timeNeeded, setTimeNeeded] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    setError("");
    if (savingMethod === "monthly_amount" && payment) {
      const monthsNeeded = (target_amount - current_amount) / payment;

      if (monthsNeeded > 0) {
        setTimeNeeded(`${Math.ceil(monthsNeeded)} months`);
        const calculatedEndDate = new Date();
        calculatedEndDate.setMonth(
          calculatedEndDate.getMonth() + Math.ceil(monthsNeeded)
        );
        setEndDate(calculatedEndDate.toISOString().split("T")[0]);
      } else {
        setError("Monthly payment is too high or invalid.");
      }
    } else if (savingMethod === "weekly_amount" && payment) {
      const weeksNeeded = (target_amount - current_amount) / payment;
      if (weeksNeeded > 0) {
        setTimeNeeded(`${Math.ceil(weeksNeeded)} weeks`);
        const calculatedEndDate = new Date();
        calculatedEndDate.setDate(
          calculatedEndDate.getDate() + Math.ceil(weeksNeeded * 7)
        );
        setEndDate(calculatedEndDate.toISOString().split("T")[0]);
      } else {
        setError("Weekly payment is too high or invalid.");
      }
    } else if (savingMethod === "end_date" && end_date) {
      const endDateObj = new Date(end_date);
      const today = new Date();
      if (endDateObj > today) {
        const monthsNeeded =
          (endDateObj.getFullYear() - today.getFullYear()) * 12 +
          (endDateObj.getMonth() - today.getMonth());
        if (monthsNeeded > 0) {
          setTimeNeeded(`${monthsNeeded} months`);
          const calculatedMonthlyPayment =
            (target_amount - current_amount) / monthsNeeded;
          setPayment(calculatedMonthlyPayment.toFixed(2));
        } else {
          setError("End date must allow for at least one month to save.");
        }
      } else {
        setError("End date must be in the future.");
      }
    }
  }, [savingMethod, payment, end_date, target_amount, current_amount]);

  const handleNext = () => {
    if (step === 1 && (category || customCategory)) {
      setStep(step + 1);
    } else if (step === 2 && goalName) {
      setStep(step + 1);
    } else if (step === 3 && target_amount) {
      setStep(step + 1);
    } else if (step === 4 && savingMethod && (payment || end_date)) {
      setStep(step + 1);
    } else {
      alert("Please fill in the required fields.");
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const methodBool = false;
    if (savingMethod === "monthly_amount") {
      methodBool = true;
    }
    const goalData = {
      category: customCategory || category,
      name: goalName,
      target_amount,
      current_amount: current_amount || 0, // Default to 0 if not provided
      saving_method: methodBool,
      period_amount: payment,
      end_date,
    };
    console.log(goalData);
    try {
      const response = postDataWithToken("/api/goals/", goalData, token);
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }

    // Add your API call here to save the goal
  };

  const getSavingMethodLabel = (method) => {
    switch (method) {
      case "monthly_amount":
        return "Monthly";
      case "weekly_amount":
        return "Weekly";
      case "end_date":
        return "Monthly";
      default:
        return "End Date";
    }
  };

  return (
    <div>
      <h1>Add Goal</h1>
      <Link to="/">Home</Link>
      {step === 1 && (
        <div>
          <label>Choose a Category:</label>
          <div>
            <button onClick={() => setCategory("driving_lessons")}>
              Driving Lessons
            </button>
            <button onClick={() => setCategory("vacation")}>Vacation</button>
            <button onClick={() => setCategory("emergency_fund")}>
              Emergency Fund
            </button>
            <button onClick={() => setCategory("wedding")}>Wedding</button>
            <button onClick={() => setCategory("")}>Custom Category</button>
          </div>
          {category === "" && (
            <div>
              <label>
                Custom Category:
                <input
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  required
                />
              </label>
            </div>
          )}
          <button onClick={handleNext}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <label>
            Name:
            <input
              type="text"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              required
            />
          </label>
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
      {step === 3 && (
        <div>
          <label>
            Target Amount:
            <input
              type="number"
              value={target_amount}
              onChange={(e) => setTargetAmount(e.target.value)}
              required
            />
          </label>
          <label>
            Current Amount (optional):
            <input
              type="number"
              value={current_amount}
              onChange={(e) => setCurrentAmount(e.target.value)}
            />
          </label>
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
      {step === 4 && (
        <div>
          <label>
            Saving Method:
            <select
              value={savingMethod}
              onChange={(e) => setSavingMethod(e.target.value)}
              required
            >
              <option value="">Select a method</option>
              <option value="end_date">End Date</option>
              <option value="monthly_amount">Monthly Amount</option>
              <option value="weekly_amount">Weekly Amount</option>
            </select>
          </label>
          {savingMethod === "end_date" && (
            <label>
              End Date:
              <input
                type="date"
                value={end_date}
                onChange={(e) => setEndDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </label>
          )}
          {(savingMethod === "monthly_amount" ||
            savingMethod === "weekly_amount") && (
            <label>
              {savingMethod === "monthly_amount"
                ? "Monthly Payment"
                : "Weekly Payment"}
              :
              <input
                type="number"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                required
              />
            </label>
          )}
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
      {step === 5 && (
        <div>
          <h2>Summary</h2>
          <p>Category: {customCategory || category}</p>
          <p>Name: {goalName}</p>
          <p>Total Amount: {target_amount}</p>
          <p>Saved so Far: {current_amount || 0}</p>
          <p>Saving Method: {getSavingMethodLabel(savingMethod)}</p>
          <p>End Date: {end_date}</p>
          {(savingMethod === "monthly_amount" ||
            savingMethod === "weekly_amount") && (
            <p>
              {savingMethod === "monthly_amount"
                ? "Monthly Payment"
                : "Weekly Payment"}
              : {payment}
            </p>
          )}
          {savingMethod === "end_date" && (
            <p>Calculated Monthly Payment: {payment}</p>
          )}
          <button onClick={handleBack}>Back</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default AddGoal;
