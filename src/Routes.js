// routes.js
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AddGoal from "./pages/AddGoal";
import Social from "./pages/Social";
import Settings from "./pages/Settings";
import NoPage from "./pages/NoPage";
import PrivateRoute from "./components/PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<PrivateRoute element={<Home />} />} />
      <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
      <Route
        path="/add-goal"
        element={<PrivateRoute element={<AddGoal />} />}
      />
      <Route path="/social" element={<PrivateRoute element={<Social />} />} />
      <Route
        path="/settings"
        element={<PrivateRoute element={<Settings />} />}
      />
      <Route path="*" element={<PrivateRoute element={<NoPage />} />} />
    </Routes>
  );
};

export default AppRoutes;
