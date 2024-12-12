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
  const [error, setError] = useState(""); // State for error message

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
        setError(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // If the user is logged in, redirect to the dashboard/home page
  if (redirectToDashboard) {
    return <Navigate to="/" />;
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
        <Link to="/Register">Register</Link>
      </form>
    </div>
  );
};

export default Login;
