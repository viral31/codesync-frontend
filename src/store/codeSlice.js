import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  code: '',
  roomId: null,
  connected: false,
  suggestion: '',
  language: 'python',
  cursorPosition: 0,
};

export const codeSlice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    setCode: (state, action) => {
      state.code = action.payload;
    },
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
    setConnected: (state, action) => {
      state.connected = action.payload;
    },
    setSuggestion: (state, action) => {
      state.suggestion = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setCursorPosition: (state, action) => {
      state.cursorPosition = action.payload;
    },
  },
});

export const { setCode, setRoomId, setConnected, setSuggestion, setLanguage, setCursorPosition } = codeSlice.actions;

export default codeSlice.reducer;