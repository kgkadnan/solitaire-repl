//Convert snake case string
export const formatCassing = (key: string) => {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char: string) => char.toUpperCase());
};
