import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [urls, setUrls] = useState([]);
  const [url, setUrl] = useState('');
  const [playingUrl, setPlayingUrl] = useState('');

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    const response = await axios.get('/urls');
    setUrls(response.data.urls);
  };

  const addUrl = async () => {
    await axios.post('/urls', { url });
    setUrl('');
    fetchUrls();
  };

  const deleteUrl = async (id) => {
    await axios.delete(`/urls/${id}`);
    fetchUrls();
  };

  return (
    <div>
      <h1>Desafio - YouTube URL Manager</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL do YouTube"
          style={{ marginRight: '10px' }}
        />
        <button onClick={addUrl}>Adicionar</button>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h2>Lista de URLs</h2>
        <ul>
          {urls.map((url) => (
            <li key={url.id}>
              {url.url}
              <button onClick={() => deleteUrl(url.id)} style={{ marginLeft: '10px' }}>Deletar</button>
              <button onClick={() => setPlayingUrl(url.url)} style={{ marginLeft: '10px' }}>Reproduzir Vídeo</button>
            </li>
          ))}
        </ul>
      </div>
      {playingUrl && (
        <div>
          <h2>Reproduzindo</h2>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${new URL(playingUrl).searchParams.get("v")}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default App;
