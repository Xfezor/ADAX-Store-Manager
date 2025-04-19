import axios from 'axios';

// Crear instancia de axios con configuración base
const axiosInstance = axios.create({
    baseURL: 'http://localhost/adx/ADAX-Store-Manager/'
});

// Agregar interceptor para requests
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Agregar interceptor para respuestas
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/iniciar_sesion';
        }
        return Promise.reject(error);
    }
);
export default axiosInstance;