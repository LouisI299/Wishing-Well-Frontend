import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
// Colors:
body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }
  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.text};
  }
  a {
    color: ${({ theme }) => theme.accent};
  }
  button, .btn {
    background-color: ${({ theme }) => theme.secondary} !important;
    color: ${({ theme }) => theme.text} !important;
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

  // Media queries small screens
`;
