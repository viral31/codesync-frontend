# CodeSync Frontend

A real-time collaborative code editor built with React that enables seamless pair programming with live code synchronization and AI-powered autocomplete suggestions.

🚀 **Live Demo**: [https://codesync-frontend-rho.vercel.app/](https://codesync-frontend-rho.vercel.app/)

## Features

- **Real-time Collaboration**: Multiple users can edit code simultaneously with instant synchronization
- **AI Autocomplete**: Intelligent code suggestions powered by AI
- **Room-based Sessions**: Create or join coding rooms with unique IDs
- **WebSocket Integration**: Low-latency real-time communication
- **Modern UI**: Clean, VS Code-inspired dark theme interface
- **Responsive Design**: Works seamlessly across different screen sizes

## Tech Stack

- **Frontend**: React 18, Redux Toolkit, React Router
- **Real-time Communication**: WebSocket
- **HTTP Client**: Axios
- **State Management**: Redux Toolkit
- **Styling**: CSS3 with modern design patterns
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running (for full functionality)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd codesync-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your backend URLs:
```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_WS_URL=ws://localhost:8000
```

4. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── Home.js          # Landing page with room creation/joining
│   └── CodeEditor.js    # Main collaborative editor component
├── services/
│   ├── api.js          # HTTP API service
│   └── websocket.js    # WebSocket service for real-time communication
├── store/
│   ├── store.js        # Redux store configuration
│   └── codeSlice.js    # Code state management
├── App.js              # Main app component with routing
├── index.js            # App entry point
└── index.css           # Global styles
```

## Usage

### Creating a Room
1. Visit the home page
2. Click "Create New Room"
3. Share the generated room ID with collaborators

### Joining a Room
1. Enter a room ID in the input field
2. Click "Join Room" or press Enter
3. Start coding collaboratively!

### Features in the Editor
- **Real-time Sync**: Code changes appear instantly for all users
- **AI Suggestions**: Wait 600ms after typing to see autocomplete suggestions
- **Connection Status**: Visual indicator shows connection state
- **Navigation**: Easy return to home page

## API Integration

The frontend communicates with a backend server through:

- **REST API**: Room creation and autocomplete requests
- **WebSocket**: Real-time code synchronization

### API Endpoints Used
- `POST /api/v1/rooms/` - Create room
- `POST /api/v1/autocomplete` - AI suggestions
- `ws://localhost:8000/api/v1/ws/{room_id}` - Real-time sync

## Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API base URL | `http://localhost:8000` |
| `REACT_APP_WS_URL` | WebSocket server URL | `ws://localhost:8000` |

## Deployment

The application is deployed on Vercel and automatically builds from the main branch.

### Manual Deployment
```bash
npm run build
# Deploy the build/ folder to your hosting service
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is licensed under the MIT License.

## Acknowledgments

- Built with Create React App
- Inspired by modern code editors like VS Code
- Uses WebSocket for real-time collaboration