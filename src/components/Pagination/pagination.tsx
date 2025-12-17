import { useSearchParams } from "react-router-dom";
import type { PaginationProps } from "../../types/paginationProps";

export function Pagination({ totalUsers, rows }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page") ?? 1);
  const totalPages = Math.ceil(totalUsers / rows);

  if (totalPages <= 1) return null;

  const start = Math.max(2, currentPage - 2);
  const end = Math.min(totalPages - 1, currentPage + 2);

  const goToPage = (p: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(p));
    params.set("limit", String(rows));
    setSearchParams(params);
  };

  return (
    <div className="mt-6 flex justify-center">
      <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow border">
        <button
          onClick={() => goToPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100 disabled:opacity-40"
        >
          Prev
        </button>

        <button
          onClick={() => goToPage(1)}
          className={`h-9 w-9 rounded-lg text-sm font-medium ${
            currentPage === 1
              ? "bg-red-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          1
        </button>

        {start > 2 && <span className="px-1 text-gray-400">…</span>}

        {Array.from({ length: end - start + 1 }, (_, i) => {
          const p = start + i;
          return (
            <button
              key={p}
              onClick={() => goToPage(p)}
              className={`h-9 w-9 rounded-lg text-sm font-medium ${
                p === currentPage
                  ? "bg-red-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          );
        })}

        {end < totalPages - 1 && <span className="px-1 text-gray-400">…</span>}

        <button
          onClick={() => goToPage(totalPages)}
          className={`h-9 w-9 rounded-lg text-sm font-medium ${
            currentPage === totalPages
              ? "bg-red-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {totalPages}
        </button>

        <button
          onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
