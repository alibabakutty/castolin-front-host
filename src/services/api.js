import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || 
  'https://castolin-backend-host.vercel.app';

console.log('Current API URL:', API_BASE_URL);

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Auto-add /api prefix to all requests
api.interceptors.request.use(
    config => {
        // Add /api prefix to all requests (except /api/health)
        if (config.url && !config.url.startsWith('/api/') && config.url !== '/') {
            config.url = '/api' + config.url;
        }
        
        console.log('API Request:', {
            fullUrl: config.baseURL + config.url,
            method: config.method
        });
        return config;
    },
    error => Promise.reject(error)
);

export default api;