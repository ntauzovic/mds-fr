//GET http://localhost:1008/users?_page=1&_limit=20&_sort=lastName&_order=asc
// GET http://localhost:3001/users?_page=1&_limit=20

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
