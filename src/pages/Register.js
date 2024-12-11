import React, { useRef, useState, useEffect } from "react";
import { postData } from "../utils/api";
import { Link } from "react-router-dom";

const NAME_REGEX = /^[a-zA-Z\s]*$/; // Regex for name input
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email input
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Regex for password input

const Register = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const errorRef = useRef();

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

  useEffect(() => {
    setValidFirstName(NAME_REGEX.test(firstName));
  }, [firstName]);

  useEffect(() => {
    setValidLastName(NAME_REGEX.test(lastName));
  }, [lastName]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setValidConfirmPassword(password === confirmPassword);
  }, [password, confirmPassword]);

  useEffect(() => {
    setErrorMessage("");
  }, [firstName, lastName, email, password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isFormValid =
      NAME_REGEX.test(firstName) &&
      NAME_REGEX.test(lastName) &&
      EMAIL_REGEX.test(email) &&
      PASSWORD_REGEX.test(password);

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

    postData("/api/users/", newUser);
    console.log(firstName, lastName, email, password);
    setSuccess(true);
  };

  return (
    <>
      {success ? (
        <div>
          <h1>Success</h1>
          <p>Account created successfully</p>
          <Link to="/Login">Log In</Link>
        </div>
      ) : (
        <div>
          <p
            ref={errorRef}
            className={errorMessage ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errorMessage}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">First name:</label>
            <input
              type="text"
              id="firstName"
              ref={firstNameRef}
              autoComplete="off"
              onChange={(e) => setFirstName(e.target.value)}
              required
              aria-invalid={!validFirstName}
            />

            <label htmlFor="lastName">Last name:</label>
            <input
              type="text"
              id="lastName"
              ref={lastNameRef}
              autoComplete="off"
              onChange={(e) => setLastName(e.target.value)}
              required
              aria-invalid={!validLastName}
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={!validEmail}
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              ref={confirmPasswordRef}
              autoComplete="off"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              disabled={
                !validFirstName ||
                !validLastName ||
                !validEmail ||
                !validPassword ||
                !validConfirmPassword
              }
            >
              Register
            </button>
          </form>
          <span className="line">
            <p>
              <Link to="/Login">Log In</Link>
            </p>
          </span>
        </div>
      )}
    </>
  );
};

export default Register;