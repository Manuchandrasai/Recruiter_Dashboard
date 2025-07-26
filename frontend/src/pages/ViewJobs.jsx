import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchJobs, deleteJob, updateJob } from "../utils/api";

export default function ViewJobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    const all = await fetchJobs();
    setJobs(all);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      await deleteJob(id);
      loadJobs();
    }
  };

  const handleToggleActive = async (job) => {
    await updateJob(job.id, { ...job, active: !job.active });
    loadJobs();
  };

  const handleStartEdit = (job) => {
    setEditingId(job.id);
    setEditForm({ ...job });
  };

  const handleEditChange = (key, value) => {
    setEditForm({ ...editForm, [key]: value });
  };

  const handleSaveEdit = async () => {
    await updateJob(editingId, editForm);
    setEditingId(null);
    loadJobs();
  };

  const filteredJobs = jobs
    .filter((job) => job.title?.toLowerCase().includes(search.toLowerCase()))
    .filter((job) => (filterType === "All" ? true : job.type === filterType))
    .filter((job) =>
      filterStatus === "All"
        ? true
        : (job.active ? "Active" : "Inactive") === filterStatus
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-purple-900">View All Job Posts</h1>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
            onClick={() => navigate("/create")}
          >
            ← Back to Dashboard
          </button>
        </div>

        <div className="w-full mb-6">
          <input
            type="text"
            placeholder="🔍 Search Jobs"
            className="w-full px-4 py-2 rounded border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-6">
          <div className="w-64 bg-white rounded-xl shadow p-4 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-600 mb-2">Filter by Type</h3>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full border rounded px-2 py-1"
              >
                <option value="All">All</option>
                <option value="Full time">Full time</option>
                <option value="Part time">Part time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-600 mb-2">Filter by Status</h3>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full border rounded px-2 py-1"
              >
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredJobs.length === 0 ? (
              <div className="text-gray-500 col-span-full">No matching jobs found.</div>
            ) : (
              filteredJobs.map((job) => {
                const isEditing = editingId === job.id;
                return (
                  <div
                    key={job.id}
                    className="bg-white rounded-xl shadow hover:shadow-lg p-5 flex flex-col justify-between"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-28 h-28 bg-gray-100 rounded overflow-hidden shadow">
                        {isEditing ? (
                       <input
                         type="text"
                         className="w-full text-xs p-1"
                              placeholder="Logo URL"
                         value={editForm.logoUrl || ""}
                      onChange={(e) => handleEditChange("logoUrl", e.target.value)}
                          />
                     ) : job.logoUrl ? (
                 <img src={job.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                     ) : (
                  <span className="text-gray-400 flex items-center justify-center w-full h-full text-xs">
               No Logo
                </span>
               )}
                      </div>
                      <div className="flex-1">
                        {isEditing ? (
                          <>
                            <input
                              className="border w-full mb-1 px-2 py-1 rounded text-sm"
                              value={editForm.title}
                              onChange={(e) => handleEditChange("title", e.target.value)}
                              placeholder="Job Title"
                            />
                            <input
                              className="border w-full mb-1 px-2 py-1 rounded text-sm"
                              value={editForm.company || ""}
                              onChange={(e) => handleEditChange("company", e.target.value)}
                              placeholder="Company Name"
                            />
                            <input
                              className="border w-full mb-1 px-2 py-1 rounded text-sm"
                              value={editForm.stipend}
                              onChange={(e) => handleEditChange("stipend", e.target.value)}
                              placeholder="CTC"
                            />
                            <input
                              className="border w-full px-2 py-1 rounded text-sm"
                              value={editForm.location}
                              onChange={(e) => handleEditChange("location", e.target.value)}
                              placeholder="Location"
                            />
                          </>
                        ) : (
                          <>
                            <p className="text-lg font-bold text-purple-900">{job.company || "Company Name"}</p>
                            <h2 className="text-sm text-gray-600">{job.title || "Job Title"}</h2>
                            <p className="text-xs text-gray-500 mt-1">
                              ₹ CTC: {job.stipend || "N/A"} | {job.type || "Full time"} | {job.location || "N/A"}
                            </p>
                            <button
                              onClick={() => handleToggleActive(job)}
                              className={`inline-block text-xs px-2 py-0.5 mt-1 rounded cursor-pointer ${
                                job.active ? "bg-green-400 text-white" : "bg-gray-400 text-white"
                              }`}
                            >
                              {job.active ? "Active" : "Inactive"}
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex gap-2">
                        {isEditing ? (
                          <button
                            onClick={handleSaveEdit}
                            className="text-green-600 hover:underline text-sm"
                          >
                            💾 Save
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => handleStartEdit(job)}
                              className="text-yellow-500 hover:underline text-sm"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDelete(job.id)}
                              className="text-red-500 hover:underline text-sm"
                            >
                              🗑️ Delete
                            </button>
                          </>
                        )}
                      </div>
                      <button
                        onClick={() => navigate(`/jobs/${job.id}`)}
                        className="text-purple-600 hover:underline text-sm"
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
