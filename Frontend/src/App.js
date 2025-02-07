import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import placeholderImage from './assets/globoplay.jpeg';

function App() {
  const [urls, setUrls] = useState([]);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [playingUrl, setPlayingUrl] = useState('');
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    fetchUrls();
    fetchApiKey();
  }, []);

  const fetchUrls = async () => {
    const response = await axios.get('/urls');
    setUrls(response.data.urls);
  };

  const fetchApiKey = async () => {
    const response = await axios.get('/apikey');
    setApiKey(response.data.key);
  };

  const fetchVideoTitle = async (videoId) => {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`);
    return response.data.items[0].snippet.title;
  };

  const addUrl = async () => {
    const videoId = new URL(url).searchParams.get('v');
    if (videoId) {
      const videoTitle = await fetchVideoTitle(videoId);
      await axios.post('/urls', { url, title: videoTitle });
      setUrl('');
      setTitle('');
      fetchUrls();
    } else {
      alert('Por favor, forneça uma URL válida do YouTube.');
    }
  };

  const deleteUrl = async (id) => {
    if (window.confirm('Você realmente deseja deletar esta URL?')) {
      await axios.delete(`/urls/${id}`);
      fetchUrls();
    }
  };

  const playVideo = (url) => {
    setPlayingUrl(url);
  };

  return (
    <div className="container">
      <h1 className="main-title">Desafio - Globo</h1>
      <div className="input-container">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL do YouTube"
        />
        <button className="add-button" onClick={addUrl}>Adicionar</button>
      </div>
      <div className="iframe-container">
        {playingUrl ? (
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${new URL(playingUrl).searchParams.get("v")}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <img src={placeholderImage} alt="Quadro vazio" className="placeholder-image" />
        )}
      </div>
      <div className="url-list">
        <h2>Lista de URLs</h2>
        <ul>
          {urls.length > 0 ? (
            urls.map((url) => (
              <li key={url.id}>
                <div className="icon-container">
                  <div className="icon icon-fill" onClick={() => playVideo(url.url)} title="Reproduzir">
                    <i className="fas fa-play"></i>
                  </div>
                  <div className="icon icon-delete" onClick={() => deleteUrl(url.id)} title="Excluir">
                    <i className="fas fa-trash"></i>
                  </div>
                </div>
                {url.title}
              </li>
            ))
          ) : (
            <p>Nenhuma URL adicionada ainda.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
