import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthProvider";
import { changePassword, putDataWithToken, fetchData } from "../utils/api"; 


const Settings = () => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [notificationPreferences, setNotificationPreferences] = useState({
    emailNotifications: false,
    pushNotifications: false,
  });
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const { token } = useAuth(); // JWT token

  // State for notification settings
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);

  // State for display settings
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [fontSize, setFontSize] = useState(16);
  const [language, setLanguage] = useState("en");  

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
  
  
// Handle email update form submission
const handleEmailChange = async (e) => {
  e.preventDefault();
  try {
    const data = { action: 'update_email', email };
    const response = await putDataWithToken('api/settings', data, token);  
    setMessage(response.msg); 
  } catch (error) {
    setMessage(error.response?.data?.error || "An error occurred while updating email");
  }
};

// Handle password change form submission
const handlePasswordChange = async (e) => {
  e.preventDefault();
  try {
    const data = { action: 'change_password', old_password: oldPassword, new_password: newPassword };
    const response = await changePassword(oldPassword, newPassword, token);  
    setMessage(response.msg);  
  } catch (error) {
    setMessage(error.response?.data?.error || "An error occurred while changing password");
  }
};

  

  // Apply theme
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Handle account settings change
  //const handleAccountChange = (e) => {
   // const { name, value } = e.target;
   // setUser((prevState) => ({ ...prevState, [name]: value }));
  //};

  // Handle save account settings
  //   const handleSaveAccount = () => {
  //     axios;
  //   .put(`/api/users/${token.sub}`, user)
  //   .then((response) => console.log("User updated:", response.data))
  //   .catch((error) => console.error("Error updating user:", error));
  //   };

  // Handle save display settings
  const handleSaveDisplay = () => {
    console.log("Display settings saved:", { theme, fontSize, language });
  };

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
      <h2>Account Settings</h2>
      {user ? (
        <>
          <h3>Hello {user.first_name} {user.last_name}</h3>
          <h3>Email: {user.email}</h3>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    

      {/* Email Update Form */}
      <form onSubmit={handleEmailChange}>
        <label htmlFor="email">Email:</label>
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

      {/* Display Settings */}
      <section id="display-settings">
        <h2>Display and Appearance</h2>
        <label htmlFor="theme">Theme:</label>
        <select
          id="theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>

        <label htmlFor="font-size">Font Size:</label>
        <input
          type="range"
          id="font-size"
          value={fontSize}
          min="10"
          max="30"
          onChange={(e) => setFontSize(e.target.value)}
        />

        <label htmlFor="language">Language:</label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="fr">French</option>
          {/* Add more languages as needed */}
        </select>

        <button onClick={handleSaveDisplay}>Save Display Settings</button>
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
