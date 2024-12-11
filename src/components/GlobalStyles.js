import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
body {
    background: ${({ theme }) => theme.bg300};
    color: ${({ theme }) => theme.text100};
    transition: all 0.50s linear;
  }
  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.text200};
  }
  a {
    color: ${({ theme }) => theme.accent200};
  }
  button {
    background-color: ${({ theme }) => theme.primary100};
    color: ${({ theme }) => theme.text100};
  }

  header {
    background-color: ${({ theme }) => theme.bg100};
    color: ${({ theme }) => theme.text300};
  }

  footer {
    background-color: ${({ theme }) => theme.bg100};
    color: ${({ theme }) => theme.text300} !important;
  }

  footer a {
  color: ${({ theme }) => theme.text300} !important;
  }
`;
