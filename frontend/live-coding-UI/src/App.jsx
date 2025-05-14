import { useEffect, useState } from 'react';
import { fetchAnalytics, postMockData } from './services/api';

function App() {
  const [data, setData] = useState(null);

  const load = async () => setData(await fetchAnalytics());

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h1>Analytics Dashboard</h1>
      <button onClick={() => { postMockData().then(load); }}>Send Mock Event</button>
      {data && (
        <>
          <p>Total Events: {data.total_events}</p>
          <p>Top Pages:</p>
          <ul>
            {data.top_pages.map(([page, count]) => (
              <li key={page}>{page} ({count})</li>
            ))}
          </ul>
          <p>Avg. Session Time: {data.avg_session_time}s</p>
        </>
      )}
    </div>
  );
}

export default App;
