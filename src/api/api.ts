import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;
export const createMenuApi = async (menuData: {
  name: string;
  description: string;
}) => {
  const response = await axios.post(`${api_url}/create-menu`, menuData);
  return response.data;
};

export const getAllMenusApi = async () => {
  const response = await axios.get(`${api_url}/get-all-menus`);
  return response.data;
};

export const addMenuItemApi = async (
  menuId: string,
  itemData: { name: string; description: string; price: number }
) => {
  const response = await axios.post(`${api_url}/${menuId}/items`, itemData);
  return response.data;
};
