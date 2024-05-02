export function formatDateForMonth(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'long' });
}

export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { day: 'numeric' });
}

export function getTimeRange(isoTime: string): string {
  const date = new Date(isoTime);
  const start = new Date(date.getTime() - 30 * 60000); // Subtract 30 minutes in milliseconds
  const end = date;
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };

  const startTime = start.toLocaleTimeString('en-US', options);
  const endTime = end.toLocaleTimeString('en-US', options);

  return `${startTime} to ${endTime}`;
}

export function formatDateString(isoDate: string) {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
