class WebSocketService {
  constructor() {
    this.ws = null;
    this.roomId = null;
    this.onMessage = null;
    this.onConnect = null;
    this.onDisconnect = null;
  }

  connect(roomId, onMessage, onConnect, onDisconnect) {
    this.roomId = roomId;
    this.onMessage = onMessage;
    this.onConnect = onConnect;
    this.onDisconnect = onDisconnect;

    const wsUrl = `${process.env.REACT_APP_WS_URL || 'ws://localhost:8000'}/ws/${roomId}`;
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      if (this.onConnect) this.onConnect();
    };

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (this.onMessage) this.onMessage(message);
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
      if (this.onDisconnect) this.onDisconnect();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  sendMessage(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export const wsService = new WebSocketService();