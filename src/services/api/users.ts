//GET http://localhost:1008/users?_page=1&_limit=20&_sort=lastName&_order=asc
// GET http://localhost:3001/users?_page=1&_limit=20

import api from "../api/index";

export const getUsers = async (
  page: number,
  limit: number,
  sortBy?: string,
  order?: "asc" | "desc"
) => {
  const response = await api.get("/users", {
    params: {
      _page: page,
      _limit: limit,
      _sort: sortBy,
      _order: order,
    },
  });

  return response;
};
