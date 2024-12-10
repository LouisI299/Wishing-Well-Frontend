import React from "react";
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
      <Footer />
    </div>
  );
};

export default AddGoal;
