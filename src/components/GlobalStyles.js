import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
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
  button {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text};
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
`;
