//Data fetches from the backend server are handled here

// Imports
import axios from "axios";
import { useNavigate } from "react-router-dom";

// API base URL for fetching data
const API_BASE_URL = "http://127.0.0.1:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Function to set up interceptors
export const setupInterceptors = (navigate) => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        navigate("/login");
        return Promise.resolve();
      }
      return Promise.reject(error);
    }
  );
};

//Function to fetch data from the backend server
export const fetchData = async (endpoint, callback, token) => {
  try {
    const response = await api.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    callback(response.data);
  } catch (error) {
    if (error.response) {
      console.error("Error fetching data:", error.response.data);
    } else {
      console.error("Error fetching data:", error.message);
    }
    throw error;
  }
};

//Function to post data with token
export const postDataWithToken = async (endpoint, data, token) => {
  try {
    const response = await api.post(endpoint, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error posting data with token:", error.response.data);
    } else {
      console.error("Error posting data with token:", error.message);
    }
    throw error;
  }
};

//Function to post data to the backend server without jwt token
export const postData = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

//Function to fetch data by ID
export const fetchDataById = async (endpoint, id, token) => {
  try {
    const response = await api.get(`${endpoint}/${id}`, {
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
    const response = await api.post(`/api/users/login`, {
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
    const response = await api.put(endpoint, data, {
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

// Function to send PUT request with token
export const putDataWithToken = async (endpoint, data, token) => {
  try {
    const response = await axios.put(`${API_BASE_URL}${endpoint}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error sending PUT request with token:", error);
    throw error;
  }
};

// Function to change password
export const changePassword = async (oldPassword, newPassword, token) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/settings/`,
      {
        action: "change_password", // Include the action in the request body
        old_password: oldPassword, // Pass the old password
        new_password: newPassword, // Pass the new password
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the JWT token for authentication
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Return the response data (msg or error)
  } catch (error) {
    throw error; // Propagate the error for handling in the component
  }
};

// Function to update email
export const updateEmail = async (token, email) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/settings/`,
      {
        action: "update_email", // Action specifies the operation
        email, // Email to update
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || "Failed to update email.");
    }
    throw new Error("An error occurred while updating email.");
  }
};

// Function to delete goal data
export const deleteGoalData = async (endpoint, token) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting goal:", error);
    throw error;
  }
};
export default api;
