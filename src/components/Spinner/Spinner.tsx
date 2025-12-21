import { useLanguage } from "../../hooks/useLanguage";

export default function Spinner() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
      <p className="text-sm text-gray-500">{t("spinner")}</p>
    </div>
  );
}
