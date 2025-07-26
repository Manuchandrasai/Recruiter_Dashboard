export default function JobCard({ job }) {
  return (
    <div className="border p-4 rounded shadow mb-4 bg-gradient-to-r from-white via-purple-50 to-purple-100">
      <h3 className="text-lg font-bold text-purple-800">{job.title}</h3>
      <p className="text-sm text-gray-600">{job.jobId}</p>
      <p className="mt-2 text-gray-700">{job.description}</p>
    </div>
  );
}