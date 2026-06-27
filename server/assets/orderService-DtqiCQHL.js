import axios from "axios";
const API = "https://furnihub-hlkx.onrender.com/api/orders";
const getConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};
const createOrder = async (orderData) => {
  const { data } = await axios.post(
    API,
    orderData,
    getConfig()
  );
  return data;
};
const getOrderById = async (id) => {
  const { data } = await axios.get(
    `${API}/${id}`,
    getConfig()
  );
  return data;
};
export {
  createOrder as c,
  getOrderById as g
};
