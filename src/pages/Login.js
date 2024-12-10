// Login page

// Imports
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useState } from "react";
import { checkLogin } from "../utils/api";

// Login component
const Login = () => {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [redirectToDashboard, setRedirectToDashboard] = useState(false); // State to redirect to the dashboard

  const { login } = useAuth(); // Get the login function from the AuthProvider

  // Function to handle login when form is submitted
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await checkLogin(email, password);
      if (data.success) {
        login(data.access_token);
        setRedirectToDashboard(true);
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // If the user is logged in, redirect to the dashboard/home page
  if (redirectToDashboard) {
    return <Navigate to="/Home" />;
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
