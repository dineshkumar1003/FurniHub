import axios from "axios";

const API =
  "http://localhost:5000/api/admin/dashboard";

export const getDashboardStats =
  async () => {
    const { data } =
      await axios.get(
        `${API}/stats`
      );

    return data;
  };