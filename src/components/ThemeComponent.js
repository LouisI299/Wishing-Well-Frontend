import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./themes";
import { GlobalStyles } from "./GlobalStyles";
import { useTheme } from "../contexts/ThemeProvider";

const ThemeComponent = ({ children }) => {
  const { theme } = useTheme();

  return (
    <StyledThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeComponent;
