import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import studentsData from "../data/students.json";

export default function GESTScorecardDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [minScore, setMinScore] = useState(0);
  const [minPercentile, setMinPercentile] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState("any skill");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    if (!loggedInUser) {
      navigate("/login");
    } else {
      setUser(loggedInUser);
    }
  }, [navigate]);

  const filteredStudents = studentsData.filter((student) => {
    const score = Number(student.score) || 0;
    const percentile = Number(student.percentile) || 0;
    const meetsScore = score >= minScore;
    const meetsPercentile = percentile >= minPercentile;

    const hasSkill =
      selectedSkill === "any skill" ||
      Object.keys(student.sections || {}).some(
        (skill) => skill.toLowerCase() === selectedSkill.toLowerCase()
      );

    return meetsScore && meetsPercentile && hasSkill;
  });

  const sortedStudents = [...filteredStudents];

  if (sortField) {
    sortedStudents.sort((a, b) => {
      const valA = a.sections?.[capitalize(sortField)] || 0;
      const valB = b.sections?.[capitalize(sortField)] || 0;
      return sortOrder === "asc" ? valA - valB : valB - valA;
    });
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="min-h-screen w-full px-4 py-6 bg-purple-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-900 mb-6">GEST Scorecard Dashboard</h1>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow mb-8 border border-purple-200">
          <h2 className="text-xl font-semibold mb-4 text-purple-700">Filter Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium text-purple-600">Minimum GEST Score</label>
              <input
                type="range"
                min="0"
                max="100"
                value={minScore}
                onChange={(e) => setMinScore(Number(e.target.value))}
                className="w-full accent-purple-600"
              />
              <p className="text-center font-semibold text-purple-700">{minScore}</p>
            </div>
            <div>
              <label className="block font-medium text-purple-600">Minimum Percentile</label>
              <input
                type="range"
                min="0"
                max="100"
                value={minPercentile}
                onChange={(e) => setMinPercentile(Number(e.target.value))}
                className="w-full accent-purple-600"
              />
              <p className="text-center font-semibold text-purple-700">{minPercentile}</p>
            </div>
            <div>
              <label className="block font-medium text-purple-600">Sort By Skill</label>
              <div className="flex items-center gap-2">
                <select
                  value={sortField || "none"}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSortField(value === "none" ? null : value);
                  }}
                  className="w-full p-2 border border-purple-300 rounded capitalize"
                >
                  <option value="none">None</option>
                  <option value="communication">Communication</option>
                  <option value="coding">Coding</option>
                  <option value="aptitude">Aptitude</option>
                </select>
                {sortField && (
                  <button
                    onClick={() =>
                      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                    }
                    className="text-purple-600 text-xl font-bold"
                    title={`Sort ${sortOrder === "asc" ? "descending" : "ascending"}`}
                  >
                    {sortOrder === "asc" ? "⬆️" : "⬇️"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Student Cards */}
        <h2 className="text-xl font-bold mb-4 text-purple-900">
          Student Results ({sortedStudents.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedStudents.map((student) => (
            <div
              key={student.id}
              onClick={() => navigate(`/gest-scorecard/student/${student.id}`)}
              className="bg-white cursor-pointer hover:shadow-lg rounded-xl p-6 shadow border border-purple-200 transition"
            >
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={student.profilePic}
                  alt={student.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-purple-900">{student.name}</p>
                  <p className="text-sm text-purple-500">{student.email}</p>
                </div>
              </div>
              <p className="text-sm text-purple-500">GEST Score</p>
              <p className="text-xl font-bold text-purple-800 mb-2">{student.score}/100</p>
              <p className="text-sm text-purple-500">Percentile</p>
              <p className="font-semibold text-purple-700 mb-2">{student.percentileLabel}</p>
              <p className="text-sm text-purple-500 mb-1">Sectional Scores</p>
              <div className="flex flex-wrap gap-2 text-xs">
                {Object.entries(student.sections).map(([key, val]) => (
                  <span
                    key={key}
                    className="bg-purple-50 border border-purple-200 text-purple-800 px-2 py-1 rounded"
                  >
                    {key}: {val}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {sortedStudents.length === 0 && (
          <p className="text-center text-purple-400 mt-10">
            No students match the selected filters.
          </p>
        )}
      </div>
    </div>
  );
}
