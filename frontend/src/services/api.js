import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API
export const authAPI = {
  login: (username, password) => {
    return api.post('/auth/login', { username, password });
  },
};

// Mahasiswa API
export const mahasiswaAPI = {
  getAll: () => {
    return api.get('/mahasiswa');
  },
  
  getById: (id) => {
    return api.get(`/mahasiswa/detail?id=${id}`);
  },
  
  search: (nama) => {
    return api.get(`/mahasiswa/search?nama=${nama}`);
  },
  
  create: (data) => {
    return api.post('/mahasiswa', data);
  },
  
  update: (id, data) => {
    return api.put(`/mahasiswa/${id}`, data);
  },
  
  delete: (id) => {
    return api.delete(`/mahasiswa/${id}`);
  },
};

// Jurusan API
export const jurusanAPI = {
  getAll: () => {
    return api.get('/jurusan');
  },
  
  getById: (id) => {
    return api.get(`/jurusan/detail?id=${id}`);
  },
};

export default api;
