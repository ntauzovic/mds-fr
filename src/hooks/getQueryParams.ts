export const getQueryParam = (key: string, defaultValue: number) => {
  const params = new URLSearchParams(window.location.search);
  const value = params.get(key);
  return value ? Number(value) : defaultValue;
};
