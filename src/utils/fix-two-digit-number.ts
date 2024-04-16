export const formatNumber = (num: number) => {
  let numStr = num?.toString();

  // Check if the number has a decimal point
  if (!numStr?.includes('.')) {
    numStr += '.00'; // If not, append ".00"
  } else if (numStr?.split('.')[1].length === 1) {
    numStr += '0'; // If it has one decimal place, append a zero
  }

  // Use toFixed() to round the number to two decimal places
  let formattedNum = parseFloat(numStr)?.toFixed(2);

  return formattedNum;
};
