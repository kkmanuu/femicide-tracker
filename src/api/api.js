import axios from 'axios';

const API_URL = 'http://localhost:5000/api/'; // Adjust according to backend port and route

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});

// User Authentication
export const login = async (credentials) => {
  try {
    const { data } = await api.post('/auth/login', credentials);
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('currentUser', JSON.stringify(data));
    return data;
  } catch (error) {
    throw new Error(`Login failed: ${error.response?.data?.error || error.message}`);
  }
};

export const register = async (userData) => {
  try {
    const { data } = await api.post('/auth/register', userData);
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('currentUser', JSON.stringify(data));
    return data;
  } catch (error) {
    throw new Error(`Registration failed: ${error.response?.data?.error || error.message}`);
  }
};

// Femicides Data Operations
// Get Femicides
export const getFemicides = async () => {
  try {
    const { data } = await api.get('/femicides');
    return data;  // Ensure the response is in the correct format
  } catch (error) {
    throw new Error('Error fetching femicides: ' + error.response?.data?.error || error.message);
  }
};

// Add a new Femicide case
export const addFemicide = async (caseData) => {
  try {
    const token = localStorage.getItem('authToken');
    const { data } = await api.post('/cases', caseData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  } catch (error) {
    throw new Error(`Failed to add case: ${error.response?.data?.error || error.message}`);
  }
};

// Metadata for forms
export const getMetadata = async () => {
  try {
    const { data } = await api.get('/metadata');
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch metadata: ${error.response?.data?.error || error.message}`);
  }
};


// Utility functions
export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUser');
};

export const checkAuth = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  return { isAuthenticated: !!user, user };
};
