import { useState } from "react";
import { Icon } from "../Icons/Icon";
import type { SelectProps } from "../../types/selectOptions";

export function Select({
  value,
  options = [],
  placeholder = "Select...",
  onChange,
}: SelectProps) {
  const [open, setOpen] = useState(false);

  const selected = options.find((o) => String(o.value) === String(value));

  return (
    <div tabIndex={0} onBlur={() => setOpen(false)} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="
          relative flex w-full items-center
          rounded-lg border border-gray-300 bg-white
          px-4 py-3 pr-10
          text-sm text-gray-900
          hover:border-gray-400
          focus:outline-none focus:ring-2 focus:ring-red-500
        "
      >
        <span className={selected ? "" : "text-gray-400"}>
          {selected?.label ?? placeholder}
        </span>

        <Icon
          name="angle-down"
          className="
    pointer-events-none
    absolute
    right-0.5
    top-7.5
    h-5.5 w-5.5
    -translate-y-1/2
    text-gray-600"
        />
      </button>

      {open && (
        <div
          className="
            absolute left-0 right-0 z-50 mt-2
            max-h-60 overflow-auto
            rounded-lg border border-gray-200 bg-white
            shadow-lg
          "
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`
                flex w-full px-4 py-2 text-sm text-left
                hover:bg-gray-100
                ${
                  String(option.value) === String(value)
                    ? "bg-red-50 text-red-600 font-medium"
                    : "text-gray-700"
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
