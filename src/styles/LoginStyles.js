import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Form } from "react-bootstrap";
import styled from "styled-components";

export const LogoContainer = styled(Container)`
  max-width: 100%;
  min-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
 img {
    width: 100px;
  }

  h1 {
    font-size: 2em;
  }

   @media (min-width: 1024px) {
    img {
      width: 150px;
      margin: auto;
    }
    h1 {
      font-size: 2.5em;
    }
  }
`;

export const StyledFormGroup = styled(Form.Group)`
  display: flex;
  justify-content: center;
  height: 3em;
  margin: 1em 0 1em 0;
  position: relative;

   @media (max-width: 768px) {
    height: 2.5em;
    margin: 0.5em 0;
  }
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

   @media (min-width: 1024px) {
    width: 50%;
    margin-bottom: 1em;
  }
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
    text-align: center;
  }
   @media (min-width: 768px) {
      width: 40%;
      font-size: 1em;
      margin: auto;
      
    }
  }
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text};
    font-weight: bold;
    
`;
