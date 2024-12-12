import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import "../styles/addgoal.css";
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
  const navigate = useNavigate();

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
        setEndDate(calculatedEndDate.toISOString());
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
        setEndDate(calculatedEndDate.toISOString());
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
      if (parseFloat(current_amount) >= parseFloat(target_amount)) {
        setError("Current amount cannot be greater than or equal to target amount.");
      } else {
        setStep(step + 1);
      }
    } else if (step === 4 && savingMethod && (payment || end_date)) {
      setStep(step + 1);
    } else {
      alert("Please fill in the required fields.");
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const goalData = {
      category: customCategory || category,
      name: goalName,
      target_amount,
      current_amount: current_amount || 0, // Default to 0 if not provided
      savingMethod,
      payment,
      end_date: new Date(end_date), // Convert end_date to Date object
    };
    console.log(goalData);
    try {
      await postDataWithToken("/api/goals/", goalData, token);
      navigate("/"); // Redirect to home page after successful submission
    } catch (error) {
      console.error("Error posting data:", error);
      setError("Failed to submit goal. Please try again.");
    }
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
    <Container>
      <h1>Add Goal</h1>
      <Link to="/">Home</Link>
      {error && <Alert variant="danger">{error}</Alert>}
      {step === 1 && (
        <Form>
          <Form.Group>
            <Form.Label>Category:</Form.Label>
            <div className="categoryButtons">
              <Button variant="primary" onClick={() => setCategory("driving_lessons")}>
                Driving Lessons
              </Button>
              <Button variant="primary" onClick={() => setCategory("vacation")}>
                Vacation
              </Button>
              <Button variant="primary" onClick={() => setCategory("laptop")}>
                Laptop
              </Button>
              <Button variant="primary" onClick={() => setCategory("emergency_fund")}>
                Emergency Fund
              </Button>
              <Button variant="primary" onClick={() => setCategory("wedding")}>
                Wedding
              </Button>
              <Button variant="primary" onClick={() => setCategory("")}>
                Custom Category
              </Button>
            </div>
            {category === "" && (
              <Form.Group>
                <Form.Label>Custom Category:</Form.Label>
                <Form.Control
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  required
                />
              </Form.Group>
            )}
          </Form.Group>
          <Button variant="secondary" onClick={handleNext}>
            Next
          </Button>
        </Form>
      )}
      {step === 2 && (
        <Form>
          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="secondary" onClick={handleBack}>
            Back
          </Button>
          <Button variant="primary" onClick={handleNext}>
            Next
          </Button>
        </Form>
      )}
      {step === 3 && (
        <Form>
          <Form.Group>
            <Form.Label>Target Amount:</Form.Label>
            <Form.Control
              type="number"
              value={target_amount}
              onChange={(e) => setTargetAmount(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Current Amount (optional):</Form.Label>
            <Form.Control
              type="number"
              value={current_amount}
              onChange={(e) => setCurrentAmount(e.target.value)}
            />
          </Form.Group>
          <Button variant="secondary" onClick={handleBack}>
            Back
          </Button>
          <Button variant="primary" onClick={handleNext}>
            Next
          </Button>
        </Form>
      )}
      {step === 4 && (
        <Form>
          <Form.Group>
            <Form.Label>Saving Method:</Form.Label>
            <Form.Control
              as="select"
              value={savingMethod}
              onChange={(e) => setSavingMethod(e.target.value)}
              required
            >
              <option value="">Select a method</option>
              <option value="end_date">End Date</option>
              <option value="monthly_amount">Monthly Amount</option>
              <option value="weekly_amount">Weekly Amount</option>
            </Form.Control>
          </Form.Group>
          {savingMethod === "end_date" && (
            <Form.Group>
              <Form.Label>End Date:</Form.Label>
              <Form.Control
                type="date"
                value={end_date}
                onChange={(e) => setEndDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </Form.Group>
          )}
          {(savingMethod === "monthly_amount" ||
            savingMethod === "weekly_amount") && (
            <Form.Group>
              <Form.Label>
                {savingMethod === "monthly_amount"
                  ? "Monthly Payment"
                  : "Weekly Payment"}
                :
              </Form.Label>
              <Form.Control
                type="number"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                required
              />
            </Form.Group>
          )}
          <Button variant="secondary" onClick={handleBack}>
            Back
          </Button>
          <Button variant="primary" onClick={handleNext}>
            Next
          </Button>
        </Form>
      )}
      {step === 5 && (
        <div>
          <h2>Summary</h2>
          <p>Category: {customCategory || category}</p>
          <p>Name: {goalName}</p>
          <p>Total Amount: {target_amount}</p>
          <p>Saved so Far: {current_amount || 0}</p>
          <p>Saving Method: {getSavingMethodLabel(savingMethod)}</p>
          <p>End Date:  {new Date(end_date).toLocaleDateString()}</p>
          {timeNeeded && <p>Time Needed: {timeNeeded}</p>}
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
          <Button variant="secondary" onClick={handleBack}>
            Back
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      )}
    </Container>
  );
};

export default AddGoal;