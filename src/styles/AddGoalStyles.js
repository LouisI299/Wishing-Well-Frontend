import { Alert, Button, Container, Form } from "react-bootstrap";
import styled from "styled-components";

export const AddGoalContainer = styled(Container)`
  h1 {
    font-weight: bolder;
    text-align: center;
    margin-top: 0.5rem;
  }

  .BackButton {
    display: block;
  }

  .categoryButtons {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  Form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .categoryButtons button {
    flex: 1 1 calc(50% - 10px);
    max-width: calc(50% - 10px);
    margin: 5px 0;
  }
`;

export const CategoryButton = styled(Button)`
  flex: 1 1 calc(50% - 10px);
  max-width: calc(50% - 10px);

  margin: 5px 0;
  background-size: cover;
  background-position: center;
  border: none;
  color: black;
  margin: 10px;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
  }
`;

export const NextButton = styled(Button)`
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
  position: fixed;
  top: 85%;
  font-size: 1.5rem;
  border-radius: 2em;
  width: 20%;
`;
