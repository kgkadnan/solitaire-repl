type QueryDataValue = string | number | NestedQuery | NestedQuery[];

export interface QueryData {
  [key: string]: QueryDataValue;
}

interface NestedQuery {
  [key: string]: QueryDataValue;
}

export function constructUrlParams(data: QueryData): string {
  const queryParams: string[] = [];

  const encodeNested = (
    prefix: string,
    nestedData: NestedQuery | NestedQuery[]
  ) => {
    if (Array.isArray(nestedData)) {
      nestedData.forEach(item => {
        for (const subKey in item) {
          if (subKey in item) {
            queryParams.push(`${prefix}[${subKey}]=${item[subKey]}`);
          }
        }
      });
    } else {
      for (const subKey in nestedData) {
        if (subKey in nestedData) {
          queryParams.push(`${prefix}[${subKey}]=${nestedData[subKey]}`);
        }
      }
    }
  };

  for (const key in data) {
    if (key in data) {
      const value = data[key];

      if (Array.isArray(value)) {
        if (key === 'carat') {
          encodeNested(key, value); // Handle carat separately
          //test
        } else {
          value.forEach(item => {
            queryParams.push(`${key}[]=${item}`);
          });
        }
      } else if (typeof value === 'object') {
        encodeNested(key, value as NestedQuery | NestedQuery[]);
      } else {
        queryParams.push(`${key}=${value}`);
      }
    }
  }

  const queryString = queryParams.join('&');
  return queryString;
}
