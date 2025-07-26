import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import studentsData from "../data/students.json";

const students = studentsData;

const ProgressBar = ({ value, max = 100, label }) => (
  <div className="mb-2">
    {label && (
      <div className="flex justify-between mb-1">
        <span className="text-purple-900 font-semibold">{label}</span>
        <span className="text-purple-500 font-semibold">
          {value}/{max}
        </span>
      </div>
    )}
    <div className="w-full bg-purple-100 rounded-full h-4 overflow-hidden">
      <div
        className="h-4 rounded-full bg-gradient-to-r from-purple-300 via-purple-400 to-purple-600 transition-all duration-700"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  </div>
);

export default function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.classList.remove("opacity-0", "translate-y-8");
      cardRef.current.classList.add("opacity-100", "translate-y-0");
    }
  }, [id]);

  const student = students.find((s) => String(s.id) === id);

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-700 font-bold">
        Student not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 py-10 px-4 flex justify-center items-start">
      <div
        ref={cardRef}
        className="w-full max-w-4xl bg-white/95 rounded-3xl shadow-2xl border border-purple-300 p-10 opacity-0 translate-y-8 transition-all duration-700"
      >
        {/* 🔙 Back Button */}
        <div className="mb-6">
          <button
            className="bg-purple-100 text-purple-800 font-bold py-2 px-6 rounded shadow hover:bg-purple-200 transition"
            onClick={() => navigate("/gest-scorecard")}
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* 1st line: Name & Resume */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="text-2xl font-extrabold text-purple-900 mb-1">
              {student.name}
            </div>
            <div className="text-purple-500">{student.email}</div>
          </div>
          <button
  onClick={() => navigate(`/student-resume/${student.id}`)}
  className="bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500 hover:from-purple-400 hover:to-purple-600 text-white font-bold py-2 px-6 rounded shadow transition"
>
  Resume
</button>
        </div>

        {/* 2nd line: GEST Overview & Percentile */}
        <div className="bg-purple-100/60 border border-purple-300 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-purple-900 mb-4">
            GEST Score Overview
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="font-semibold text-purple-500 mb-2">Overall Score</div>
              <ProgressBar value={student.score} max={100} />
            </div>

            <div>
              <div className="font-semibold text-purple-500 mb-2">Percentile Ranking</div>
              <div className="text-lg text-purple-900 font-bold">
                {student.percentileLabel}
              </div>
              <div className="text-sm text-purple-600">
                Better than {student.percentile}% of all test takers
              </div>
            </div>
          </div>
        </div>

        {/* 3rd line: Sectional & Skill-based Scores */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="font-semibold text-purple-500 mb-2">Sectional Scores</div>
            <div className="flex flex-col gap-2">
              {Object.entries(student.sections).map(([key, val]) => (
                <ProgressBar key={key} label={key} value={val} max={100} />
              ))}
            </div>
          </div>

          <div>
            <div className="font-semibold text-purple-500 mb-2">Skill-based Scores</div>
            <div className="flex flex-col gap-2">
              {student.skills ? (
                Object.entries(student.skills).map(([skill, score]) => (
                  <ProgressBar key={skill} label={skill} value={score} max={5} />
                ))
              ) : (
                <span className="text-purple-600">No skill-based scores available.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
