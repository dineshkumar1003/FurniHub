import axios from "axios";

export const googleLogin =
  async (
    token: string
  ) => {
    const { data } =
      await axios.post(
        "https://furnihub-hlkx.onrender.com/api/auth/google",
        { token }
      );

    return data;
  };