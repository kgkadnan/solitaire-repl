// Function to format the created_at date
export const formatCreatedAt = (createdAt: any) => {
  const createdAtDate = new Date(createdAt);

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const formattedDate = dateFormatter.format(createdAtDate);
  const formattedTime = timeFormatter.format(createdAtDate);

  return `${formattedDate} | ${formattedTime}`;
};
