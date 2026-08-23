import axios from 'axios';
export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5029';

// Create an Axios instance with base URL pointing to the .NET backend
const api = axios.create({
  baseURL: `${API_BASE}/api`, // Uses env variable in production
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const getProduct = async (id: string | number) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (productData: any) => {
  const response = await api.post('/products', productData);
  return response.data;
};

export const updateProduct = async (id: number, productData: any) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const createOrder = async (orderData: any) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

export const verifyMobile = async (phone: string) => {
  const response = await api.post('/auth/verify-mobile', { phone });
  return response.data;
};

export const registerUser = async (userData: any) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const loginUser = async (credentials: any) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export default api;
