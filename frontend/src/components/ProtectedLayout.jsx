import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { clearAuth } from "../utils/token";


export default function ProtectedLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
  clearAuth();
  navigate("/login");
};

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-purple-50 to-purple-200">
      <Sidebar />
      <div className="flex-1 pl-4 pr-6 pt-6">
        <div className="flex justify-end mb-4 space-x-3">
          <button
            onClick={() => navigate("/jobs")}
            className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded shadow"
          >
            View All Postings
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
          >
            Logout
          </button>
        </div>
        <div className="max-w-8xl mx-auto w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
