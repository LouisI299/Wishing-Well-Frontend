import { useTheme } from "../contexts/ThemeProvider";
import { Form } from "react-bootstrap";

const ToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Form>
      <Form.Check
        type="switch"
        id="theme-switch"
        label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
    </Form>
  );
};

export default ToggleButton;
