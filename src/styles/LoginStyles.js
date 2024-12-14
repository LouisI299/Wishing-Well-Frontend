import styled from "styled-components";
import { Container, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const LogoContainer = styled(Container)`
  max-width: 100%;
  min-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const StyledFormGroup = styled(Form.Group)`
  display: flex;
  justify-content: center;
  height: 3em;
  margin: 1em 0 1em 0;
  position: relative;
`;

export const InputIcon = styled(FontAwesomeIcon)`
  position: absolute;
  left: 10px;
  top 50%;
    
  color: ${({ theme }) => theme.text};
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`;

export const StyledInput = styled(Form.Control)`
  padding-left: 35px;
  height: 3em;
  border-radius: 1em;
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
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text};
    font-weight: bold;
    
`;
