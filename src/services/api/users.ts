import api from "../api";

export const getUsers = async (page: number, limit: number) => {
  const response = await api.get("/users", {
    params: {
      _page: page,
      _limit: limit,
    },
  });

  return {
    data: response.data,
    total: Number(response.headers["x-total-count"]),
  };
};
