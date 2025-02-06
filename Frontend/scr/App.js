import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [urls, setUrls] = useState([]);
  const [url, setUrl] = useState('');

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    const response = await axios.get('/api/urls');
    setUrls(response.data.urls);
  };

  const addUrl = async () => {
    await axios.post('/api/urls', { url });
    setUrl('');
    fetchUrls();
  };

  const deleteUrl = async (id) => {
    await axios.delete(`/api/urls/${id}`);
    fetchUrls();
  };

  return (
    <div>
      <h1>YouTube URL Manager</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter YouTube URL"
      />
      <button onClick={addUrl}>Add URL</button>
      <ul>
        {urls.map((url) => (
          <li key={url.id}>
            {url.url}
            <button onClick={() => deleteUrl(url.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
