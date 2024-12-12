//Data fetches from the backend server are handled here

// Imports
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

// API base URL for fetching data
const API_BASE_URL = "http://127.0.0.1:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;
    if (response.status === 401) {
      try {
        const { refreshToken } = useAuth();
        const newToken = await refreshToken();
        if (newToken) {
          error.config.headers["Authorization"] = `Bearer ${newToken}`;
          return axios.request(error.config);
        }
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        useNavigate()("/login");
      }
    }
    return Promise.reject(error);
  }
);

// Function to change password
export const changePassword = async (oldPassword, newPassword, token) => {
  try {
    const data = { action: 'change_password', old_password: oldPassword, new_password: newPassword };
    const response = await postDataWithToken(`${API_BASE_URL}/EditAccount`, '', data, token);
    return response;  // Return response from backend to be used in settings.js
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};

// Function to update email
export const updateEmail = async (email, token) => {
  try {
    const data = { action: 'update_email', email };
    const response = await postDataWithToken(`${API_BASE_URL}/EditAccount`, '', data, token);
    return response;  // Return response from backend to be used in settings.js
  } catch (error) {
    console.error("Error updating email:", error);
    throw error;
  }
};

export default api;
