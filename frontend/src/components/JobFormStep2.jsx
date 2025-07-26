import { useState } from "react";

export default function JobFormStep2({ formData, setFormData }) {
  const [skillInput, setSkillInput] = useState("");
  const [techInput, setTechInput] = useState("");

  const addSkill = () => {
    if (skillInput.trim()) {
      setFormData({
        ...formData,
        skills: [...(formData.skills || []), skillInput.trim()],
      });
      setSkillInput("");
    }
  };

  const addTech = () => {
    if (techInput.trim()) {
      setFormData({
        ...formData,
        techStack: [...(formData.techStack || []), techInput.trim()],
      });
      setTechInput("");
    }
  };

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Requirements</h3>
      <div className="bg-white p-6 rounded shadow w-full max-w-6xl mx-auto">

        {/* Required Skills */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              className="input flex-1"
              placeholder="Enter skill"
            />
            <button type="button" onClick={addSkill} className="bg-blue-600 text-white px-3 rounded">+</button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {(formData.skills || []).map((skill, i) => (
              <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{skill}</span>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              className="input flex-1"
              placeholder="Enter tech stack"
            />
            <button type="button" onClick={addTech} className="bg-green-600 text-white px-3 rounded">+</button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {(formData.techStack || []).map((tech, i) => (
              <span key={i} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">{tech}</span>
            ))}
          </div>
        </div>

        {/* Academic Filters */}
        <h4 className="text-md font-semibold text-gray-800 mb-2">Academic Filters</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum CGPA</label>
            <select
              className="input w-full"
              value={formData.cgpa || ""}
              onChange={(e) => updateField("cgpa", e.target.value)}
            >
              <option value="">Select CGPA</option>
              {[...Array(101)].map((_, i) => {
                const val = (i / 10).toFixed(1);
                return <option key={val} value={val}>{val}</option>;
              })}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
            <select
              className="input w-full"
              value={formData.branch || ""}
              onChange={(e) => updateField("branch", e.target.value)}
            >
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
            </select>
          </div>

          <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Year of Study</label>
  <select
    className="input w-full"
    value={formData.year || ""}
    onChange={(e) => updateField("year", e.target.value)}
  >
    <option value="">Select Year</option>
    <option value="2021">2021</option>
    <option value="2022">2022</option>
    <option value="2023">2023</option>
    <option value="2024">2024</option>
    <option value="2025">2025</option>
    <option value="2026">2026</option>
    <option value="2027">2027</option>
    <option value="2028">2028</option>
  </select>
</div>

        </div>
      </div>
    </>
  );
}
