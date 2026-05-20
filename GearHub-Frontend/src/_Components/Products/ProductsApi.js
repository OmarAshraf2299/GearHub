import api from '../../utils/api';

export async function getProducts(search = "") {
  const url = search ? `/products?search=${encodeURIComponent(search)}` : '/products';
  
  const response = await api.get(url);
  // Unpack wrapping if backend structure provides { success, data }
  if (response && response.success !== undefined && response.data) {
    return response.data;
  }
  return response;
}

export async function getProductById(id) {
  const response = await api.get(`/products/${id}`);
  if (response && response.success !== undefined && response.data) {
    return response.data;
  }
  return response;
}