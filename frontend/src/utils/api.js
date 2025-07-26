const API_BASE = "http://localhost:5056/api";

/**
 * AUTH
 */
export async function loginUser(credentials) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  return res.json();
}

export async function signupUser(credentials) {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Signup failed");
  }

  return res.json();
}

/**
 * JOBS
 */
export async function fetchJobs() {
  const res = await fetch(`${API_BASE}/jobs`);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
}

export async function fetchJobById(id) {
  const res = await fetch(`${API_BASE}/jobs/${id}`);
  if (!res.ok) throw new Error("Failed to fetch job");
  return res.json();
}

export async function createJob(jobData) {
  const res = await fetch(`${API_BASE}/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jobData),
  });
  if (!res.ok) throw new Error("Failed to create job");
  return res.json();
}

export async function updateJob(id, jobData) {
  const res = await fetch(`${API_BASE}/jobs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jobData),
  });
  if (!res.ok) throw new Error("Failed to update job");
  return res.json();
}



export async function deleteJob(id) {
  const res = await fetch(`${API_BASE}/jobs/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete job");
  return res.json();
}

/**
 * TEMPLATES
 */
export async function fetchTemplates() {
  const res = await fetch(`${API_BASE}/templates`);
  if (!res.ok) throw new Error("Failed to fetch templates");
  return res.json();
}

export async function createTemplate(data) {
  const res = await fetch(`${API_BASE}/templates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create template");
  return res.json();
}

export async function updateTemplate(id, data) {
  const res = await fetch(`${API_BASE}/templates/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update template");
  return res.json();
}

export async function deleteTemplate(id) {
  const res = await fetch(`${API_BASE}/templates/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete template");
  return res.json();
}

/**
 * TRIGGERS
 */
export async function fetchTriggers() {
  const res = await fetch("http://localhost:5056/api/triggers");
  if (!res.ok) throw new Error("Failed to fetch triggers");
  return await res.json(); // ✅ return parsed data
}

export async function saveTrigger(triggerData) {
  console.log("📤 API Call Payload:", triggerData);

  const response = await fetch("http://localhost:5056/api/triggers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(triggerData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("❌ Server Error Response:", errorText);
    throw new Error("Failed to save trigger");
  }

  return await response.json();
}





/**
 * NOTIFICATIONS
 */
export async function fetchNotifications() {
  const res = await fetch(`${API_BASE}/notifications`);
  if (!res.ok) throw new Error("Failed to fetch notifications");
  return res.json();
}

export async function saveNotification(data) {
  const res = await fetch(`${API_BASE}/notifications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to save notification");
  return res.json();
}
