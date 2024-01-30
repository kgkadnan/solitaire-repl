export const compareArrays = (arr1: string[], arr2: string[]) => {
  // Check if the lengths of the arrays are equal
  if (arr1.length !== arr2.length) {
    return false;
  }
  // Convert arrays to sets
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  // Compare sets
  for (const value of set1) {
    if (!set2.has(value)) {
      return false;
    }
  }
  // If the loop completes, sets are equal
  return true;
};
