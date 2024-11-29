import { keyToSymbolWithoutAll, shape } from '@/constants/v2/form';

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

  // Extract all_asset_required from the query
  const allAssetRequired = query.all_asset_required === 'true';

  return data.filter(item => {
    // If all_asset_required is true, show only eligible data
    if (allAssetRequired && !item.is_eligible) {
      return false;
    }

    // Check all properties from the query object
    for (const key in query) {
      if (skipKeys.includes(key)) {
        continue;
      }

      // Check for shape key and handle 'All' case
      if (key === 'shape') {
        let shapes = query[key] as string[];

        if (shapes.includes('All')) {
          // Replace 'All' with all short_name values except 'All'
          shapes = shape
            .filter(s => s.short_name !== 'All')
            .map(s => s.short_name);
        }

        // Check if the item's shape is in the selected shapes
        if (!shapes.includes(item[key])) {
          return false;
        }
        continue; // Move to the next key
      }

      if (Array.isArray(query[key])) {
        if (key === 'key_to_symbol') {
          const searchType = query['key_to_symbol_search_type'] as string;
          let symbols = query[key] as string[];

          if (symbols[0] === 'All') {
            symbols = keyToSymbolWithoutAll;
          }

          if (searchType === 'contain') {
            if (
              !symbols.some(symbol => {
                return item[key].includes(symbol);
              })
            ) {
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
