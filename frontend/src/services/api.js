
const API_BASE = "http://localhost:8000";
// Inside frontend/src/api.ts or wherever you're fetching
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const fetchAnalytics = async () => {
  const res = await fetch(`${API_BASE}/analytics`);
  return res.json();
};


export const postMockData = async () => {
  await fetch(`${API_BASE}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_type: "page_view",
      session_id: "session_" + Math.floor(Math.random() * 1000),
      page:"home",
      user_id: "user_" + Math.floor(Math.random() * 1000),
      session_duration: Math.floor(Math.random() * 300), // e.g., 0-5 minutes
      timestamp: new Date().toISOString(),
    }),
  });
};


// export const postMockData = async () => {
//   await fetch(`${API_BASE}/events`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       event_type: "page_view", 
//       user_id: "123",
//       timestamp: new Date().toISOString(),
//     }),
//   });
// };

