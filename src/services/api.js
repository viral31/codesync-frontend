import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const api = {
  createRoom: async () => {
    const response = await axios.post(`${API_BASE_URL}/rooms/`, {});
    return response.data.data; // Extract data from standardized response
  },

  getAutocomplete: async (code, cursorPosition, language) => {
    const response = await axios.post(`${API_BASE_URL}/autocomplete`, {
      code,
      cursorPosition,
      language,
    });
    return response.data.data; // Extract data from standardized response
  },
};