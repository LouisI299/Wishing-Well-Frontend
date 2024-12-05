//Data fetches from the backend server are handled here

// Imports
import axios from "axios";

// API base URL for fetching data
const API_BASE_URL = "http://127.0.0.1:5000";

//Function to fetch data from the backend server
export const fetchData = async (endpoint, callback) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`);
    callback(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);

    throw error;
  }
};
