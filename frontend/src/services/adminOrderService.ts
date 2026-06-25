import axios from "axios";

const API = "http://localhost:5000/api/orders";

const getConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllOrders = async () => {
  const { data } = await axios.get(
    API,
    getConfig()
  );

  return data;
};

export const updateOrderStatus = async (
  id: string,
  orderStatus: string
) => {
  const { data } = await axios.put(
    `${API}/${id}/status`,
    { orderStatus },
    getConfig()
  );

  return data;
};