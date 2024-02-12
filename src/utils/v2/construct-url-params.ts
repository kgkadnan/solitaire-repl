type IQueryDataValue = string | number | INestedQuery | INestedQuery[];

export interface IQueryData {
  [key: string]: IQueryDataValue;
}

interface INestedQuery {
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
        if (typeof item === 'object' && item !== null) {
          // Iterate over the keys of the object
          for (const subKey in item) {
            if (Object.prototype.hasOwnProperty.call(item, subKey)) {
              queryParams.push(`${prefix}[${subKey}]=${item[subKey]}`);
            }
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
        encodeNested(key, value as INestedQuery | INestedQuery[]);
      } else {
        queryParams.push(`${key}=${value}`);
      }
    }
  }

  const queryString = queryParams.join('&');
  return queryString;
}
