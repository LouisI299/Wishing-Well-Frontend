import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthProvider";
import ToggleButton from "../components/ToggleButton";
import {
  StyledIcon,
  ButtonContainer,
  NotificationSettingsContainer,
  SettingsContainer,
  UserInfoContainer,
  ProgressBar,
  ProgressFiller,
  StyledButton,
} from "../styles/SettingsStyles";
import { faUser, faLock, faTrash } from "@fortawesome/free-solid-svg-icons";

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
  const [progress, setProgress] = useState(0); // Track settings completion progress

  // Progress calculation
  useEffect(() => {
    let completed = 0;
    if (emailNotifications) completed += 1;
    if (pushNotifications) completed += 1;
    if (smsNotifications) completed += 1;
    setProgress((completed / 3) * 100);
  }, [emailNotifications, pushNotifications, smsNotifications]);

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
      setEmail("");
      setShowEmailForm(false);
      fetchUserData();
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
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess(true);
      setSuccessMessage("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setShowPasswordForm(false);
    } catch (error) {
      setMessage(
        error.response.data.error || "An error occurred while changing password"
      );
    }
  };

  // Fetch user data
  useEffect(() => {
    fetchUserData(); // Invoke the fetch function
  }, [token]);
  //handle account deletion
  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
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
          error.response?.data?.error ||
            "An error occurred while deleting your account."
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
      <ToggleButton />

      {/* Account Settings */}
      <section id="account-settings">
        {user ? (
          <UserInfoContainer>
            <h5>
              Username : {user.first_name} {user.last_name}
            </h5>
            <h5>E-mail : {user.email}</h5>
          </UserInfoContainer>
        ) : (
          <p>Loading user data...</p>
        )}

        {/* Conditionally render buttons based on form visibility */}
        {!showEmailForm && (
          <StyledButton>
            <ButtonContainer>
              <button onClick={handleToggleEmailForm}>
                <StyledIcon icon={faUser} />
                Change Email
              </button>
            </ButtonContainer>
          </StyledButton>
        )}

        {/* Email Update Form */}
        {showEmailForm && (
          <form onSubmit={handleEmailChange} className="updateForm">
            <input
              type="email"
              value={email}
              placeholder="New email..."
              onChange={(e) => setEmail(e.target.value)} // Update email state
              required
            />
            <StyledButton type="submit">Update Email</StyledButton>
          </form>
        )}

        {!showPasswordForm && (
          <StyledButton>
            <ButtonContainer>
              <button onClick={handleTogglePasswordForm}>
                <StyledIcon icon={faLock} />
                Change Password
              </button>
            </ButtonContainer>
          </StyledButton>
        )}

        {/* Password Change Form */}
        {showPasswordForm && (
          <form onSubmit={handlePasswordChange} className="updateForm">
            <label htmlFor="oldPassword">Old Password:</label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)} // Update old password state
              required
            />
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)} // Update new password state
              required
            />
            <StyledButton type="submit">Change Password</StyledButton>
          </form>
        )}

        <StyledButton>
          <ButtonContainer onClick={handleDeleteAccount}>
            <button>
              <StyledIcon icon={faTrash} />
              Delete Account
            </button>
          </ButtonContainer>
        </StyledButton>
      </section>
      <br />
      <br />
      {/* Notification Settings */}
      <NotificationSettingsContainer>
        <h2>Notification Settings</h2>
        {/* Progress bar */}
        <ProgressBar>
          <ProgressFiller style={{ width: `${progress}%` }} />
        </ProgressBar>
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

        <StyledButton>💾 Save Notification Settings</StyledButton>
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
