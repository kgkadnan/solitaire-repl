//Convert snake case string
export let formatCassing = (key: any) => {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char: any) => char.toUpperCase());
};
