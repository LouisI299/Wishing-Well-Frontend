import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const AddGoal = () => {
  const [step, setStep] = useState(1);
  const [goalName, setGoalName] = useState("");
  const [target_amount, setTargetAmount] = useState("");
  const [current_amount, setCurrentAmount] = useState(0);
  const [savingMethod, setSavingMethod] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [weeklyPayment, setWeeklyPayment] = useState("");
  const [end_date, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [timeNeeded, setTimeNeeded] = useState("");

  useEffect(() => {
    setError("");
    if (savingMethod === "monthly_amount" && monthlyPayment) {
      const monthsNeeded = (target_amount - current_amount) / monthlyPayment;
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
    } else if (savingMethod === "weekly_amount" && weeklyPayment) {
      const weeksNeeded = (target_amount - current_amount) / weeklyPayment;
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
          setMonthlyPayment(calculatedMonthlyPayment.toFixed(2));
        } else {
          setError("End date must allow for at least one month to save.");
        }
      } else {
        setError("End date must be in the future.");
      }
    }
  }, [
    savingMethod,
    monthlyPayment,
    weeklyPayment,
    end_date,
    target_amount,
    current_amount,
  ]);

  const handleNext = () => {
    if (step === 1 && goalName) {
      setStep(step + 1);
    } else if (
      step === 2 &&
      target_amount > 0 &&
      target_amount > current_amount
    ) {
      setStep(step + 1);
    } else if (
      step === 3 &&
      savingMethod &&
      (monthlyPayment || weeklyPayment || end_date)
    ) {
      setStep(step + 1);
    } else {
      setError("Please fill in the required fields correctly.");
    }
  };

  const handleBack = () => {
    setError("");
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const goalData = {
      name: goalName,
      target_amount,
      current_amount: current_amount || 0,
      savingMethod,
      monthlyPayment,
      weeklyPayment,
      end_date,
    };
    console.log(goalData);
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
      {error && <p style={{ color: "red" }}>{error}</p>}
      {step === 1 && (
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
          <button onClick={handleNext}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <label>
            Target Amount:
            <input
              type="number"
              value={target_amount}
              onChange={(e) => setTargetAmount(parseFloat(e.target.value))}
              required
            />
          </label>
          <label>
            Current Amount (optional):
            <input
              type="number"
              value={current_amount}
              onChange={(e) => setCurrentAmount(parseFloat(e.target.value))}
            />
          </label>
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
      {step === 3 && (
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
          {savingMethod === "monthly_amount" && (
            <label>
              Monthly Payment:
              <input
                type="number"
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(parseFloat(e.target.value))}
                required
              />
            </label>
          )}
          {savingMethod === "weekly_amount" && (
            <label>
              Weekly Payment:
              <input
                type="number"
                value={weeklyPayment}
                onChange={(e) => setWeeklyPayment(parseFloat(e.target.value))}
                required
              />
            </label>
          )}
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
      {step === 4 && (
        <div>
          <h2>Summary</h2>
          <p>Name: {goalName}</p>S<p>Target Amount: {target_amount}</p>
          <p>Current Amount: {current_amount || 0}</p>
          <p>Saving Method: {getSavingMethodLabel(savingMethod)}</p>
          <p>End Date: {end_date}</p>
          {timeNeeded && <p>Time Needed: {timeNeeded}</p>}
          {savingMethod === "monthly_amount" && (
            <p>Monthly Payment: {monthlyPayment}</p>
          )}
          {savingMethod === "weekly_amount" && (
            <p>Weekly Payment: {weeklyPayment}</p>
          )}
          {savingMethod === "end_date" && (
            <p>Calculated Monthly Payment: {monthlyPayment}</p>
          )}
          <button onClick={handleBack}>Back</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default AddGoal;
