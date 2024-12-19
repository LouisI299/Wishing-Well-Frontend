import { faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import businessImg from "../images/categoryImages/business.jpg";
import carImg from "../images/categoryImages/car.jpg";
import charityImg from "../images/categoryImages/charity.jpg";
import customImg from "../images/categoryImages/custom.jpg";
import drivingLessonsImg from "../images/categoryImages/driving-lessons.jpg";
import electronicsImg from "../images/categoryImages/electronics.jpg";
import emergencyFundImg from "../images/categoryImages/emergency-fund.jpg";
import festivalImg from "../images/categoryImages/festival.jpg";
import gamingImg from "../images/categoryImages/gaming.jpg";
import houseImg from "../images/categoryImages/house.jpg";
import sportsImg from "../images/categoryImages/sports.jpg";
import studiesImg from "../images/categoryImages/studies.jpg";
import vacationImg from "../images/categoryImages/vacation.jpg";
import weddingImg from "../images/categoryImages/wedding.jpg";
import {
  AddGoalContainer,
  CategoryButton,
  NextButton,
  SummaryCard,
} from "../styles/AddGoalStyles";
import { postDataWithToken } from "../utils/api";

const AddGoal = () => {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [goalName, setGoalName] = useState("");
  const [target_amount, setTargetAmount] = useState("");
  const [current_amount, setCurrentAmount] = useState(0);
  const [saving_method, setSavingMethod] = useState("");
  const [saving_frequency, setSavingFrequency] = useState("");
  const [period_amount, setPayment] = useState("");
  const [end_date, setEndDate] = useState("");
  const [methodBool, setMethodBool] = useState(false);
  const [error, setError] = useState("");
  const [timeNeeded, setTimeNeeded] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setError("");
  
    if (saving_method === "monthly_amount" && period_amount > 0) {
      const monthsNeeded = (target_amount - current_amount) / period_amount;
      if (monthsNeeded > 0) {
        setTimeNeeded(`${Math.ceil(monthsNeeded)} months`);
        const calculatedEndDate = new Date();
        calculatedEndDate.setMonth(
          calculatedEndDate.getMonth() + Math.ceil(monthsNeeded)
        );
        setEndDate(calculatedEndDate.toISOString());
        setMethodBool(true);
      } else {
        setError("Monthly payment is too high or invalid.");
      }
    } else if (saving_method === "weekly_amount" && period_amount > 0) {
      const weeksNeeded = (target_amount - current_amount) / period_amount;
      if (weeksNeeded > 0) {
        setTimeNeeded(`${Math.ceil(weeksNeeded)} weeks`);
        const calculatedEndDate = new Date();
        calculatedEndDate.setDate(
          calculatedEndDate.getDate() + Math.ceil(weeksNeeded * 7)
        );
        setEndDate(calculatedEndDate.toISOString());
        setMethodBool(false);
      } else {
        setError("Weekly payment is too high or invalid.");
      }
    } else if (saving_method === "end_date" && end_date) {
      const endDateObj = new Date(end_date);
      const today = new Date();
      if (endDateObj > today) {
        const totalAmountNeeded = target_amount - current_amount;
  
        if (saving_frequency === "monthly_amount") {
          const monthsNeeded =
            (endDateObj.getFullYear() - today.getFullYear()) * 12 +
            (endDateObj.getMonth() - today.getMonth());
          if (monthsNeeded > 0) {
            setTimeNeeded(`${monthsNeeded} months`);
            const calculatedMonthlyPayment = totalAmountNeeded / monthsNeeded;
            setPayment(calculatedMonthlyPayment.toFixed(2));
            setMethodBool(true);
          } else {
            setError("End date must allow for at least one month to save.");
          }
        } else if (saving_frequency === "weekly_amount") {
          const weeksNeeded = Math.ceil(
            (endDateObj - today) / (1000 * 60 * 60 * 24 * 7)
          );
          if (weeksNeeded > 0) {
            setTimeNeeded(`${weeksNeeded} weeks`);
            const calculatedWeeklyPayment = totalAmountNeeded / weeksNeeded;
            setPayment(calculatedWeeklyPayment.toFixed(2));
            setMethodBool(false);
          } else {
            setError("End date must allow for at least one week to save.");
          }
        }
      } else {
        setError("End date must be in the future.");
      }
    }
  }, [
    saving_method,
    period_amount,
    end_date,
    target_amount,
    current_amount,
    saving_frequency,
  ]);

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
    } else if (step === 4 && saving_method) {
      if (saving_method === "end_date") {
        const endDateObj = new Date(end_date);
        const today = new Date();
  
        // Controleer of de einddatum een geldige datum is
        if (isNaN(endDateObj.getTime())) {
          setError("Please enter a valid date.");
          return;
        }
  
        // Controleer of de einddatum minimaal één maand in de toekomst ligt
        const oneMonthFromNow = new Date(today);
        oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
  
        if (endDateObj <= oneMonthFromNow) {
          setError("End date must allow at least one month to save.");
          return;
        }
  
        // Controleer of een saving_frequency is geselecteerd
        if (!saving_frequency) {
          setError("Please select a saving frequency.");
          return;
        }
      } else if (
        (saving_method === "monthly_amount" || saving_method === "weekly_amount") &&
        !period_amount
      ) {
        setError("Please enter a valid payment amount.");
        return;
      }
  
      // Als alles geldig is, ga naar de volgende stap
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

  const getSavingMethodLabel = (method, saving_frequency) => {
    if (method === "monthly_amount") {
      return "Monthly";
    } else if (method === "weekly_amount") {
      return "Weekly";
    } else if (method === "end_date") {
      if (saving_frequency === "monthly_amount") {
        return "Monthly";
      } else if (saving_frequency === "weekly_amount") {
        return "Weekly";
      }
    }
    return "Save Amount";
  };

  function formatCurrency(amount) {
    const formattedAmount = parseFloat(amount).toFixed(2).replace(".", ",");
    return formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

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
              {[
                { name: "Vacation", value: "vacation", img: vacationImg },
                { name: "Festival", value: "festival", img: festivalImg },
                { name: "Sports", value: "sports", img: sportsImg },
                {
                  name: "Driving Lessons",
                  value: "driving_lessons",
                  img: drivingLessonsImg,
                },
                { name: "Studies", value: "studies", img: studiesImg },
                {
                  name: "Starting your business",
                  value: "business",
                  img: businessImg,
                },
                {
                  name: "Electronics",
                  value: "electronics",
                  img: electronicsImg,
                },
                { name: "Gaming", value: "gaming", img: gamingImg },
                { name: "Car", value: "car", img: carImg },
                {
                  name: "Emergency Fund",
                  value: "emergency_fund",
                  img: emergencyFundImg,
                },
                { name: "Charity", value: "charity", img: charityImg },
                { name: "House Deposit", value: "house", img: houseImg },
                { name: "Wedding", value: "wedding", img: weddingImg },
                { name: "Custom Category", value: "Custom", img: customImg },
              ].map(({ name, value, img }) => (
                <div className="categoryDiv" key={value}>
                  <CategoryButton
                    variant="primary"
                    onClick={() => setCategory(value)}
                    style={{ backgroundImage: `url(${img})` }}
                  ></CategoryButton>
                  {name}
                </div>
              ))}
            </div>
          </Form.Group>

          <NextButton
            className="NextButton"
            variant="secondary"
            onClick={handleNext}
            visible={!!category}
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
            <>
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
              <Form.Group>
                <Form.Label>Saving Frequency:</Form.Label>
                <Form.Control
                  as="select"
                  value={saving_frequency}
                  onChange={(e) => setSavingFrequency(e.target.value)}
                  required
                >
                  <option value="">Select Frequency</option>
                  <option value="monthly_amount">Monthly</option>
                  <option value="weekly_amount">Weekly</option>
                </Form.Control>
              </Form.Group>
            </>
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
        <SummaryCard>
          <h2>Summary</h2>
          <p id="GoalName">{goalName}</p>
          <div className="categoryImage">
            <img
              src={
                {
                  vacation: vacationImg,
                  festival: festivalImg,
                  sports: sportsImg,
                  driving_lessons: drivingLessonsImg,
                  studies: studiesImg,
                  business: businessImg,
                  electronics: electronicsImg,
                  gaming: gamingImg,
                  car: carImg,
                  emergency_fund: emergencyFundImg,
                  charity: charityImg,
                  house: houseImg,
                  wedding: weddingImg,
                  custom: customImg,
                }[category] || customImg
              }
              alt={customCategory || category}
            />
          </div>
          <p id="TotalAmount">€{formatCurrency(target_amount)}</p>
          <p id="CurrentSaved">
            Saved so Far: €{formatCurrency(current_amount) || 0}
          </p>
          <p id="SavingMethod">
            {getSavingMethodLabel(saving_method, saving_frequency)} : €
            {formatCurrency(period_amount)}
          </p>
          <p id="EndDate">
            <FontAwesomeIcon icon={faCalendarAlt} className="SummaryIcon" />
            {new Date(end_date).toLocaleDateString()}
          </p>
          {timeNeeded && (
            <p id="TimeNeeded">
              <FontAwesomeIcon icon={faClock} />
              {timeNeeded}
            </p>
          )}
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </SummaryCard>
      )}
    </AddGoalContainer>
  );
};

export default AddGoal;
