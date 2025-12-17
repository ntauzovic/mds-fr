import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getRoles } from "../../services/api/roles";
import type { Role } from "../../types/roles";

export default function FilterBar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const limit = Number(searchParams.get("limit") ?? 20);

  const role = searchParams.get("role") ?? "";
  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: () => getRoles(),
  });
  return (
    <div
      className="
    mb-6
    w-full
    rounded-2xl
    bg-white/95
    backdrop-blur
    p-6
    shadow-[0_20px_40px_-15px_rgba(0,0,0,0.25)]
    border border-white/60
  "
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        {/* LEFT */}
        <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-end">
          {/* Search */}
          <div className="w-full lg:max-w-lg">
            <label className="mb-2 block text-xs font-semibold uppercase text-gray-600">
              Search
            </label>
            <input
              type="text"
              placeholder="Name or email"
              className="
                w-full rounded-lg
                border border-gray-300
                bg-white
                px-4 py-3
                text-sm text-gray-900
                placeholder:text-gray-400
                focus:border-red-600
                focus:ring-1 focus:ring-red-600
                focus:outline-none
              "
            />
          </div>

          <div className="w-full sm:w-48">
            <label className="mb-2 block text-xs font-semibold uppercase text-gray-600">
              Country
            </label>
            <select
              className="
                w-full rounded-lg
                border border-gray-300
                bg-white
                px-4 py-3
                text-sm text-gray-900
                focus:border-red-600
                focus:ring-1 focus:ring-red-600
                focus:outline-none
              "
            >
              <option>All countries</option>
            </select>
          </div>

          <div className="w-full sm:w-48">
            <label className="mb-2 block text-xs font-semibold uppercase text-gray-600">
              Roles
            </label>
            <select
              value={role}
              onChange={(e) => {
                const value = e.target.value;

                const params = new URLSearchParams(searchParams);

                if (value) {
                  params.set("role", value);
                } else {
                  params.delete("role");
                }

                params.set("page", "1");
                setSearchParams(params);
              }}
              className="
    w-full rounded-lg
    border border-gray-300
    bg-white
    px-4 py-3
    text-sm text-gray-900
    focus:border-red-600
    focus:ring-1 focus:ring-red-600
    focus:outline-none
  "
            >
              <option value="">All roles</option>

              {roles?.map((role: Role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-end gap-4">
          <div className="w-28">
            <label className="mb-2 block text-xs font-semibold uppercase text-gray-600">
              Rows
            </label>

            <select
              value={limit}
              onChange={(e) => {
                const newLimit = e.target.value;

                setSearchParams({
                  page: "1",
                  limit: newLimit,
                  role: role,
                });
              }}
              className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
