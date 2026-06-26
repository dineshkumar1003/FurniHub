import axios from "axios";

const API_URL = "https://furnihub-hlkx.onrender.com/api/cart";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      "token"
    )}`,
  },
});

export const getCart = async () => {
  const { data } = await axios.get(
    API_URL,
    getConfig()
  );

  return data;
};

export const addToCart = async (
  productId: string,
  qty = 1
) => {
  const { data } = await axios.post(
    API_URL,
    {
      productId,
      qty,
    },
    getConfig()
  );

  return data;
};

export const updateCartQty =
  async (
    productId: string,
    qty: number
  ) => {
    const { data } = await axios.put(
      `${API_URL}/${productId}`,
      { qty },
      getConfig()
    );

    return data;
  };

export const removeFromCart =
  async (productId: string) => {
    const { data } =
      await axios.delete(
        `${API_URL}/${productId}`,
        getConfig()
      );

    return data;
  };

export const clearCart =
  async () => {
    const { data } =
      await axios.delete(
        API_URL,
        getConfig()
      );

    return data;
  };

export const getCartTotals =
  async () => {
    const { data } =
      await axios.get(
        `${API_URL}/totals`,
        getConfig()
      );

    return data;
  };