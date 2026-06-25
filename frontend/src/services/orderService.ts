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

export const createOrder = async (
  orderData: any
) => {
  const { data } = await axios.post(
    API,
    orderData,
    getConfig()
  );

  return data;
};

export const getMyOrders = async () => {
  const { data } = await axios.get(
    `${API}/myorders`,
    getConfig()
  );

  return data;
};

export const getOrderById = async (
  id: string
) => {
  const { data } = await axios.get(
    `${API}/${id}`,
    getConfig()
  );

  return data;
};

export const updateOrderToPaid = async (
  id: string
) => {
  const { data } = await axios.put(
    `${API}/${id}/pay`,
    {},
    getConfig()
  );

  return data;
};


export const trackOrder = async (
  id: string
) => {
  const { data } = await axios.get(
    `${API}/${id}/track`,
    getConfig()
  );

  return data;
};