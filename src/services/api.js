import axios from "axios";

// Use environment variable for API URL
const API_BASE_URL = 'https://castolin-backend-host.vercel.app';

const api = axios.create({
    baseURL: API_BASE_URL,  // ✅ Uses your Vercel backend
    headers: {
        'Content-Type': 'application/json',
    },
});

console.log('Current API URL:', import.meta.env.VITE_API_URL);
// Should show: https://castolin-backend-host.vercel.app

// Add request interceptor for debugging
api.interceptors.request.use(
    config => {
        console.log('API Request:', {
            url: config.baseURL + config.url,
            method: config.method,
            data: config.data
        });
        return config;
    },
    error => Promise.reject(error)
);

// Add response interceptor for debugging
api.interceptors.response.use(
    response => {
        console.log('API Response:', {
            status: response.status,
            data: response.data
        });
        return response;
    },
    error => {
        console.error('API Error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        return Promise.reject(error);
    }
);

export default api;