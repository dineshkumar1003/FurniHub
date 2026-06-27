import axios from "axios";
const API = "https://furnihub-hlkx.onrender.com/api/products";
const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      "token"
    )}`
  }
});
const getAllProducts = async () => {
  const { data } = await axios.get(API);
  return data.products;
};
const getProduct = async (id) => {
  const { data } = await axios.get(
    `${API}/${id}`
  );
  return data;
};
const createProduct = async () => {
  const { data } = await axios.post(
    API,
    {},
    getConfig()
  );
  return data;
};
const updateProduct = async (id, product) => {
  const { data } = await axios.put(
    `${API}/${id}`,
    product,
    getConfig()
  );
  return data;
};
const deleteProduct = async (id) => {
  const { data } = await axios.delete(
    `${API}/${id}`,
    getConfig()
  );
  return data;
};
export {
  getProduct as a,
  createProduct as c,
  deleteProduct as d,
  getAllProducts as g,
  updateProduct as u
};
