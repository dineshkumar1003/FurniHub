import axios from "axios";

const API =
  "http://localhost:5000/api/products";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      "token"
    )}`,
  },
});

export const getAllProducts =
  async () => {
    const { data } =
      await axios.get(API);

    return data.products;
  };

export const getProduct =
  async (id: string) => {
    const { data } =
      await axios.get(
        `${API}/${id}`
      );

    return data;
  };

export const createProduct =
  async () => {
    const { data } =
      await axios.post(
        API,
        {},
        getConfig()
      );

    return data;
  };

export const updateProduct =
  async (
    id: string,
    product: any
  ) => {
    const { data } =
      await axios.put(
        `${API}/${id}`,
        product,
        getConfig()
      );

    return data;
  };

export const deleteProduct =
  async (id: string) => {
    const { data } =
      await axios.delete(
        `${API}/${id}`,
        getConfig()
      );

    return data;
  };