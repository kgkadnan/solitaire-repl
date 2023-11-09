export function constructUrlParams(data: any) {
  const params: string[] = [];

  for (const key in data) {
    if (Array.isArray(data[key])) {
      if (key === 'carat') {
        // If the key is 'carat', process as range values
        data[key].forEach((value: any) => {
          const [min, max] = value.split('-').map(Number);
          console.log('value', min, max);
          if (!isNaN(max))
            params.push(`${encodeURIComponent(key)}[lte]=${max}`);
          if (!isNaN(min))
            params.push(`${encodeURIComponent(key)}[gte]=${min}`);
        });
      } else {
        // For other array values, include them as individual parameters
        data[key].forEach((value: any) => {
          params.push(
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          );
        });
      }
    } else if (typeof data[key] === 'string' && data[key].includes('-')) {
      const [min, max] = data[key].split('-').map(Number);
      if (!isNaN(max)) params.push(`${encodeURIComponent(key)}[lte]=${max}`);
      if (!isNaN(min)) params.push(`${encodeURIComponent(key)}[gte]=${min}`);
    } else {
      params.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      );
    }
  }
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
  return params.join('&');
}
