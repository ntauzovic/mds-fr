import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Select } from "../Dropdown/Select";

import { getRoles } from "../../services/api/roles";
import { getCountries } from "../../services/api/countries";

import type { Role } from "../../types/roles";
import type { Country } from "../../types/counry";

import {
  sortOptions,
  orderOptions,
  rowsOptions,
} from "../../types/selectOptions";

export default function FilterBar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q") ?? "";
  const role = searchParams.get("role") ?? "";
  const countryId = searchParams.get("countryId") ?? "";
  const sort = searchParams.get("sort") ?? "";
  const order = searchParams.get("order") ?? "";
  const limit = Number(searchParams.get("limit") ?? 20);

  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });

  const { data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  return (
    <div className="mb-6 w-full rounded-2xl bg-white/95 p-6 shadow border border-white/60">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-wrap items-end gap-x-4 gap-y-4 flex-1">
          <div className="max-w-[310px] w-full ">
            <label className="mb-2 block text-xs font-semibold uppercase text-gray-600">
              Search
            </label>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const value = new FormData(e.currentTarget).get("q") as string;

                setSearchParams((prev) => {
                  const params = new URLSearchParams(prev);
                  params.set("q", value.trim());
                  params.set("page", "1");
                  return params;
                });
              }}
            >
              <input
                name="q"
                defaultValue={q}
                placeholder="Search users..."
                className="w-full rounded-lg border bg-white border-gray-300 px-4 py-3 text-sm focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none"
              />
            </form>
          </div>

          <div className="max-w-[220px] w-full">
            <label className="mb-2 block text-xs font-semibold uppercase text-gray-600">
              Country
            </label>
            <Select
              value={countryId}
              placeholder="All countries"
              options={[
                { label: "All countries", value: "" },
                ...(countries ?? []).map((c: Country) => ({
                  label: c.name,
                  value: c.id,
                })),
              ]}
              onChange={(value) => {
                const params = new URLSearchParams(searchParams);
                params.set("countryId", String(value));
                params.set("page", "1");
                setSearchParams(params);
              }}
            />
          </div>

          <div className="max-w-[220px] w-full">
            <label className="mb-2 block text-xs font-semibold uppercase text-gray-600">
              Role
            </label>
            <Select
              value={role}
              placeholder="All roles"
              options={[
                { label: "All roles", value: "" },
                ...(roles ?? []).map((r: Role) => ({
                  label: r.name,
                  value: r.name,
                })),
              ]}
              onChange={(value) => {
                const params = new URLSearchParams(searchParams);
                params.set("role", String(value));
                params.set("page", "1");
                setSearchParams(params);
              }}
            />
          </div>

          <div className="max-w-[220px] w-full">
            <label className="mb-2 block text-xs font-semibold uppercase text-gray-600">
              Sort by
            </label>
            <Select
              value={sort}
              placeholder="Default"
              options={sortOptions}
              onChange={(value) => {
                const params = new URLSearchParams(searchParams);
                params.set("sort", String(value));
                params.set("page", "1");
                setSearchParams(params);
              }}
            />
          </div>

          <div className="max-w-[220px] w-full">
            <label className="mb-2 block text-xs font-semibold uppercase text-gray-600">
              Order
            </label>
            <Select
              value={order}
              placeholder="Default"
              options={orderOptions}
              onChange={(value) => {
                const params = new URLSearchParams(searchParams);
                params.set("order", String(value));
                params.set("page", "1");
                setSearchParams(params);
              }}
            />
          </div>
        </div>

        <div className=" max-w-[100px] w-full">
          <label className="mb-2 block text-xs font-semibold uppercase text-gray-600">
            Rows
          </label>
          <Select
            value={limit}
            placeholder="20"
            options={rowsOptions}
            onChange={(value) => {
              const params = new URLSearchParams(searchParams);
              params.set("limit", String(value));
              params.set("page", "1");
              setSearchParams(params);
            }}
          />
        </div>
      </div>
    </div>
  );
}
