import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthProvider";

const Settings = () => {
  // State for account settings
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  // State for notification settings
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);

  // State for display settings
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [fontSize, setFontSize] = useState(16);
  const [language, setLanguage] = useState("en");

  // JWT token
  const { token } = useAuth();

  // Fetch user data
  useEffect(() => {
    if (token) {
      axios
        .get(`/api/users/${token.sub}`)
        .then((response) => setUser(response.data))
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [token]);

  // Apply theme
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Handle account settings change
  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle save account settings
  const handleSaveAccount = () => {
    axios
      .put(`/api/users/${token.sub}`, user)
      .then((response) => console.log("User updated:", response.data))
      .catch((error) => console.error("Error updating user:", error));
  };

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
        <label htmlFor="first_name">First Name:</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={user.first_name}
          onChange={handleAccountChange}
        />

        <label htmlFor="last_name">Last Name:</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={user.last_name}
          onChange={handleAccountChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleAccountChange}
        />

        <button onClick={handleSaveAccount}>Save Account Settings</button>
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

        <button onClick={handleSaveNotifications}>
          Save Notification Settings
        </button>
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
