import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AddGoal from "./pages/AddGoal";
import Social from "./pages/Social";
import Settings from "./pages/Settings";
import NoPage from "./pages/NoPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/add-goal" element={<AddGoal />} />
      <Route path="/social" element={<Social />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
};

export default AppRoutes;
