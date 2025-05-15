import { useEffect, useState } from "react";
import { fetchAnalytics, postMockData } from "./services/api";

function App() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadAnalytics = async () => {
    try {
      const data = await fetchAnalytics();
      console.log("Fetched analytics:", data);
      setAnalytics(data);
    } catch (err) {
      console.error("Failed to load analytics", err);
    }
  };

  useEffect(() => {
    const init = async () => {
      await postMockData(); // simulating on mount
      await loadAnalytics();
      setLoading(false);
    };

    init();
  }, []);

  // sending a new random mock event
  const sendMockEvent = async () => {
    await postMockData(); // re-use the existing function
    await loadAnalytics(); // refreshing UI
  };

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

      {/*  manually send a new event */}
      <button
        onClick={sendMockEvent}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#1e40af",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Send Mock Event
      </button>
    </div>
  );
}

export default App;
