import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Stepper from '../components/Stepper';
import JobFormStep1 from '../components/JobFormStep1';
import JobFormStep2 from '../components/JobFormStep2';
import JobFormStep3 from '../components/JobFormStep3';
import { createJob } from '../utils/api';
import { v4 as uuid } from 'uuid';

export default function CreateJob() {
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    id: uuid(),
    title: "",
    role: "",
    ctc: "",
    type: "",
    location: "",
    description: "",
    company: "",
    status: "Active",
    visibility: "open",
    collegeName: "",
    gestQualifiedYear: "",
    skills: [],
    techStack: [],
    cgpa: "",
    branch: "",
    year: "",
    bond: "",
    duration: "",
    stipend: "",
    jobType: "",
    workMode: ""
  });

  const [canProceed, setCanProceed] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
  if (!formData.title) {
    alert("Please enter a job title!");
    return;
  }

  const payload = {
    title: formData.title,
    company: formData.company,
    logoUrl: formData.logo || "",
    description: formData.description,
    location: formData.location,
    type: Array.isArray(formData.jobType) ? formData.jobType.join(',') : (formData.jobType || ""),
    stipend: formData.stipend,
    bond: formData.bond,
    workMode: formData.workMode,
    skills: Array.isArray(formData.skills) ? formData.skills.join(',') : (formData.skills || ""),
    techStack: Array.isArray(formData.techStack) ? formData.techStack.join(',') : (formData.techStack || ""),
    cgpa: formData.cgpa,
    branch: formData.branch,
    year: formData.year,
    collegeName: formData.collegeName,
    gestQualifiedYear: formData.gestQualifiedYear
  };

  console.log("📦 Payload:", payload);

  try {
    await createJob(payload);
    alert('Job posted successfully!');
    navigate('/jobs');
  } catch (error) {
    console.error("❌ Error creating job:", error);
    alert("Failed to create job. Check console for details.");
  }
};

  return (
    <div className="min-h-screen w-full px-4 py-6 bg-gradient-to-br from-purple-50 to-purple-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-11 w-11" />
            <h1 className="text-3xl font-extrabold text-purple-900">Recruiter Dashboard</h1>
          </div>
        </div>

        <div className="mx-auto w-full max-w-8xl bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white p-6">
            <h2 className="text-xl font-bold">Create New Job / Internship Posting</h2>
            <p className="text-sm mt-1 text-purple-100">Fill in the details to create a new opportunity</p>
          </div>

          <div className="p-6">
            <Stepper currentStep={step} />

            {step === 0 && (
              <JobFormStep1
                formData={formData}
                setFormData={setFormData}
                onValidate={(valid) => setCanProceed(valid)}
              />
            )}
            {step === 1 && (
              <JobFormStep2
                formData={formData}
                setFormData={setFormData}
              />
            )}
            {step === 2 && (
              <JobFormStep3
                formData={formData}
                setFormData={setFormData}
              />
            )}

            <div className="flex justify-between mt-6">
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Back
                </button>
              )}

              {step < 2 ? (
                <button
                  onClick={() => {
                    if (step === 0 && !canProceed) return;
                    setStep(step + 1);
                  }}
                  disabled={step === 0 && !canProceed}
                  className={`px-4 py-2 text-white rounded ${
                    step === 0 && !canProceed
                      ? 'bg-purple-300 cursor-not-allowed'
                      : 'bg-purple-600 hover:bg-purple-700'
                  }`}
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
