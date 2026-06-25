import axios from "axios";

export const googleLogin =
  async (
    token: string
  ) => {
    const { data } =
      await axios.post(
        "http://localhost:5000/api/auth/google",
        { token }
      );

    return data;
  };