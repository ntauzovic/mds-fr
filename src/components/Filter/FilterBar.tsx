import { getQueryParam } from "../../hooks/getQueryParams";

export default function FilterBar({ rows }: { rows?: number }) {
  console.log({ rows });
  const limit = getQueryParam("limit", rows || 20);
  console.log({ limit });

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

          {/* Country */}
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

          {/* Role */}
          <div className="w-full sm:w-48">
            <label className="mb-2 block text-xs font-semibold uppercase text-gray-600">
              Role
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
              <option>All roles</option>
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
              value={rows}
              onChange={(e) => {
                const newLimit = Number(e.target.value);

                const params = new URLSearchParams(window.location.search);
                params.set("limit", String(newLimit));
                params.set("page", "1"); // reset page

                window.history.pushState({}, "", `?${params.toString()}`);
              }}
              className="
    w-full rounded-lg
    border border-gray-300
    bg-white
    px-3 py-3
    text-sm text-gray-900
    focus:border-red-600
    focus:ring-1 focus:ring-red-600
    focus:outline-none
  "
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
