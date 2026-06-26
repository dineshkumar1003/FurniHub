import axios from "axios";

const API =
  "https://furnihub-hlkx.onrender.com/api/admin/dashboard";

export const getDashboardStats =
  async () => {
    const { data } =
      await axios.get(
        `${API}/stats`
      );

    return data;
  };