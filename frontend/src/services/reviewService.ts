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

export const addReview = async (
  productId: string,
  rating: number,
  comment: string
) => {
  const { data } =
    await axios.post(
      `${API}/${productId}/reviews`,
      {
        rating,
        comment,
      },
      getConfig()
    );

  return data;
};