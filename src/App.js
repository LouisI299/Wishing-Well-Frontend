// Main App component

// Imports
import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import { AuthProvider } from "./contexts/AuthProvider";
import { ThemeProvider } from "./contexts/ThemeProvider";
import ThemeComponent from "./components/ThemeComponent";
import Interceptor401 from "./components/Interceptor401";

// App component
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ThemeProvider>
          <ThemeComponent>
            <BrowserRouter>
              <Interceptor401 />
              <AppRoutes />
            </BrowserRouter>
          </ThemeComponent>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
