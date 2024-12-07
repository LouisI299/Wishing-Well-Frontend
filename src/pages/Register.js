//Page to register a new account

import React, { useRef, useState, useEffect } from "react";
import { postData } from "../utils/api";

const NAME_REGEX = /^[a-zA-Z\s]*$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const Register = () => {
  //Refs
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const errorRef = useRef();

  //State
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
    const result = NAME_REGEX.test(firstName);
    setValidFirstName(result);
  }, [firstName]);

  useEffect(() => {
    const result = NAME_REGEX.test(lastName);
    setValidLastName(result);
  }, [lastName]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
  }, [password]);

  useEffect(() => {
    const result = password === confirmPassword;
    setValidConfirmPassword(result);
  }, [confirmPassword, password]);

  useEffect(() => {
    setErrorMessage("");
  }, [firstName, lastName, email, password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const t1 = NAME_REGEX.test(firstName);
    const t2 = NAME_REGEX.test(lastName);
    const t3 = EMAIL_REGEX.test(email);
    const t4 = PASSWORD_REGEX.test(password);
    if (!t1 || !t2 || !t3 || !t4) {
      setErrorMessage("Please fill in all fields correctly");
      return;
    } else {
      const new_user = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      };
      postData("/api/users/", new_user);
      console.log(firstName, lastName, email, password);
      setSuccess(true);
    }
  };

  return (
    <>
      {success ? (
        <div>
          <h1>Success</h1>
          <p>Account created successfully</p>
          <a href="#">Log In</a>
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
              aria-invalid={validFirstName ? "false" : "true"}
            />

            <label htmlFor="lastName">Last name:</label>
            <input
              type="text"
              id="lastName"
              ref={lastNameRef}
              autoComplete="off"
              onChange={(e) => setLastName(e.target.value)}
              required
              aria-invalid={validLastName ? "false" : "true"}
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={validEmail ? "false" : "true"}
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
              onChange={(e) =>
                setConfirmPassword(e.target.value) &&
                console.log(e.target.value)
              }
              required
            />

            <button
              disabled={
                !validFirstName ||
                !validLastName ||
                !validEmail ||
                !validPassword ||
                password !== confirmPassword
                  ? true
                  : false
              }
            >
              Register
            </button>
            <span className="line">
              <a href="#">Log In</a>
            </span>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
