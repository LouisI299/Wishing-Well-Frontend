import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthProvider";
import { changePassword, putDataWithToken, fetchData } from "../utils/api"; 


const Settings = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [notificationPreferences, setNotificationPreferences] = useState({
    emailNotifications: false,
    pushNotifications: false,
  });
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const { token } = useAuth(); // JWT token
  const [email, setEmail] = useState("");
  // State for notification settings
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);

  // Handle email update form submission
  const handleEmailChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/api/settings/`, // Match the route URL
        {
          action: "update_email", // Specify the action
          email, // New email payload
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token for authentication
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(response.data.msg || "Email updated successfully!");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || "Failed to update email.");
      } else {
        setMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Handle password change form submission
  const handlePasswordChange = async (e) => {
    e.preventDefault(); // Prevent page reload
  
    try {
      // Include the action field with the required values
      const response = await axios.put(
        "/api/settings/", 
        {
          action: "change_password", // Action to perform
          old_password: oldPassword,
          new_password: newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }
      );
  
      // Display the response message
      setMessage(response.data.msg || "Password changed successfully!");
    } catch (error) {
      // Handle any errors from the server
      setMessage(error.response?.data?.error || "An error occurred while changing password");
    }
  };

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const response = await axios.get(`/api/users/current`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data); 
        } catch (error) {
          if (error.response) {
            console.error("Response error:", error.response.data);
          } else if (error.request) {
            console.error("No response received:", error.request);
          } else {
            console.error("Error setting up request:", error.message);
          }
          setMessage("Failed to fetch user data. Please try again.");
        }
      }
    };
  
    fetchUserData(); // Invoke the fetch function
  }, [token]);

  // Handle save notification settings
  const handleSaveNotifications = () => {
    console.log("Notification settings saved:", {
      emailNotifications,
      pushNotifications,
      smsNotifications,
    });
  };

  // Handle save security settings
  const handleSaveSecurity = () => {
    console.log("Security settings saved.");
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>

      {/* Account Settings */}
    <section id="account-settings">
      {user ? (
        <>
          <h3>Hello {user.first_name} {user.last_name}</h3>
          <h6>Email: {user.email}</h6>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    

      {/* Email Update Form */}
      <form onSubmit={handleEmailChange}>
        <label htmlFor="email">New Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}  // Update email state
          required
        />
        <button type="submit">Update Email</button>
      </form>

      <br />

      {/* Password Change Form */}
      <form onSubmit={handlePasswordChange}>
        <label htmlFor="oldPassword">Old Password:</label>
        <input
          type="password"
          id="oldPassword"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}  // Update old password state
          required
        />
        <br />
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}  // Update new password state
          required
        />
        <button type="submit">Change Password</button>
      </form>
      </section>

      {/* Notification Settings */}
      <section id="notification-settings">
        <h2>Notification Settings</h2>
        <label htmlFor="email-notifications">Email Notifications:</label>
        <input
          type="checkbox"
          id="email-notifications"
          checked={emailNotifications}
          onChange={(e) => setEmailNotifications(e.target.checked)}
        />

        <label htmlFor="push-notifications">Push Notifications:</label>
        <input
          type="checkbox"
          id="push-notifications"
          checked={pushNotifications}
          onChange={(e) => setPushNotifications(e.target.checked)}
        />

        <label htmlFor="sms-notifications">SMS Notifications:</label>
        <input
          type="checkbox"
          id="sms-notifications"
          checked={smsNotifications}
          onChange={(e) => setSmsNotifications(e.target.checked)}
        />

        <button>Save Notification Settings</button>
      </section>

      {/* Security Settings */}
      <section id="security-settings">
        <h2>Security Settings</h2>
        <button
          onClick={() =>
            alert("View Login Activity functionality to be implemented.")
          }
        >
          View Login Activity
        </button>
        <button
          onClick={() =>
            alert("Update Security Questions functionality to be implemented.")
          }
        >
          Update Security Questions
        </button>
        <button onClick={handleSaveSecurity}>Save Security Settings</button>
      </section>
    </div>
  );
};

export default Settings;
