export function filterBidData(data: any[], query: any): any[] {
  const skipKeys = ['key_to_symbol_search_type'];
  const girdleOrder = [
    'ETN',
    'VTN',
    'STN',
    'THN',
    'MED',
    'STK',
    'THK',
    'VTK',
    'ETK'
  ];

  return data.filter(item => {
    // Check all properties from the query object
    for (const key in query) {
      if (skipKeys.includes(key)) {
        continue;
      }
      if (Array.isArray(query[key])) {
        if (key === 'key_to_symbol') {
          const searchType = query['key_to_symbol_search_type'] as string;
          const symbols = query[key] as string[];

          if (searchType === 'contain') {
            if (!symbols.some(symbol => item[key].includes(symbol))) {
              return false;
            }
          } else if (searchType === 'doesNotContain') {
            if (symbols.some(symbol => item[key].includes(symbol))) {
              return false;
            }
          }
        } else if (key === 'carats') {
          const ranges = query[key] as string[];
          const itemValue = item[key] as number;

          if (
            !ranges.some(range => {
              const [min, max] = range.split('-').map(parseFloat);
              return itemValue >= min && itemValue <= max;
            })
          ) {
            return false;
          }
        } else if (!(query[key] as string[]).includes(item[key])) {
          return false;
        }
      } else if (key.includes('[') && key.includes(']')) {
        const [mainKey, condition] = key.split(/\[|\]/).filter(Boolean);
        const value = query[key] as string;

        if (mainKey === 'girdle') {
          const itemValue = item[mainKey] as string;
          const itemIndex = girdleOrder.indexOf(itemValue);
          const queryIndex = girdleOrder.indexOf(value);

          if (condition === 'lte' && !(itemIndex <= queryIndex)) {
            return false;
          } else if (condition === 'gte' && !(itemIndex >= queryIndex)) {
            return false;
          }
        } else {
          const itemValue = parseFloat(item[mainKey]);

          if (condition === 'lte' && !(itemValue <= parseFloat(value))) {
            return false;
          } else if (condition === 'gte' && !(itemValue >= parseFloat(value))) {
            return false;
          }
        }
      } else if (item[key] !== query[key]) {
        return false;
      }
    }
    return true;
  });
}
