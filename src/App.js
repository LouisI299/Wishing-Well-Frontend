// Main App component

// Imports
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import { AuthProvider } from "./contexts/AuthProvider";
import { ThemeProvider } from "./contexts/ThemeProvider";
import ThemeComponent from "./components/ThemeComponent";

// App component
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ThemeProvider>
          <ThemeComponent>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </ThemeComponent>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
