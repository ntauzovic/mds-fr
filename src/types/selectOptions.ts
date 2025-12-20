export const getSortOptions = (t: (key: string) => string) => [
  { label: t("select.option.sort"), value: "" },
  { label: t("select.option.sort.firtsName"), value: "lastName" },
  { label: t("select.option.sort.lastName"), value: "firstName" },
  { label: t("select.option.sort.email"), value: "email" },
];

export const getOrderOptions = (t: (key: string) => string) => [
  { label: t("select.option.order"), value: "" },
  { label: t("select.option.order.asc"), value: "asc" },
  { label: t("select.option.order.desc"), value: "desc" },
];

export const rowsOptions = [
  { label: "10", value: "10" },
  { label: "20", value: "20" },
  { label: "25", value: "25" },
  { label: "50", value: "50" },
];

interface Option {
  label: string;
  value: string | number;
}

export interface SelectProps {
  value?: string | number;
  options: Option[];
  placeholder?: string;
  onChange: (value: string | number) => void;
}
