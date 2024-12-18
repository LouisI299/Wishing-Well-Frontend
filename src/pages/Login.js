// Login page

// Imports
import { Navigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useState } from "react";
import { checkLogin } from "../utils/api";
import { Alert, Form, Button } from "react-bootstrap";
import logo from "../images/WishingWellCircle.png";
import StyledContainer from "../styles/StyledContainer";
import {
  LogoContainer,
  StyledFormGroup,
  InputGroup,
  InputIcon,
  StyledInput,
  ButtonContainer,
} from "../styles/LoginStyles";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

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
      if (data.access_token) {
        login(data.access_token);
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
    return (
      <Navigate to="/" state={{ successMessage: "Logged in succesfully" }} />
    );
  }

  return (
    <StyledContainer>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <LogoContainer>
        <img src={logo} alt="Wishing Well logo" />
        <h1>Wishing Well</h1>
      </LogoContainer>

      <Form onSubmit={handleLogin}>
        <StyledFormGroup controlId="formEmail" className="loginFormGroup">
          <InputGroup>
            <InputIcon icon={faUser} />
            <StyledInput
              className="loginInput"
              type="email"
              placeholder="E-mail..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
        </StyledFormGroup>

        <StyledFormGroup controlId="formPassword" className="loginFormGroup">
          <InputGroup>
            <InputIcon icon={faLock} />
            <StyledInput
              className="loginInput"
              type="password"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
        </StyledFormGroup>
        <ButtonContainer>
          <Button variant="primary" type="submit">
            Login
          </Button>
          <p>
            Don't have an account? <Link to="/Register">Sign up</Link>
          </p>
        </ButtonContainer>
      </Form>
    </StyledContainer>
  );
};

export default Login;
