import axios from 'axios';

const API_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});

// User Authentication
export const login = async (credentials) => {
  try {
    const { data: users } = await api.get(`/users?username=${encodeURIComponent(credentials.username)}`);
    const user = users[0];
    
    if (!user) throw new Error('User not found');
    if (user.password !== credentials.password) throw new Error('Incorrect password');
    
    localStorage.setItem('authToken', 'simulated-token');
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    return user;
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

export const register = async (userData) => {
  try {
    if (!userData.username || !userData.password) throw new Error('Username and password required');
    if (userData.password.length < 6) throw new Error('Password must be 6+ characters');
    if (userData.password !== userData.confirmPassword) throw new Error('Passwords do not match');

    const { data: existing } = await api.get(`/users?username=${encodeURIComponent(userData.username)}`);
    if (existing.length > 0) throw new Error('Username exists');

    const newUser = {
      id: Date.now(),
      username: userData.username,
      password: userData.password,
      name: userData.name || userData.username,
      createdAt: new Date().toISOString()
    };

    const { data: savedUser } = await api.post('/users', newUser);
    localStorage.setItem('authToken', 'simulated-token');
    localStorage.setItem('currentUser', JSON.stringify(savedUser));
    
    return savedUser;
  } catch (error) {
    throw new Error(`Registration failed: ${error.message}`);
  }
};

// Femicide Data Operations
export const getFemicides = async () => {
  try {
    const { data } = await api.get('/femicides');
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch cases: ${error.message}`);
  }
};

export const addFemicide = async (caseData, userId) => {
  try {
    const requiredFields = ['county', 'age', 'date', 'perpetrator', 'weapon'];
    const missingFields = requiredFields.filter(field => !caseData[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing fields: ${missingFields.join(', ')}`);
    }

    const newCase = {
      ...caseData,
      id: Date.now(),
      reportedBy: userId,
      createdAt: new Date().toISOString()
    };
    
    const { data } = await api.post('/femicides', newCase);
    return data;
  } catch (error) {
    throw new Error(`Failed to add case: ${error.message}`);
  }
};

// Metadata for forms
export const getMetadata = async () => {
  return {
    counties: ["Nairobi", "Mombasa", "Kisumu"],
    perpetrators: ["Partner", "Ex-partner", "Family member"],
    weapons: ["Knife", "Gun", "Blunt object"]
  };
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