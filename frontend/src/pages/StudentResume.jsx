import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import students from "../data/students.json";

export default function StudentResume() {
  const { id } = useParams();
  const navigate = useNavigate();

  const student = students.find((s) => String(s.id) === id);

  if (!student)
    return <div className="text-red-600 p-8">No student data found.</div>;

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-gray-800 p-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline text-sm flex items-center"
      >
        ← Back to Dashboard
      </button>

      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <div className="flex items-center gap-4">
          <img
  src={student.profilePic}
  alt={student.name}
  className="w-16 h-16 rounded-full"
/>

          <div>
            <h1 className="text-2xl font-bold">{student.name}</h1>
            <p className="text-sm text-gray-500">Senior Frontend Developer</p>
            <p className="text-sm text-gray-500">{student.email} • 8 years experience</p>
          </div>
        </div>
        <div>
          <a
  href={`mailto:${student.email}`}
  className="bg-blue-500 text-white px-4 py-2 rounded mr-2 inline-block"
>
  Contact
        </a>
          <a
  href={`/resumes/${student.resume}`}
  download
  className="bg-gray-300 text-gray-800 px-4 py-2 rounded inline-block"
>
  Download Profile
</a>

        </div>
      </div>

      {/* 3 Column Top Section */}
      <div className="grid grid-cols-3 gap-6">
        {/* Resume */}
        <div className="bg-white p-6 rounded-xl shadow border-t-4 border-blue-500">
          <h2 className="font-semibold text-lg mb-4 text-blue-600">Resume</h2>
          <div className="h-48 border flex items-center justify-center text-gray-400">
            {student.resume || "Alex_Johnson_Resume.pdf"}
          </div>
          <div className="mt-4 flex justify-between">
            <a
  href={`/resumes/${student.resume}`}
  download
  className="bg-blue-500 text-white px-3 py-1 rounded inline-block"
>
  Download
</a>


           <button
  onClick={() => window.open(`/resumes/${student.resume}`, "_blank")}
  className="border px-3 py-1 rounded"
>
  Preview
</button>


          </div>
        </div>

        {/* GEST Scores */}
        <div className="bg-white p-6 rounded-xl shadow border-t-4 border-purple-500">
          <h2 className="font-semibold text-lg mb-4 text-purple-600">GEST Scores</h2>
          <p className="text-2xl font-bold">{student.score}/100</p>
          <p className="text-purple-500 text-sm mb-4">{student.percentileLabel}</p>
          <div className="space-y-3">
            {Object.entries(student.sections || {}).map(([k, v]) => (
              <div key={k}>
                <div className="flex justify-between text-sm">
                  <span>{k}</span>
                  <span>{v}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${v}%` }}
                  ></div>
                </div>
              </div>
            ))}
            <p className="text-xs text-purple-700 bg-purple-50 rounded p-2 mt-2">
              🧠 GEST (General Employment Suitability Test) measures cognitive abilities across multiple dimensions.
            </p>
          </div>
        </div>

        {/* Coding Portfolio */}
        <div className="bg-white p-6 rounded-xl shadow border-t-4 border-indigo-500">
          <h2 className="font-semibold text-lg mb-2 text-indigo-600">Coding Portfolio (TapTap)</h2>
          <p className="text-sm text-gray-500 mb-4">{student.portfolio?.summary}</p>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="py-1">Problem</th>
                <th>Difficulty</th>
                <th>Status</th>
                <th>Score</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {student.portfolio?.challenges?.map((item, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-2">{item.problem}</td>
                  <td>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.difficulty === "Easy"
                        ? "bg-green-100 text-green-800"
                        : item.difficulty === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {item.difficulty || "-"}
                    </span>
                  </td>
                  <td>
                    {item.status ? (
                      <span className="text-green-500 font-bold">✓</span>
                    ) : (
                      <span className="text-red-500 font-bold">✗</span>
                    )}
                  </td>
                  <td>{item.score ?? "-"}%</td>
                  <td>{item.time || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3 Column Bottom Section */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        {/* Certifications */}
        <div className="bg-white p-6 rounded-xl shadow border-t-4 border-green-500">
          <h2 className="font-semibold text-lg mb-4 text-green-600">Certifications</h2>
          <ul className="list-disc list-inside text-sm">
            {student.certifications?.map((cert, i) => (
              <li key={i}>{cert}</li>
            ))}
          </ul>
        </div>

        {/* Projects */}
        <div className="bg-white p-6 rounded-xl shadow border-t-4 border-yellow-500">
          <h2 className="font-semibold text-lg mb-4 text-yellow-600">Projects</h2>
          <ul className="list-disc list-inside text-sm">
            {student.projects?.map((proj, i) => (
              <li key={i}>{proj}</li>
            ))}
          </ul>
        </div>

        {/* Skills */}
        <div className="bg-white p-6 rounded-xl shadow border-t-4 border-pink-500">
          <h2 className="font-semibold text-lg mb-4 text-pink-600">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {Object.keys(student.skills || {}).map((skill, i) => (
              <span key={i} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
