import { useState } from "react";
import { signupUser } from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");
    setLoading(true);
    try {
      await signupUser(form);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Sign Up</h2>
        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="input w-full border p-2 rounded mb-3"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="input w-full border p-2 rounded mb-3"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        <p className="mt-2 text-sm text-center text-gray-700">
          Already have an account?{" "}
          <span
            className="text-yellow-400 cursor-pointer underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
