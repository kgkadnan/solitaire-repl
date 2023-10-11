export function constructUrlParams(data: any) {
  const params = [];

  for (const key in data) {
    if (Array.isArray(data[key])) {
      // Handle array values
      data[key].forEach((value: any) => {
        params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      });
    } else if (typeof data[key] === 'string' && data[key].includes('-')) {
      // Handle range values, e.g., '1-2'
      const [min, max] = data[key].split('-').map(Number);
      if (!isNaN(max)) params.push(`${encodeURIComponent(key)}[lte]=${max}`);
      if (!isNaN(min)) params.push(`${encodeURIComponent(key)}[gte]=${min}`);
    } else {
      params.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      );
    }
  }

  return params.join('&');
}
