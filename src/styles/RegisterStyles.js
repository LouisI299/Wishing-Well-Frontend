import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Form } from "react-bootstrap";
import styled from "styled-components";

export const StyledIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.text};

  font-size: 2em;
  padding: 0.5em;

  @media (min-width: 1024px) {
    font-size: 1.5em;
  }
   
`;

export const IconContainer = styled.div`
  border-color: ${({ theme }) => theme.text};
  border-style: solid;
  max-width: fit-content;
  max-height: fit-content;
  margin-top: 0.5em;
  margin-bottom: 1.5em;
  border-radius: 50%;
  border-width: 2px;
  display: flex;
  justify-content: center;

`;

export const RegisterContainer = styled(Container)`
  width: 100%;
`;

export const StyledInput = styled(Form.Control)`
  height: 3em;
  margin: 0.5em 0 0.5em 0;
  border-radius: 1em;  
  @media (min-width: 1024px) {
  width: 50%;
  margin: 1rem auto 1rem auto;
}
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  button {
    width: 60%;
    font-weight: bold;
    margin: 1em 0 1.5em 0;
    font-size: 1.3em;
    border-radius: 2em;

     @media (min-width: 1024px) {
      width: 30%;
      font-size: 1.5em;
      margin: 1.5em 0;
    }
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text};
    font-weight: bold;
  }
`;
