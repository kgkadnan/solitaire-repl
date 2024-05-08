export function formatDateForMonth(dateStr: string) {
  const date = new Date(dateStr);
  const month = date.toLocaleString('default', { month: 'long' });
  return month;
}

export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const day = date.getDate();
  return day;
}

export function getTimeRange(isoTime: string): string {
  const date = new Date(isoTime);
  const end = new Date(date.getTime() + 30 * 60000); // Add 30 minutes in milliseconds
  const start = date;
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };

  const endTime = end.toLocaleTimeString('en-US', options);
  const startTime = start.toLocaleTimeString('en-US', options);

  return `${startTime} to ${endTime}`;
}

export function formatDateString(isoDate: string) {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
