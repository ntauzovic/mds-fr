import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./services/api/users";
import type { User } from "./types/user";
import FilterBar from "./components/Filters/FilterBar";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LanguageToggle from "./components/Languages/LanguageToggle";
import Pagination from "./components/Pagination/Pagination";
import UserTable from "./components/Tables/UserTable";

export default function App() {
  const [searchParams] = useSearchParams();

  const role = searchParams.get("role") ?? "";
  const countryId = Number(searchParams.get("countryId"));
  const sort = searchParams.get("sort") ?? "";

  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 20);
  const order = searchParams.get("order") ?? "";
  const q = searchParams.get("q") ?? "";

  const {
    data: usersResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users", page, limit, role, countryId, sort, order, q],
    queryFn: () => getUsers(page, limit, role, countryId, sort, order, q),
  });

  useEffect(() => {}, [limit]);

  if (isLoading) return <p className="p-8 text-white">Loading...</p>;
  if (error) return <p className="p-8 text-white">Error loading users</p>;

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
      <div className="flex items-center justify-between pb-4">
        <h1 className="ml-3 text-2xl font-semibold text-white/90">Users</h1>

        <div className="relative z-20">
          <LanguageToggle />
        </div>
      </div>

      <Toaster position="top-right" />

      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-black/10 to-transparent" />

      <div className="relative z-10 mt-2">
        <FilterBar />

        <div className="mt-6">
          <UserTable users={usersResponse?.data as User[]} />

          {usersResponse && (
            <Pagination totalUsers={usersResponse.total} rows={limit} />
          )}
        </div>
      </div>
    </div>
  );
}
