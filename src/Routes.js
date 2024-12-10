// Main routes for the app

// Imports
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AddGoal from "./pages/AddGoal";
import Social from "./pages/Social";
import Settings from "./pages/Settings";
import NoPage from "./pages/NoPage";
import GoalSummary from "./pages/GoalSummary";
import PrivateRoute from "./components/PrivateRoute";
import EditGoal from "./pages/EditGoal";

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/edit-goal/:goalId" element={<EditGoal />} />
        <Route path="/edit-goal/:id" element={<PrivateRoute element={<EditGoal/>} />} />
        <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<PrivateRoute element={<Home />} />} />
      <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
      <Route
        path="/goal-summary/:goalId"
        element={<PrivateRoute element={<GoalSummary />} />}
      />
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
