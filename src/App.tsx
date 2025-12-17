/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./services/api/users";
import type { User } from "./types/user";
import { UserTable } from "./components/tables/UserTable";
import FilterBar from "./components/Filter/FilterBar";
import { Pagination } from "./components/Pagination/pagination";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [searchParams] = useSearchParams();

  const role = searchParams.get("role") ?? "";
  const countryId = Number(searchParams.get("countryId"));
  const sort = searchParams.get("sort") ?? "";

  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 20);
  const order = searchParams.get("order") ?? "";

  console.log({ limit });

  const {
    data: usersResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users", page, limit, role, countryId, sort, order],
    queryFn: () => getUsers(page, limit, role, countryId, sort, order),
  });

  useEffect(() => {}, [limit]);

  console.log({ usersResponse });

  if (isLoading) return <p className="p-8 text-white">Loading...</p>;
  if (error) return <p className="p-8 text-white">Error loading users</p>;
  if (!usersResponse?.data) return null;

  return (
    <div
      className="
    min-h-screen
    bg-gradient-to-b
    from-sky-600
    via-sky-500
    to-white
    p-8
  "
    >
      <h1 className="ml-3 text-2xl font-semibold text-white/90">Users</h1>
      <Toaster position="top-right" />

      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-black/10 to-transparent" />

      <div className="relative z-10 mt-2">
        <FilterBar />

        <div className="mt-6">
          <UserTable users={usersResponse.data as User[]} />
          <Pagination totalUsers={usersResponse.total} rows={limit} />
        </div>
      </div>
    </div>
  );
}
