import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchJobById, updateJob } from "../utils/api";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    async function loadJob() {
      const fetchedJob = await fetchJobById(id);
      setJob(fetchedJob);
      setFormData(fetchedJob || {});
    }
    loadJob();
  }, [id]);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-700 text-xl font-semibold">
        Job not found.
      </div>
    );
  }

  const handleSave = async () => {
    await updateJob(id, formData);
    setJob({ ...formData });
    setEditing(false);
  };

  const handleCancel = () => {
    setFormData(job);
    setEditing(false);
  };

  const updateField = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 px-4 py-10 flex justify-center items-start">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 space-y-6">
        <button
          onClick={() => navigate("/jobs")}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
        >
          ← Back to Job List
        </button>

        <div className="flex gap-6 items-start">
          <div className="flex-shrink-0 w-32 h-32 bg-gray-100 rounded shadow overflow-hidden">
            {job.logoUrl ? (
  <img src={job.logoUrl} alt="Logo" className="w-full h-full object-cover" />

            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No Logo
              </div>
            )}
          </div>

          <div className="flex-1">
            {editing ? (
              <>
                <input
                  className="input w-full mb-2"
                  value={formData.company || ""}
                  onChange={(e) => updateField("company", e.target.value)}
                  placeholder="Company"
                />
                <input
                  className="input w-full mb-2"
                  value={formData.title || ""}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="Job Title"
                />
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-purple-800 mb-1">
                  {job.company}
                </h2>
                <p className="text-gray-600">{job.title}</p>
              </>
            )}
          </div>

          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ["Description", "description"],
            ["Location", "location"],
            ["Stipend / CTC", "stipend"],
            ["Job Type", "jobType"],
            ["Duration", "duration"],
            ["Bond Details", "bond"],
            ["Work Mode", "workMode"],
            ["Required Skills", "skills"],
            ["Tech Stack", "techStack"],
            ["Minimum CGPA", "cgpa"],
            ["Branch", "branch"],
            ["Year of Study", "year"],
            ["College Name", "collegeName"],
            ["GEST-Qualified Only (Year)", "gestQualifiedYear"],
          ].map(([label, key]) => (
            <div key={key}>
              <p className="text-sm font-medium text-gray-700">{label}:</p>
              {editing ? (
                <input
                  className="input w-full"
                  value={formData[key] || ""}
                  onChange={(e) => updateField(key, e.target.value)}
                />
              ) : (
                <p className="text-gray-900">
                  {Array.isArray(job[key])
                    ? job[key].join(", ")
                    : job[key] || "N/A"}
                </p>
              )}
            </div>
          ))}
        </div>

        {editing && (
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
