import axios from "axios";

const API =
  "http://localhost:5000/api/payment";

export const createPaymentOrder =
  async (amount: number) => {
    const token =
      localStorage.getItem("token");

    const { data } =
      await axios.post(
        `${API}/create-order`,
        { amount },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return data;
  };

export const verifyPayment =
  async (paymentData: any) => {
    const token =
      localStorage.getItem("token");

    const { data } =
      await axios.post(
        `${API}/verify`,
        paymentData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return data;
  };