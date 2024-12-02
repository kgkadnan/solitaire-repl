import { keyToSymbolWithoutAll, shape } from '@/constants/v2/form';

export function filterBidData(data:any, query:any) {
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
  const allAssetRequired = query.all_asset_required === true || query.all_asset_required === 'true';

  return data.filter((item:any) => {
    // If all_asset_required is true, show only eligible data
    if (allAssetRequired && !item.is_eligible) {
      return false;
    }

    // Check all properties from the query object
    for (const key in query) {
      if (skipKeys.includes(key) || key === 'all_asset_required') {
        continue;
      }

      // Check for shape key and handle 'All' case
      if (key === 'shape') {
        let shapes = query[key];

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

      if (typeof query[key] === 'object' && !Array.isArray(query[key])) {
        // Handle nested objects for lte/gte queries
        const conditions = query[key];
        for (const conditionKey in conditions) {
          const value = conditions[conditionKey];

          if (key === 'girdle') {
            // Special handling for girdle using girdleOrder
            const itemValue = item[key];
            const itemIndex = girdleOrder.indexOf(itemValue);
            const queryIndex = girdleOrder.indexOf(value);

            if (conditionKey === 'lte' && !(itemIndex <= queryIndex)) {
              return false;
            } else if (conditionKey === 'gte' && !(itemIndex >= queryIndex)) {
              return false;
            }
          } else {
            // General numeric lte/gte checks
            const itemValue = parseFloat(item[key]);

            if (conditionKey === 'lte' && !(itemValue <= parseFloat(value))) {
              return false;
            } else if (conditionKey === 'gte' && !(itemValue >= parseFloat(value))) {
              return false;
            }
          }
        }
      } else if (Array.isArray(query[key])) {
        if (key === 'key_to_symbol') {
          const searchType = query['key_to_symbol_search_type'];
          let symbols = query[key];

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
          const ranges = query[key];
          const itemValue = item[key];

          if (
            !ranges.some(range => {
              const [min, max] = range.split('-').map(parseFloat);
              return itemValue >= min && itemValue <= max;
            })
          ) {
            return false;
          }
        } else if (!query[key].includes(item[key])) {
          return false;
        }
      } else if (item[key] !== query[key]) {
        return false;
      }
    }
    return true;
  });
}