export function formatNumberWithLeadingZeros(number: number) {
  const length = 6; // You can adjust this to the desired length
  return String(number).padStart(length, '0');
}
