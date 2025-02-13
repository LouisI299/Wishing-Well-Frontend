// Main App component

// Imports
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import { AuthProvider } from "./contexts/AuthProvider";

// App component
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
