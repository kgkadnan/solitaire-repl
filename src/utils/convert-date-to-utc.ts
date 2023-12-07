export const convertDateToUTC = (inputDate: Date, isEndOfDay = false) => {
  if (!inputDate) {
    return 'Invalid date format';
  }

  // Use provided date in UTC
  const utcDate = new Date(
    Date.UTC(
      inputDate.getFullYear(),
      inputDate.getMonth(),
      inputDate.getDate(),
      isEndOfDay ? 23 : 0, // Set hours to 0 for the start of the day, or 23 for the end of the day
      isEndOfDay ? 59 : 0, // Set minutes to 0 for the start of the day, or 59 for the end of the day
      isEndOfDay ? 59 : 0 // Set seconds to 0 for the start of the day, or 59 for the end of the day
    )
  );

  // Format the UTC date as a string
  const year = utcDate.getUTCFullYear();
  const month = String(utcDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(utcDate.getUTCDate()).padStart(2, '0');
  const hours = String(utcDate.getUTCHours()).padStart(2, '0');
  const minutes = String(utcDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(utcDate.getUTCSeconds()).padStart(2, '0');

  const utcDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;

  return utcDateString;
};
