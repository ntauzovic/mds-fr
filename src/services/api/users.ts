import api from ".";

export const getUsers = async (
  page: number,
  limit: number,
  role?: string,
  countryId?: number,
  sort?: string,
  order?: string
) => {
  const params: Record<string, string | number> = {
    _page: page,
    _limit: limit,
  };

  if (role) {
    params["role.name"] = role;
  }

  if (countryId) {
    params["country.id"] = countryId;
  }
  if (sort) {
    params["_sort"] = sort;
  }
  if (order) {
    params["_order"] = order;
  }

  const response = await api.get("/users", { params });

  return {
    data: response.data,
    total: Number(response.headers["x-total-count"]),
  };
};
