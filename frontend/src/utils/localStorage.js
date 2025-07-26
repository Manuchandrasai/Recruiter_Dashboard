// // Save a new job to localStorage
// export function saveJob(job) {
//   const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
//   const jobWithId = {
//     ...job,
//     id: Date.now().toString(), // Unique ID
//     status: job.status || "Active" // Default status
//   };
//   jobs.push(jobWithId);
//   localStorage.setItem("jobs", JSON.stringify(jobs));
// }

// // Get all jobs
// export function getJobs() {
//   return JSON.parse(localStorage.getItem("jobs")) || [];
// }

// // Get job by ID
// export function getJobById(id) {
//   const jobs = getJobs();
//   return jobs.find((job) => job.id === id);
// }

// // Delete job by ID
// export function deleteJobById(id) {
//   const jobs = getJobs();
//   const filtered = jobs.filter((job) => job.id !== id);
//   localStorage.setItem("jobs", JSON.stringify(filtered));
// }

// // Update job by ID
// export function updateJobById(id, updatedData) {
//   const jobs = getJobs();
//   const newJobs = jobs.map((job) =>
//     job.id === id ? { ...job, ...updatedData } : job
//   );
//   localStorage.setItem("jobs", JSON.stringify(newJobs));
// }
