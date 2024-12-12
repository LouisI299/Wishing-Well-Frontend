//Data fetches from the backend server are handled here

// Imports
import axios from "axios";

// API base URL for fetching data
const API_BASE_URL = "http://127.0.0.1:5000";

//Function to fetch data from the backend server
export const fetchData = async (endpoint, callback, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    callback(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);

    throw error;
  }
};

//Function to post data with token
export const postDataWithToken = async (endpoint, data, token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${endpoint}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error posting data with token:", error);
    throw error;
  }
};

//Function to post data to the backend server without jwt token
export const postData = async (endpoint, data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

//Function to fetch data by ID
export const fetchDataById = async (endpoint, id, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data by ID:", error);
    throw error;
  }
};

//Function to check Login data
export const checkLogin = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/users/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Error checking login data:", error);
    throw error;
  }
};

// Function to update goal data
export const updateGoalData = async (endpoint, data, token) => {
  try {
    const response = await axios.put(`${API_BASE_URL}${endpoint}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating goal:", error);
    throw error;
  }
};
