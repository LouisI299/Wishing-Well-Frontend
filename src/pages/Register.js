import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const NAME_REGEX = /^[A-Za-z]{2,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const Register = () => {
  // Refs
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const errorRef = useRef();

  // State
  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");

  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameError, setLastNameError] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // UseEffects to validate inputs
  useEffect(() => {
    const result = NAME_REGEX.test(firstName);
    setValidFirstName(result);
    if (!result) {
      setFirstNameError("Invalid first name, minimum 2 letters required");
    } else {
      setFirstNameError("");
    }
  }, [firstName]);

  useEffect(() => {
    const result = NAME_REGEX.test(lastName);
    setValidLastName(result);
    if (!result) {
      setLastNameError("Invalid last name, minimum 2 letters required");
    } else {
      setLastNameError("");
    }
  }, [lastName]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
    if (!result) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  }, [email]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
    if (!result) {
      setPasswordError("Password must be at least 8 characters long and contain at least one letter and one number");
    } else {
      setPasswordError("");
    }
  }, [password]);

  useEffect(() => {
    const result = password === confirmPassword;
    setValidConfirmPassword(result);
    if (!result) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  }, [password, confirmPassword]);

  // Check if all fields are valid
  const isFormValid = validFirstName && validLastName && validEmail && validPassword && validConfirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Controleer of alle velden geldig zijn
    if (isFormValid) {
      // Voer de registratie uit
      // ...
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {formSubmitted && firstNameError && <p>{firstNameError}</p>}

        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {formSubmitted && lastNameError && <p>{lastNameError}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {formSubmitted && emailError && <p>{emailError}</p>}

        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {formSubmitted && passwordError && <p>{passwordError}</p>}

        <input
          type="password"
          placeholder="Confirm Password"
          ref={confirmPasswordRef}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {formSubmitted && confirmPasswordError && <p>{confirmPasswordError}</p>}

        <button type="submit">Register</button>
      </form>
      {errorMessage && <p ref={errorRef}>{errorMessage}</p>}
      <Link to="/Login">Login</Link>
    </div>
  );
};

export default Register;