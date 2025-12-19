import en from "./en.json";
import sr from "./sr.json";

export const languages = {
  en,
  sr,
};

export type Lang = keyof typeof languages;
