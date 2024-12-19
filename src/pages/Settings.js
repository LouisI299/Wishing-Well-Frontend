import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthProvider";
import { ActionButton, ButtonContainer, NotificationSettingsContainer, SettingsContainer, UserInfoContainer } from "../styles/SettingsStyles";



const Settings = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [notificationPreferences, setNotificationPreferences] = useState({
    emailNotifications: false,
    pushNotifications: false,
  });
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const { token, logout } = useAuth(); // JWT token
  const [email, setEmail] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [success, setSuccess] = useState("");
  

  const handleToggleEmailForm = () => {
    setShowEmailForm(!showEmailForm);
    setShowPasswordForm(false); // Ensure only one form is visible
  };

  const handleTogglePasswordForm = () => {
    setShowPasswordForm(!showPasswordForm);
    setShowEmailForm(false); // Ensure only one form is visible
  };

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
      setSuccess(true);
      setSuccessMessage("Email updated successfully!");
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
      setSuccess(true);
      setSuccessMessage("Password changed successfully!");
    } catch (error) {
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
//handle account deletion
const handleDeleteAccount = async () => {
  if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
    try {
      await axios.delete(`/api/users/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccessMessage("Account deleted successfully.");
      logout(); // Log out the user after account deletion
    } catch (error) {
      console.error("Error deleting account:", error);
      setMessage(
        error.response?.data?.error || "An error occurred while deleting your account."
      );
    }
  }
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
    <SettingsContainer>    
    <h1>Settings</h1>
    
    {/* Display success message if email or password is updated */}
    {success && <Alert variant="success">{successMessage}</Alert>}

      {/* Account Settings */}
    <section id="account-settings">
      {user ? (
        <UserInfoContainer>  
          <h5>Username : {user.first_name} {user.last_name}</h5>
          <h5>E-mail : {user.email}</h5>
        </UserInfoContainer>
      ) : (
        <p>Loading user data...</p>
      )}
    
      {/* Buttons to toggle forms */}
      <ButtonContainer>
        <button onClick={() => setShowEmailForm(!showEmailForm)}>Change Email</button>
      </ButtonContainer>

    {/* Email Update Form */}
    {showEmailForm && (
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
    )}
  
    <br/>


    <ButtonContainer>
      <button onClick={() => setShowPasswordForm(!showPasswordForm)}>Change Password</button>
    </ButtonContainer>

    {/* Password Change Form */}
    {showPasswordForm && (
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
    )}
    <br/>
    <ButtonContainer>
          <ActionButton onClick={handleDeleteAccount}>
            Delete Account
          </ActionButton>
        </ButtonContainer>
    </section>

      {/* Notification Settings */}
      <NotificationSettingsContainer>
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
      </NotificationSettingsContainer>

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
    </SettingsContainer>  
  );
};

export default Settings;
