import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { postDataWithToken } from "../utils/api";
import {
  AddGoalContainer,
  CategoryButton,
  NextButton,
} from "../styles/AddGoalStyles";
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

const AddGoal = () => {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [goalName, setGoalName] = useState("");
  const [target_amount, setTargetAmount] = useState("");
  const [current_amount, setCurrentAmount] = useState(0);
  const [saving_method, setSavingMethod] = useState("");
  const [period_amount, setPayment] = useState("");
  const [end_date, setEndDate] = useState("");
  const [methodBool, setMethodBool] = useState(false);
  const [error, setError] = useState("");
  const [timeNeeded, setTimeNeeded] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setError("");
    if (saving_method === "monthly_amount" && period_amount) {
      const monthsNeeded = (target_amount - current_amount) / period_amount;
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
    } else if (saving_method === "weekly_amount" && period_amount) {
      const weeksNeeded = (target_amount - current_amount) / period_amount;
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
    } else if (saving_method === "end_date" && end_date) {
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
  }, [saving_method, period_amount, end_date, target_amount, current_amount]);

  const handleNext = () => {
    if (step === 1 && (category || customCategory)) {
      setStep(step + 1);
    } else if (step === 2 && goalName) {
      setStep(step + 1);
    } else if (step === 3 && target_amount) {
      if (parseFloat(current_amount) >= parseFloat(target_amount)) {
        setError(
          "Current amount cannot be greater than or equal to target amount."
        );
      } else {
        setStep(step + 1);
      }
    } else if (step === 4 && saving_method && (period_amount || end_date)) {
      setStep(step + 1);
    } else {
      setError("Please fill in the required fields.");
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(end_date);
    if (saving_method === "monthly_amount") {
      setMethodBool(true);
    }
    const goalData = {
      category: customCategory || category,
      name: goalName,
      target_amount,
      current_amount: current_amount || 0, // Default to 0 if not provided
      saving_method: methodBool,
      period_amount,
      status: true,

      end_date: new Date(end_date).toISOString().split("T")[0], // Convert end_date to string
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
    <AddGoalContainer>
      {step > 1 && (
        <Button className="BackButton" variant="secondary" onClick={handleBack}>
          &lt;
        </Button>
      )}

      {error && <Alert variant="danger">{error}</Alert>}
      {step === 1 && (
        <Form>
          <h1>Pick a Category: </h1>
          <Form.Group>
            <div className="categoryButtons">
              <div className="categoryDiv">
                <CategoryButton
                  variant="primary"
                  onClick={() => setCategory("vacation")}
                  style={{
                    backgroundImage: `url(${vacationImg})`,
                  }}
                ></CategoryButton>
                Vacation
              </div>

              <div className="categoryDiv">
                <CategoryButton
                  variant="primary"
                  onClick={() => setCategory("festival")}
                  style={{
                    backgroundImage: `url(${festivalImg})`,
                  }}
                ></CategoryButton>
                Festival
              </div>
              <div className="categoryDiv">
                <CategoryButton
                  variant="primary"
                  onClick={() => setCategory("sports")}
                  style={{
                    backgroundImage: `url(${sportsImg})`,
                  }}
                ></CategoryButton>
                Sports
              </div>

              <div className="categoryDiv">
                <CategoryButton
                  variant="primary"
                  onClick={() => setCategory("driving-lessons")}
                  style={{
                    backgroundImage: `url(${drivingLessonsImg})`,
                  }}
                ></CategoryButton>
                Driving Lessons
              </div>

              <div className="categoryDiv">
                <CategoryButton
                  variant="primary"
                  onClick={() => setCategory("studies")}
                  style={{
                    backgroundImage: `url(${studiesImg})`,
                  }}
                ></CategoryButton>
                Studies
              </div>

              <div className="categoryDiv">
                <CategoryButton
                  variant="primary"
                  onClick={() => setCategory("business")}
                  style={{
                    backgroundImage: `url(${businessImg})`,
                  }}
                ></CategoryButton>
                Starting your business
              </div>

              <div className="categoryDiv">
                <CategoryButton
                  variant="primary"
                  onClick={() => setCategory("electronics")}
                  style={{
                    backgroundImage: `url(${electronicsImg})`,
                  }}
                ></CategoryButton>
                Electronics
              </div>

              <div className="categoryDiv">
                <CategoryButton
                  variant="primary"
                  onClick={() => setCategory("gaming")}
                  style={{
                    backgroundImage: `url(${gamingImg})`,
                  }}
                ></CategoryButton>
                Gaming
              </div>

              <div className="categoryDiv">
                <CategoryButton
                  variant="primary"
                  onClick={() => setCategory("car")}
                  style={{
                    backgroundImage: `url(${carImg})`,
                  }}
                ></CategoryButton>
                Car
              </div>

              <div className="categoryDiv">
                <CategoryButton
                  variant="primary"
                  onClick={() => setCategory("emergency-fund")}
                  style={{
                    backgroundImage: `url(${emergencyFundImg})`,
                  }}
                ></CategoryButton>
                Emergency Fund
              </div>

              <div className="categoryDiv">
                <CategoryButton
                  variant="primary"
                  onClick={() => setCategory("charity")}
                  style={{
                    backgroundImage: `url(${charityImg})`,
                  }}
                ></CategoryButton>
                Charity
              </div>

              <div className="categoryDiv">
                <CategoryButton
                  variant="primary"
                  onClick={() => setCategory("house")}
                  style={{
                    backgroundImage: `url(${houseImg})`,
                  }}
                ></CategoryButton>
                House Deposit
              </div>

              <div className="categoryDiv">
                <CategoryButton
                  variant="primary"
                  onClick={() => setCategory("wedding")}
                  style={{
                    backgroundImage: `url(${weddingImg})`,
                  }}
                ></CategoryButton>
                Wedding
              </div>

              <div className="categoryDiv">
                <CategoryButton
                  variant="primary"
                  onClick={() => setCategory("custom")}
                  style={{
                    backgroundImage: `url(${customImg})`,
                  }}
                ></CategoryButton>
                Custom Category
              </div>
            </div>
          </Form.Group>

          <NextButton
            className="NextButton"
            variant="secondary"
            onClick={handleNext}
            visible={!!(category || customCategory)}
          >
            Next
          </NextButton>
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
          <br />
          <Button className="NextButton" variant="primary" onClick={handleNext}>
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
            <Form.Label>Saved so Far:</Form.Label>
            <Form.Control
              type="number"
              value={current_amount}
              onChange={(e) => setCurrentAmount(e.target.value)}
            />
          </Form.Group>
          <Button className="NextButton" variant="primary" onClick={handleNext}>
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
              value={saving_method}
              onChange={(e) => setSavingMethod(e.target.value)}
              required
            >
              <option value="">Select a method</option>
              <option value="end_date">End Date</option>
              <option value="monthly_amount">Monthly Amount</option>
              <option value="weekly_amount">Weekly Amount</option>
            </Form.Control>
          </Form.Group>
          {saving_method === "end_date" && (
            <Form.Group>
              <Form.Label>End Date:</Form.Label>
              <Form.Control
                type="date"
                value={end_date}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </Form.Group>
          )}
          {(saving_method === "monthly_amount" ||
            saving_method === "weekly_amount") && (
            <Form.Group>
              <Form.Label>
                {saving_method === "monthly_amount"
                  ? "Monthly Payment"
                  : "Weekly Payment"}
                :
              </Form.Label>
              <Form.Control
                type="number"
                value={period_amount}
                onChange={(e) => setPayment(e.target.value)}
                required
              />
            </Form.Group>
          )}
          <Button className="NextButton" variant="primary" onClick={handleNext}>
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
          <p>Saving Method: {getSavingMethodLabel(saving_method)}</p>
          <p>End Date: {new Date(end_date).toLocaleDateString()}</p>
          {timeNeeded && <p>Time Needed: {timeNeeded}</p>}
          {(saving_method === "monthly_amount" ||
            saving_method === "weekly_amount") && (
            <p>
              {saving_method === "monthly_amount"
                ? "Monthly Payment"
                : "Weekly Payment"}
              : {period_amount}
            </p>
          )}
          {saving_method === "end_date" && (
            <p>Calculated Monthly Payment: {period_amount}</p>
          )}

          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      )}
    </AddGoalContainer>
  );
};

export default AddGoal;
