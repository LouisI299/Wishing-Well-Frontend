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
import EditGoal from "./pages/EditGoal";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import ContactDetails from "./pages/ContactDetails";
import Friends from "./pages/Friends";
import FriendRequests from "./pages/FriendRequests";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/edit-goal/:goalId" element={<EditGoal />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/goal-summary/:goalId" element={<GoalSummary />} />
          <Route path="/contactDetails" element={<ContactDetails />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/friendRequests" element={<FriendRequests />} />
          <Route path="/add-goal" element={<AddGoal />} />
          <Route path="/social" element={<Social />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
};

export default AppRoutes;
