import styled from "styled-components";
import { Container, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ImgContainer = styled(Container)`
  height: 20vh;
  width: 100%;
  padding: 0;

  img {
    border-top-left-radius: 1em;
    border-top-right-radius: 1em;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const EditContainer = styled(Container)`
  display: flex;
  max-width: 100%;
  flex-direction: column;
  align-items: center;

  #editGoalForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;

    input {
      height: 2rem;
      border-radius: 5px;
    }
  }
`;

export const SummaryContainer = styled(Container)`
  display: flex;
  width: 95vw;
  padding: 0;
  border-width: 0;
  flex-direction: column;
  justify-content: center;

  align-items: center;

  background-color: ${({ theme }) => theme.secondary};
  border-radius: 1em;

  .summaryTitle {
    display: flex;
    margin-top: 1em;
    width: 95%;
    justify-content: space-between;

    flex-direction: row;

    a {
      color: ${({ theme }) => theme.text};
      font-size: 1.6em;
      font-weight: bold;
      text-decoration: none;
    }
  }

  form {
    display: flex;
    flex-direction: row;
    align-items: center;
    input {
      margin: 0 0.5em 0 0.5em;
      height: 3em;
      border-radius: 1em;
      width: 4em;
      text-align: center;
    }
  }
`;

export const DepositBtn = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.text};
  font-size: 2em;
  border: solid 3px ${({ theme }) => theme.text};
  border-radius: 50%;
  padding: 0.2em;
  margin: 0;
`;
