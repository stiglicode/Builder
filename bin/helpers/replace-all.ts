export const replaceAll = (
  string: string,
  searchValue: string,
  replaceValue: string
): string => {
  return string.split(searchValue).join(replaceValue);
};
