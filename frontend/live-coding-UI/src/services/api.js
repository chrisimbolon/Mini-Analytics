
const API_BASE = "http://localhost:8000";

export const fetchAnalytics = async () => {
  const res = await fetch(`${API_BASE}/analytics`);
  return res.json();
};

export const postMockData = async () => {
  await fetch(`${API_BASE}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: "123",
      page: "/home",
      duration: Math.random() * 300,
      timestamp: new Date().toISOString(),
    }),
  });
};
