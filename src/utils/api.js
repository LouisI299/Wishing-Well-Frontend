//Data fetches from the backend server are handled here

// Imports
import axios from "axios";

// API base URL for fetching data
const API_BASE_URL = "http://127.0.0.1:5000";

//Function to fetch data from the backend server
export const fetchData = async (endpoint, callback, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`,
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    );
    callback(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);

    throw error;
  }
};

//Function to post data to the backend server
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

//Function to get current user data
export const fetchCurrentUser = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/current`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "Error response from backend:",
        error.response.status,
        error.response.data
      );
    }
  }
};

//Put request to update goal

export const updateDataById = async (url, id, data, token) => {
  const response = await fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update data");
  }
  return response.json();
};

// Add the updateGoalData function
export const updateGoalData = async (url, data, token) => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update goal');
    }

    const updatedGoal = await response.json();
    return updatedGoal;  // Return the updated goal object
  } catch (error) {
    console.error("Error updating goal:", error);
    throw error;
  }
};
