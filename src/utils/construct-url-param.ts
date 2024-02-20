// type IQueryDataValue = string | number | INestedQuery | INestedQuery[] | string[];
type IQueryDataValue = any;

interface INestedQuery {
  [key: string]: IQueryDataValue;
}

export interface IQueryData {
  [key: string]: IQueryDataValue;
}

export function constructUrlParams(data: IQueryData): string {
  const queryParams: string[] = [];

  const encodeNested = (
    prefix: string,
    nestedData: INestedQuery | INestedQuery[]
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
        // Handle other arrays

        if (!value?.includes('All')) {
          value.forEach(item => {
            queryParams.push(`${key}[]=${item}`);
          });
        }
      } else if (typeof value === 'object') {
        // Handle nested objects
        encodeNested(key, value as INestedQuery | INestedQuery[]);
      } else {
        // Handle other types
        queryParams.push(`${key}=${value}`);
      }
    }
  }

  const queryString = queryParams.join('&');
  return queryString;
}
