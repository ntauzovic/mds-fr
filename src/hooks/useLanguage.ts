"use client";

import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { languages, type Lang } from "../i18n";

const LANG_KEY = "lang";

export function useLanguage() {
  const queryClient = useQueryClient();

  const { data: lang } = useQuery<Lang>({
    queryKey: [LANG_KEY],
    queryFn: () => {
      if (typeof window === "undefined") {
        return "en";
      }
      const stored = localStorage.getItem(LANG_KEY);
      return (stored as Lang) || "en";
    },
    initialData: "en",
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("lang", lang || "en");
    }
  }, [lang]);

  const setLang = (newLang: Lang) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LANG_KEY, newLang);
    }

    queryClient.setQueryData([LANG_KEY], newLang);
  };

  const t = (key: string): string => {
    const dictionary = languages[lang || "en"] as Record<string, string>;
    return dictionary[key] ?? key;
  };

  return { lang: lang || "en", setLang, t };
}
