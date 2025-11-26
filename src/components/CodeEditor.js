import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCode, setRoomId, setConnected, setSuggestion, setCursorPosition } from '../store/codeSlice';
import { wsService } from '../services/websocket';
import { api } from '../services/api';

const CodeEditor = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { code, connected, suggestion, language } = useSelector((state) => state.code);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [userId] = useState(() => 'user_' + Math.random().toString(36).substr(2, 9));
  const textareaRef = useRef(null);
  const suggestionTimeoutRef = useRef(null);

  useEffect(() => {
    dispatch(setRoomId(roomId));
    
    // Connect to WebSocket
    wsService.connect(
      roomId,
      handleWebSocketMessage,
      () => dispatch(setConnected(true)),
      () => dispatch(setConnected(false))
    );

    return () => {
      wsService.disconnect();
    };
  }, [roomId, dispatch]);

  const handleWebSocketMessage = (message) => {
    if (message.type === 'code_update' && message.userId !== userId) {
      dispatch(setCode(message.code));
    }
  };

  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    const cursorPos = e.target.selectionStart;
    
    dispatch(setCode(newCode));
    dispatch(setCursorPosition(cursorPos));

    // Send to WebSocket
    wsService.sendMessage({
      type: 'code_update',
      code: newCode,
      userId: userId,
      roomId: roomId
    });

    // Clear previous timeout
    if (suggestionTimeoutRef.current) {
      clearTimeout(suggestionTimeoutRef.current);
    }

    // Set new timeout for autocomplete
    suggestionTimeoutRef.current = setTimeout(() => {
      getAutocompleteSuggestion(newCode, cursorPos);
    }, 600);
  };

  const getAutocompleteSuggestion = async (code, cursorPosition) => {
    try {
      const response = await api.getAutocomplete(code, cursorPosition, language);
      if (response.suggestion) {
        dispatch(setSuggestion(response.suggestion));
        setShowSuggestion(true);
        setTimeout(() => setShowSuggestion(false), 3000);
      }
    } catch (error) {
      console.error('Error getting autocomplete:', error);
    }
  };

  const applySuggestion = () => {
    if (suggestion) {
      const newCode = code + suggestion;
      dispatch(setCode(newCode));
      wsService.sendMessage({
        type: 'code_update',
        code: newCode,
        userId: userId,
        roomId: roomId
      });
      setShowSuggestion(false);
    }
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button 
            className="button" 
            onClick={() => navigate('/')}
            style={{ padding: '8px 16px', fontSize: '14px' }}
          >
            ← Back
          </button>
          <div className="room-info">
            <h3>Room: {roomId}</h3>
          </div>
        </div>
        <div className="status">
          <div className={`status-dot ${connected ? '' : 'offline'}`}></div>
          <span>{connected ? 'Connected' : 'Disconnected'}</span>
        </div>
      </div>
      
      <div style={{ position: 'relative', flex: 1 }}>
        <textarea
          ref={textareaRef}
          className="code-editor"
          value={code}
          onChange={handleCodeChange}
          placeholder="Start coding... Your changes will be synced in real-time!"
          spellCheck={false}
        />
        
        {showSuggestion && suggestion && (
          <div 
            className="suggestion"
            style={{ 
              top: '50px', 
              left: '30px',
              cursor: 'pointer'
            }}
            onClick={applySuggestion}
          >
            💡 {suggestion} (click to apply)
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;