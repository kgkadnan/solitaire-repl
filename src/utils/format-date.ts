// Function to format the created_at date
export const formatCreatedAt = (createdAt: Date) => {
  const createdAtDate = new Date(createdAt);

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  const formattedDate = dateFormatter?.format(createdAtDate);
  const formattedTime = timeFormatter?.format(createdAtDate);

  return `${formattedDate} | ${formattedTime}`;
};
