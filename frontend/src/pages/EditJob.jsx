import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchJobById, updateJob } from '../utils/api';

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({});

  useEffect(() => {
    async function loadJob() {
      const found = await fetchJobById(id);
      setJob(found);
    }
    loadJob();
  }, [id]);

  const handleSave = async () => {
    await updateJob(id, job);
    alert('Job updated!');
    navigate('/jobs');
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-2xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Edit Job</h1>
        <input
          className="border p-2 w-full mb-4 rounded"
          value={job.title || ''}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
          placeholder="Job Title"
        />
        <button
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
