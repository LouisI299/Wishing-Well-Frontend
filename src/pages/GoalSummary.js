// Summary page for the goal
import { data, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import {
  fetchDataById,
  makeTransaction,
  postDataWithToken,
} from "../utils/api";
import { ImgContainer, SummaryContainer } from "../styles/GoalSummaryStyles";
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
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Alert } from "react-bootstrap";
import { parse } from "@fortawesome/fontawesome-svg-core";

const GoalSummary = () => {
  const params = useParams();
  const { goalId } = params;
  const [goal, setGoal] = useState(null);
  const { token } = useAuth();
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("deposit");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
        setGoal(goalData);
        console.log(goal.status);
      } catch (error) {
        console.error("Error fetching goal data:", error);
      }
    };

    fetchGoal();
  }, [goalId, token]);

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

  return (
    <SummaryContainer>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <ImgContainer>
        <img src={getImageByCategory(goal.category)} alt={goal.category} />
      </ImgContainer>
      <div className="summaryTitle">
        <h1>{goal.name}</h1>
        <Link to={`/edit-goal/${goal.id}`}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </Link>
      </div>

      {goal.status === false && <p>Goal is completed!</p>}
      <p>Target Amount: {goal.target_amount}</p>
      <p>Current Amount: {goal.current_amount}</p>
      <p>Start Date: {goal.start_date}</p>
      <p>End Date: {goal.end_date}</p>
      {goal.status === true && (
        <form onSubmit={handleTransaction(amount, goalId, token)}>
          <label>
            Add Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </label>
          <button type="submit">Add Amount</button>
        </form>
      )}
    </SummaryContainer>
  );
};

export default GoalSummary;
