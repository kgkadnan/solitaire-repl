// Function to format the created_at date
export const formatDate = (createdAt: Date) => {
  const createdAtDate = new Date(createdAt);

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const formattedDate = dateFormatter.format(createdAtDate);

  return `${formattedDate}`;
};
