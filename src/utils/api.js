import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000";

export const fetchGoals = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/goals/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);

    throw error;
  }
};

export const fetchData = async (setGoals) => {
  try {
    const data = await fetchGoals();
    setGoals(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
