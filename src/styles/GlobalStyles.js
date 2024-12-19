import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { Modal } from "react-bootstrap";

export const GlobalStyles = createGlobalStyle`
// Colors:
body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
    font-family: 'Helvetica';
  }
  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.text};
  }
  a {
    color: ${({ theme }) => theme.accent};
  }
  button, .btn {
    background-color: ${({ theme }) => theme.secondary} !important;
    color: ${({ theme }) => theme.text} ;
    border: none !important;
    &:hover {
      background-color: ${({ theme }) => theme.secondaryHover} !important;
    }
    &:active, &:focus {
      background-color: ${({ theme }) => theme.secondarySelected} !important;
    }
  }

  header {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text};
  }

  footer {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text} !important;
  }

  footer a {
  color: ${({ theme }) => theme.text} !important;
  }

  .form-label{
    margin: 0;
  }
  
    
  }
`;

export const StyledModal = styled(Modal)`
  .container {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 300px;
    text-align: center;
    color: black;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ffffff;);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  button {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 10px;
    &:hover {
      background-color: #45a049;
    }
  }
`;
