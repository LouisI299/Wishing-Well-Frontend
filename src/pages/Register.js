import React, { useRef, useState, useEffect } from "react";
import { postData } from "../utils/api";
import { Link, Navigate } from "react-router-dom";
import { Alert, Button, Container, Form } from "react-bootstrap";

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
        <h1>Register</h1>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type="text"
              ref={firstNameRef}
              required
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
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              type="text"
              ref={lastNameRef}
              required
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
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              ref={emailRef}
              required
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
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              ref={passwordRef}
              required
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
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type="password"
              ref={confirmPasswordRef}
              required
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
        </Form>
        <span className="line">
          <p>
            <Link to="/Login">Log In</Link>
          </p>
        </span>
      </div>
    </Container>
  );
};

export default Register;
