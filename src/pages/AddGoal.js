import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";
import Header from "../components/Header";

// Page where the user can add a new goal
const AddGoal = () => {
  const [step, setStep] = useState(1);
  const [goalName, setGoalName] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [amountSaved, setAmountSaved] = useState("");
  const [savingMethod, setSavingMethod] = useState("");
  const [savingValue, setSavingValue] = useState("");

  const handleNext = () => {
    if (step === 1 && goalName) {
      setStep(step + 1);
    } else if (step === 2 && totalAmount) {
      setStep(step + 1);
    } else if (step === 3 && savingMethod && savingValue) {
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
    const goalData = {
      name: goalName,
      totalAmount,
      amountSaved: amountSaved || 0, // Default to 0 if not provided
      savingMethod,
      savingValue,
    };
    console.log(goalData);
    // Add your API call here to save the goal
  };

  return (
    <div>
      <Header />
      <h1>Add Goal</h1>
      <Link to="/">Home</Link>
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
            Total Amount:
            <input
              type="number"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              required
            />
          </label>
          <label>
            Amount Saved (optional):
            <input
              type="number"
              value={amountSaved}
              onChange={(e) => setAmountSaved(e.target.value)}
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
                value={savingValue}
                onChange={(e) => setSavingValue(e.target.value)}
                required
              />
            </label>
          )}
          {savingMethod === "monthly_amount" && (
            <label>
              Monthly Amount:
              <input
                type="number"
                value={savingValue}
                onChange={(e) => setSavingValue(e.target.value)}
                required
              />
            </label>
          )}
          {savingMethod === "weekly_amount" && (
            <label>
              Weekly Amount:
              <input
                type="number"
                value={savingValue}
                onChange={(e) => setSavingValue(e.target.value)}
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
          <p>Name: {goalName}</p>
          <p>Total Amount: {totalAmount}</p>
          <p>Amount Saved: {amountSaved || 0}</p>
          <p>Saving Method: {savingMethod}</p>
          <p>
            {savingMethod === "end_date" && `End Date: ${savingValue}`}
            {savingMethod === "monthly_amount" && `Monthly Amount: ${savingValue}`}
            {savingMethod === "weekly_amount" && `Weekly Amount: ${savingValue}`}
          </p>
          <button onClick={handleBack}>Back</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AddGoal;
