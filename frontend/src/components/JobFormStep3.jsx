import { useState } from "react";

export default function JobFormStep3({ formData, setFormData }) {
  const [visibility, setVisibility] = useState(formData.visibility || "open");
  const [collegeName, setCollegeName] = useState(formData.collegeName || "");
  const [gestQualifiedYear, setGestQualifiedYear] = useState(formData.gestQualifiedYear || "");

  const updateVisibility = (value) => {
    setVisibility(value);
    setFormData({ ...formData, visibility: value });
  };

  const handleCollegeChange = (e) => {
    setCollegeName(e.target.value);
    setFormData({ ...formData, collegeName: e.target.value });
  };

  const handleGestYearChange = (e) => {
    setGestQualifiedYear(e.target.value);
    setFormData({ ...formData, gestQualifiedYear: e.target.value });
  };

  return (
    <>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Visibility & Filters</h3>
      <div className="bg-white p-6 rounded shadow space-y-6">

        {/* Posting Visibility */}
        <div>
          <h4 className="text-md font-bold mb-2">Posting Visibility</h4>

          {/* Option 1: Open to all */}
          <div className="border rounded p-4 mb-4">
            <label className="flex items-start space-x-3">
              <input
                type="radio"
                name="visibility"
                value="open"
                checked={visibility === "open"}
                onChange={() => updateVisibility("open")}
                className="mt-1"
              />
              <div>
                <span className="font-medium text-gray-800">Open to all students</span>
                <p className="text-sm text-gray-600">
                  Job posting will be visible to all students on the platform.
                </p>
              </div>
            </label>
          </div>

          {/* Option 2: Filtered colleges */}
          <div className="border rounded p-4 mb-4">
            <label className="flex items-start space-x-3">
              <input
                type="radio"
                name="visibility"
                value="filtered"
                checked={visibility === "filtered"}
                onChange={() => updateVisibility("filtered")}
                className="mt-1"
              />
              <div>
                <span className="font-medium text-gray-800">Filtered Colleges</span>
                <p className="text-sm text-gray-600">
                  Specify which colleges can view and apply to this posting.
                </p>
              </div>
            </label>
            {visibility === "filtered" && (
              <select
                className="input mt-3 w-full"
                value={collegeName}
                onChange={handleCollegeChange}
              >
                <option value="">Select College</option>
                <option value="ABC Institute of Technology">ABC Institute of Technology</option>
                <option value="XYZ University">XYZ University</option>
                <option value="DEF College of Engineering">DEF College of Engineering</option>
              </select>
            )}
          </div>

          {/* Option 3: GEST Qualified Only */}
          <div className="border rounded p-4">
            <label className="flex items-start space-x-3">
              <input
                type="radio"
                name="visibility"
                value="gest"
                checked={visibility === "gest"}
                onChange={() => updateVisibility("gest")}
                className="mt-1"
              />
              <div>
                <span className="font-medium text-gray-800">GEST-qualified only</span>
                <p className="text-sm text-gray-600">
                  Only students who have passed the GEST qualification can apply.
                </p>
              </div>
            </label>
            {visibility === "gest" && (
              <select
                className="input mt-3 w-full"
                value={gestQualifiedYear}
                onChange={handleGestYearChange}
              >
                <option value="">Select Qualification Year</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
            )}
          </div>
        </div>

        {/* Estimated Reach */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded shadow">
          <h5 className="text-blue-800 font-semibold mb-1">Estimated Reach</h5>
          <p className="text-sm text-blue-700">
            Based on your current filters and visibility settings, this posting will be visible to approximately <strong>2,500 students</strong> across <strong>15 institutions</strong>.
          </p>
        </div>
      </div>
    </>
  );
}
