export function parseQueryString(queryString: string): any {
  const params = new URLSearchParams(queryString);
  const queryObject: any = {};

  for (const [key, value] of params.entries()) {
    if (key.endsWith('[]')) {
      const cleanKey = key.slice(0, -2);
      if (!queryObject[cleanKey]) {
        queryObject[cleanKey] = [];
      }
      (queryObject[cleanKey] as string[]).push(value);
    } else {
      queryObject[key] = value;
    }
  }

  return queryObject;
}
