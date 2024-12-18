import { Alert, Button, Container, Form } from "react-bootstrap";
import styled from "styled-components";
import { theme } from "./GlobalStyles";

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
    padding-top: 1rem;
    gap: 1rem;
    justify-content: center;
    min-height: fit-content;
  }

  Form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .categoryButtons button {
    flex: 1 1 calc(50% - 10px);

    margin: 5px 0;
  }

  .categoryDiv {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(50% - 10px);
    height: 17vh;
  }
`;

export const CategoryButton = styled(Button)`
  width: 100%;

  margin: 0;
  background-size: cover;
  background-position: center;
  border: none;

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
