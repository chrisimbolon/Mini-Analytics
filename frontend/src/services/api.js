
// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

// const API_BASE = import.meta.env.VITE_API_URL || "/mini-analytics/api";
// Automatically switch between local and prod
const API_BASE =
  import.meta.env.PROD
    ? "https://chrisimbolon.dev/mini-analytics/api" // <-- HARD-CODED PROD URL
    : import.meta.env.VITE_API_URL || "http://localhost:8000"; // <-- LOCAL



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
      session_duration: Math.floor(Math.random() * 300), //  zero to 5 minutes
      timestamp: new Date().toISOString(),
    }),
  });
};

