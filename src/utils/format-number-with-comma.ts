export const formatNumberWithCommas = (number: any): string => {
  // Convert the input to a number if it's not already one
  const validNumber =
    typeof number === 'number' && !isNaN(number) ? number : Number(number);

  // Handle cases where the input cannot be converted to a valid number
  if (isNaN(validNumber)) {
    return '0.00';
  }

  // Convert to string with 2 decimal places
  const fixedNumberString = validNumber.toFixed(2);

  // Split integer and fractional parts
  const [integerPart, fractionalPart] = fixedNumberString.split('.');

  // Format the integer part with commas
  const formattedIntegerPart = new Intl.NumberFormat().format(
    Number(integerPart)
  );

  // Return the formatted number with the fractional part
  return `${formattedIntegerPart}.${fractionalPart}`;
};
