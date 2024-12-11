import { useTheme } from "../contexts/ThemeProvider";

const ToggleButton = () => {
  const { toggleTheme } = useTheme();

  return <button onClick={toggleTheme}>Toggle Theme</button>;
};

export default ToggleButton;
