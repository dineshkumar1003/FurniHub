import axios from "axios";

const API =
  "http://localhost:5000/api/admin/users";

export const getUsers =
  async () => {
    const { data } =
      await axios.get(API);

    return data;
  };

export const updateUser =
  async (
    id: string,
    isAdmin: boolean
  ) => {
    const { data } =
      await axios.put(
        `${API}/${id}`,
        { isAdmin }
      );

    return data;
  };

export const deleteUser =
  async (id: string) => {
    const { data } =
      await axios.delete(
        `${API}/${id}`
      );

    return data;
  };