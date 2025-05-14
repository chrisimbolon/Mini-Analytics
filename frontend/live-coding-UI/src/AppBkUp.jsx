// frontend/live-coding-ui/src/App.jsx
import { useEffect, useState } from "react";
import { fetchAnalytics, postMockData } from "./services/api";

function App() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        await postMockData(); // simulate data
        const data = await fetchAnalytics();
        console.log("Fetched analytics:", data); 
        setAnalytics(data);
      } catch (err) {
        console.error("Failed to load analytics", err);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading) return <p>Loading analytics...</p>;

  if (!analytics) return <p>Failed to load analytics.</p>;

  return (
    <div>
      <h1>Analytics Dashboard</h1>
      <p>Total Events: {analytics.total_events}</p>
      <p>Average Session Time: {analytics.avg_session_time}</p>

      <h2>Top Pages</h2>
      <ul>
        {analytics.top_pages?.map((item, idx) => (
          <li key={idx}>
            {item.event_type} - {item.count}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


