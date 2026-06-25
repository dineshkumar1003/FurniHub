import axios from "axios";

const API =
  "http://localhost:5000/api/otp";

export const sendOtp = async (
  email: string
) => {
  const { data } =
    await axios.post(
      `${API}/send`,
      { email }
    );

  return data;
};

export const verifyOtp = async (
  email: string,
  otp: string
) => {
  const { data } =
    await axios.post(
      `${API}/verify`,
      {
        email,
        otp,
      }
    );

  return data;
}; 