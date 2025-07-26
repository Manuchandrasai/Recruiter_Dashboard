import React, { useEffect } from 'react';

export default function JobFormStep1({ formData, setFormData, onValidate }) {
  useEffect(() => {
    const required = ["title", "jobId", "description", "location", "stipend", "workMode"];
    const isValid =
      required.every((key) => formData[key]?.length > 0) &&
      Array.isArray(formData.jobType) &&
      formData.jobType.length > 0;
    onValidate?.(isValid);
  }, [formData]);

  const updateField = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Details</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-6 rounded shadow">

        {/* Row 1: Job Title + Job ID */}
        <div className="col-span-2">
          <label className="text-sm font-medium">Job Title*</label>
          <input
            className="input w-full"
            value={formData.title || ''}
            onChange={(e) => updateField("title", e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <label className="text-sm font-medium">Job ID*</label>
          <input
            className="input w-full"
            value={formData.jobId || ''}
            onChange={(e) => updateField("jobId", e.target.value)}
          />
        </div>

        {/* Row 2: Job Description */}
        <div className="col-span-4">
          <label className="text-sm font-medium">Job Description*</label>
          <textarea
            className="input w-full"
            rows={3}
            value={formData.description || ''}
            onChange={(e) => updateField("description", e.target.value)}
          />
        </div>

        {/* Row 3: Location + Stipend */}
        <div className="col-span-2">
          <label className="text-sm font-medium">Location*</label>
          <input
            className="input w-full"
            value={formData.location || ''}
            onChange={(e) => updateField("location", e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <label className="text-sm font-medium">Stipend / CTC*</label>
          <input
            className="input w-full"
            value={formData.stipend || ''}
            onChange={(e) => updateField("stipend", e.target.value)}
          />
        </div>

        {/* Row 4: Job Type, Duration, Bond, Work Mode */}
        {/* Job Type */}
        <div className="col-span-1">
          <label className="text-sm font-medium block mb-1">Job Type*</label>
          <div className="flex flex-wrap gap-2">
            {["Full-Time", "Internship", "Contract"].map((type) => (
              <button
                key={type}
                type="button"
                className={`px-2 py-1 text-sm rounded border ${
                  formData.jobType?.includes(type)
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
                onClick={() => {
                  const current = formData.jobType || [];
                  const updated = current.includes(type)
                    ? current.filter((t) => t !== type)
                    : [...current, type];
                  setFormData({ ...formData, jobType: updated });
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className="col-span-1">
          <label className="text-sm font-medium">Duration</label>
          <select
            className="input w-full"
            value={formData.duration || ''}
            onChange={(e) => updateField("duration", e.target.value)}
          >
            <option value="">Select</option>
            <option value="1 Month">1 Month</option>
            <option value="3 Months">3 Months</option>
            <option value="6 Months">6 Months</option>
            <option value="1 Year">1 Year</option>
          </select>
        </div>

        {/* Bond */}
        <div className="col-span-1">
          <label className="text-sm font-medium">Bond Details</label>
          <input
            className="input w-full"
            value={formData.bond || ''}
            onChange={(e) => updateField("bond", e.target.value)}
          />
        </div>

        {/* Work Mode */}
        <div className="col-span-1">
          <label className="text-sm font-medium block mb-1">Work Mode*</label>
          <div className="flex flex-wrap gap-2">
            {["On-site", "Remote", "Hybrid"].map((mode) => (
              <button
                key={mode}
                type="button"
                className={`px-2 py-1 text-sm rounded border ${
                  formData.workMode === mode
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
                onClick={() => updateField("workMode", mode)}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* NEW ROW: Logo URL */}
        <div className="col-span-4">
          <label className="text-sm font-medium">Logo URL (optional)</label>
          <input
            className="input w-full"
            placeholder="https://example.com/logo.png"
            value={formData.logo || ''}
            onChange={(e) => updateField("logo", e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
