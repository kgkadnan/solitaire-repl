// export function constructUrlParams(data: any) {
//   const params: string[] = [];

//   for (const key in data) {
//     if (Array.isArray(data[key])) {
//       if (key === 'carat') {
//         // If the key is 'carat', process as range values
//         data[key].forEach((value: any) => {
//           const [min, max] = value.split('-').map(Number);
//           if (!isNaN(max))
//             params.push(`${encodeURIComponent(key)}[lte]=${max}`);
//           if (!isNaN(min))
//             params.push(`${encodeURIComponent(key)}[gte]=${min}`);
//         });
//       } else {
//         // For other array values, include them as individual parameters
//         data[key].forEach((value: any) => {
//           params.push(
//             `${encodeURIComponent(key)}[]=${encodeURIComponent(value)}`
//           );
//         });
//       }
//     } else if (typeof data[key] === 'string' && data[key].includes('-')) {
//       const [min, max] = data[key].split('-').map(Number);
//       if (!isNaN(max)) params.push(`${encodeURIComponent(key)}[lte]=${max}`);
//       if (!isNaN(min)) params.push(`${encodeURIComponent(key)}[gte]=${min}`);
//     } else {
//       params.push(
//         `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
//       );
//     }
//   }
//   return params.join('&');
// }

type QueryData = {
  [key: string]:
    | string
    | string[]
    | Record<string, string | string[] | number[]>;
};

export function constructUrlParams(data: QueryData): string {
  let queryParams: string[] = [];

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      let value = data[key];

      if (Array.isArray(value)) {
        value.forEach((item) => {
          queryParams.push(`${key}[]=${item}`);
        });
      } else if (typeof value === 'object') {
        for (let subKey in value) {
          if (value.hasOwnProperty(subKey)) {
            if (Array.isArray(value[subKey])) {
              let subArray = value[subKey] as number[];
              subArray.forEach((subItem) => {
                queryParams.push(`${key}[${subKey}]=${subItem}`);
              });
            } else {
              queryParams.push(`${key}[${subKey}]=${value[subKey]}`);
            }
          }
        }
      } else {
        queryParams.push(`${key}=${value}`);
      }
    }
  }

  let queryString = queryParams.join('&');
  return queryString;
}
