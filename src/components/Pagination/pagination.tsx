interface PaginationProps {
  page: number;
  totalPages: number;
}

export function Pagination({ page }: PaginationProps) {
  return (
    <div className="mt-6 flex justify-center">
      <div
        className="
          flex items-center gap-2
          rounded-xl
          bg-white
          px-4 py-3
          shadow-lg
          border border-gray-100
        "
      >
        {/* Previous */}
        <button
          className="
            rounded-lg
            px-3 py-2
            text-sm font-medium
            text-gray-600
            hover:bg-gray-100
            disabled:opacity-40
            disabled:cursor-not-allowed
          "
        >
          Prev
        </button>

        {/* Pages */}
        {[1, 2, 3, 4, 5].map((p) => (
          <button
            key={p}
            className={`
              h-9 w-9
              rounded-lg
              text-sm font-medium
              transition
              ${
                p === page
                  ? "bg-red-600 text-white shadow"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            {p}
          </button>
        ))}

        {/* Next */}
        <button
          className="
            rounded-lg
            px-3 py-2
            text-sm font-medium
            text-gray-600
            hover:bg-gray-100
            disabled:opacity-40
            disabled:cursor-not-allowed
          "
        >
          Next
        </button>
      </div>
    </div>
  );
}
