import React, { useRef, useState, useEffect } from "react";
import { postData } from "../utils/api";
import { Link, Navigate } from "react-router-dom";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  StyledIcon,
  IconContainer,
  StyledInput,
  ButtonContainer,
} from "../styles/RegisterStyles";

const NAME_REGEX = /^[a-zA-Z\s]*$/; // Regex for name input
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email input
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Regex for password input

const Register = () => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef();
  // const errorRef = useRef();

  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   setValidFirstName(NAME_REGEX.test(firstName));
  // }, [firstName]);

  // useEffect(() => {
  //   setValidLastName(NAME_REGEX.test(lastName));
  // }, [lastName]);

  // useEffect(() => {
  //   setValidEmail(EMAIL_REGEX.test(email));
  // }, [email]);

  // useEffect(() => {
  //   setValidPassword(PASSWORD_REGEX.test(password));
  // }, [password]);

  // useEffect(() => {
  //   setValidConfirmPassword(password === confirmPassword);
  // }, [password, confirmPassword]);

  // useEffect(() => {
  //   setErrorMessage("");
  // }, [firstName, lastName, email, password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormValid = firstName && lastName && email && password;

    setValidFirstName(NAME_REGEX.test(firstName));
    setValidLastName(NAME_REGEX.test(lastName));
    setValidEmail(EMAIL_REGEX.test(email));
    setValidPassword(PASSWORD_REGEX.test(password));
    setValidConfirmPassword(password === confirmPassword);

    if (!isFormValid) {
      setErrorMessage("Please fill in all fields correctly");
      return;
    }

    const newUser = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    };
    try {
      await postData("/api/users/", newUser);

      setSuccess(true);
    } catch (error) {
      console.error("Error creating user:", error);
      setErrorMessage("Error creating user");
    }
  };

  if (success) {
    return (
      <Navigate
        to="/login"
        state={{
          successMessage: "Account created succesfully. Please log in.",
        }}
      />
    );
  }

  return (
    <Container>
      <div>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Link to="/login">
          <IconContainer>
            <StyledIcon icon={faChevronLeft} />
          </IconContainer>
        </Link>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFirstName">
            <StyledInput
              type="text"
              ref={firstNameRef}
              required
              placeholder="First Name..."
              isInvalid={!validFirstName && firstName !== ""}
              onChange={(e) => {
                setFirstName(e.target.value);
                setValidFirstName(NAME_REGEX.test(e.target.value));
              }}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid first name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formLastName">
            <StyledInput
              type="text"
              ref={lastNameRef}
              required
              placeholder="Last Name..."
              isInvalid={!validLastName && lastName !== ""}
              onChange={(e) => {
                setLastName(e.target.value);
                setValidLastName(NAME_REGEX.test(e.target.value));
              }}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid last name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formEmail">
            <StyledInput
              type="email"
              ref={emailRef}
              required
              placeholder="Email..."
              isInvalid={!validEmail && email !== ""}
              onChange={(e) => {
                setEmail(e.target.value);
                setValidEmail(EMAIL_REGEX.test(e.target.value));
              }}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPassword">
            <StyledInput
              type="password"
              ref={passwordRef}
              required
              placeholder="Password..."
              isInvalid={!validPassword && password !== ""}
              onChange={(e) => {
                setPassword(e.target.value);
                setValidPassword(PASSWORD_REGEX.test(e.target.value));
              }}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formConfirmPassword">
            <StyledInput
              type="password"
              ref={confirmPasswordRef}
              required
              placeholder="Confirm Password..."
              isInvalid={confirmPassword !== password}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setValidConfirmPassword(e.target.value === password);
              }}
            />
            <Form.Control.Feedback type="invalid">
              Passwords do not match.
            </Form.Control.Feedback>
          </Form.Group>
          <ButtonContainer>
            <Button
              type="submit"
              disabled={
                !validFirstName ||
                !validLastName ||
                !validEmail ||
                !validPassword ||
                !validConfirmPassword
              }
            >
              Register
            </Button>
            <p>
              Already have an account? <Link to="/Login">Log In</Link>
            </p>
          </ButtonContainer>
        </Form>
      </div>
    </Container>
  );
};

export default Register;
