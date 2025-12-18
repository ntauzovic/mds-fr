import { useEffect, useRef, useState } from "react";
import { Icon } from "../Icons/Icon";

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps {
  value?: string | number;
  options: Option[];
  placeholder?: string;
  onChange: (value: string | number) => void;
}

export function Select({
  value,
  options = [],
  placeholder = "Select...",
  onChange,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="
    relative
    flex w-full items-center
    rounded-lg border border-gray-300 bg-white
    px-4 py-3 pr-10
    text-sm text-gray-900
    hover:border-gray-400
    focus:outline-none focus:ring-2 focus:ring-red-500
  "
      >
        <span className={selected ? "" : "text-blck"}>
          {selected?.label ?? placeholder}
        </span>
        <Icon
          name="angle-down"
          className="
    pointer-events-none
    absolute
    right-2
    top-7.5
    h-5.5 w-5.5
    -translate-y-1/2
    text-gray-600
  "
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
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`
                flex w-full px-4 py-2 text-sm text-left
                hover:bg-gray-100
                ${
                  option.value === value
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
