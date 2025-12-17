import api from ".";

export const getUsers = async (page: number, limit: number, role?: string) => {
  const params: Record<string, string | number> = {
    _page: page,
    _limit: limit,
  };

  if (role) {
    params["role.name"] = role;
  }

  const response = await api.get("/users", { params });

  return {
    data: response.data,
    total: Number(response.headers["x-total-count"]),
  };
};
