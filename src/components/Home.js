import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const Home = () => {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const createRoom = async () => {
    try {
      const response = await api.createRoom();
      navigate(`/room/${response.roomId}`);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  const joinRoom = () => {
    if (roomId.trim()) {
      navigate(`/room/${roomId}`);
    }
  };

  return (
    <div className="home-container">
      <h1>CodeSync</h1>
      <p>Real-time pair programming made simple</p>
      
      <div style={{ marginTop: '40px' }}>
        <button className="button" onClick={createRoom}>
          Create New Room
        </button>
        
        <div style={{ margin: '20px 0' }}>
          <input
            type="text"
            className="input"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && joinRoom()}
          />
          <button className="button" onClick={joinRoom}>
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;