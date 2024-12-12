// Login page

// Imports
import { Navigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useState } from "react";
import { checkLogin } from "../utils/api";
import { Alert, Container, Form, Button } from "react-bootstrap";

// Login component
const Login = () => {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [redirectToDashboard, setRedirectToDashboard] = useState(false); // State to redirect to the dashboard
  const [error, setError] = useState(""); // State for error message
  const { login } = useAuth(); // Get the login function from the AuthProvider
  const location = useLocation();
  const successMessage = location.state?.successMessage;

  // Function to handle login when form is submitted
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await checkLogin(email, password);
      if (data.access_token && data.refresh_token) {
        login(data.access_token, data.refresh_token);
        setRedirectToDashboard(true);
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Invalid email or password, please try again.");
    }
  };

  // If the user is logged in, redirect to the dashboard/home page
  if (redirectToDashboard) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <h1>Login</h1>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email: </Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <Link to="/Register">Register</Link>
    </Container>
  );
};

export default Login;
