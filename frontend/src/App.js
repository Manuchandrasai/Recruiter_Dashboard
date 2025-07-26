import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./utils/token";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ProtectedLayout from "./components/ProtectedLayout";

import StudentResume from "./pages/StudentResume";
import CreateJob from "./pages/CreateJob";
import StudentDetail from "./pages/StudentDetail";
import ViewJobs from "./pages/ViewJobs";
import JobDetail from "./pages/JobDetail";
import EditJob from "./pages/EditJob";
import GESTScorecardDashboard from "./pages/GESTScorecardDashboard";
import CommunicationTools from "./pages/CommunicationTools";

function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<PrivateRoute><ProtectedLayout /></PrivateRoute>}>
          <Route path="/dashboard" element={<CreateJob />} />
          <Route path="/jobs" element={<ViewJobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/jobs/:id/edit" element={<EditJob />} />
          <Route path="/create" element={<CreateJob />} />

          <Route path="/student-resume/:id" element={<StudentResume />} />
          <Route path="/gest-scorecard" element={<GESTScorecardDashboard />} />
          <Route path="/gest-scorecard/student/:id" element={<StudentDetail />} />
          <Route path="/communication-tools" element={<CommunicationTools />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
