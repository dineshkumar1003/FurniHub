import axios from "axios";

const API_URL =
  "https://furnihub-hlkx.onrender.com/api/products";

export const getProducts =
  async () => {
    const { data } =
      await axios.get(API_URL);

    return data.products;
  };

export const getProductById =
  async (id: string) => {
    const { data } =
      await axios.get(
        `${API_URL}/${id}`
      );

    return data;
  };

export const getProductsByIds =
  async (ids: string[]) => {
    const products =
      await Promise.all(
        ids.map((id) =>
          getProductById(id)
        )
      );

    return products;
  };