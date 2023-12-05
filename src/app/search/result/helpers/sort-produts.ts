const customSortOrder = (orderArray: string[]) => (a: string, b: string) =>
  orderArray.indexOf(a) - orderArray.indexOf(b);

const customSortFunctions: Record<string, Function> = {
  table_inclusion: customSortOrder(['T0', 'T1', 'B1', 'T2', 'T3']),
  fluorescence: customSortOrder([
    'None',
    'Very Slight',
    'Slight',
    'Faint',
    'Medium',
    'Strong',
    'Very Strong',
  ]),
  side_black: customSortOrder(['SBO', 'SBPP', 'SB1', 'SB2', 'SB3']),
  black_table: customSortOrder(['BO', 'BPP', 'B1', 'B2', 'B3']),
  clarity: customSortOrder([
    'FL',
    'IF',
    'VVS1',
    'VVS2',
    'VS1',
    'VS2',
    'SI1',
    'SI2',
    'SI3',
    'I1',
    'I2',
    'I3',
  ]),
};

/**
 * Sorts an array of products based on a specified order and key.
 * @param {any[]} data - The array of products to sort.
 * @param {string} order - The order in which to sort the products ('low to high' or 'high to low').
 * @param {string} key - The key to use for sorting the products.
 * @returns {any[]} - The sorted array of products.
 */
export const sortProducts = (data: any, order: string, key: string) =>
  [...data].sort((a, b) => {
    console.log('customSortFunction');
    const customSortFunction = customSortFunctions[key];
    if (order === 'low to high' && customSortFunction) {
      return customSortFunction(a[key], b[key]);
    } else if (order === 'high to low' && customSortFunction) {
      return customSortFunction(b[key], a[key]);
    } else if (a[key] !== b[key]) {
      return order === 'low to high' ? a[key] - b[key] : b[key] - a[key];
    } else if (key === 'price') {
      return order === 'low to high'
        ? a?.variants[0]?.prices[0]?.amount - b?.variants[0]?.prices[0]?.amount
        : b?.variants[0]?.prices[0]?.amount - a?.variants[0]?.prices[0]?.amount;
    } else {
      return 0;
    }
  });
