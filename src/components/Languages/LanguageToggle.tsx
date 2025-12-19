"use client";

import { useLanguage } from "../../hooks/useLanguage";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  const languages: { code: "en" | "sr"; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "sr", label: "SR" },
  ];

  return (
    <div className="flex items-center gap-2">
      {languages.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`
    relative px-3 py-1 text-sm font-bold transition-all
    ${
      lang === l.code
        ? "text-sky-900 bg-white rounded-md shadow underline underline-offset-4"
        : "text-white/70 hover:text-white"
    }
  `}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
