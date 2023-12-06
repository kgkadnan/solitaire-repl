type QueryDataValue = string | number | NestedQuery | NestedQuery[];

export interface QueryData {
  [key: string]: QueryDataValue;
}

interface NestedQuery {
  [key: string]: QueryDataValue;
}

export function constructUrlParams(data: QueryData): string {
  let queryParams: string[] = [];

  const encodeNested = (
    prefix: string,
    nestedData: NestedQuery | NestedQuery[]
  ) => {
    if (Array.isArray(nestedData)) {
      nestedData.forEach(item => {
        for (let subKey in item) {
          if (item.hasOwnProperty(subKey)) {
            queryParams.push(`${prefix}[${subKey}]=${item[subKey]}`);
          }
        }
      });
    } else {
      for (let subKey in nestedData) {
        if (nestedData.hasOwnProperty(subKey)) {
          queryParams.push(`${prefix}[${subKey}]=${nestedData[subKey]}`);
        }
      }
    }
  };

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      let value = data[key];

      if (Array.isArray(value)) {
        if (key === 'carat') {
          encodeNested(key, value); // Handle carat separately
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

  let queryString = queryParams.join('&');
  return queryString;
}
