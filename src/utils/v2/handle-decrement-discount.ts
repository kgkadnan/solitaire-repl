import { IBidValues } from '@/app/v2/bid-2-buy/page';

export const handleDecrementDiscount = (
  rowId: string,
  currentMaxBid: any,
  setBidError: React.Dispatch<React.SetStateAction<{}>>,
  setBidValues: React.Dispatch<React.SetStateAction<IBidValues>>
) => {
  setBidValues((prevValues: any) => {
    const currentBidValue = prevValues[rowId];
    // Calculate the new bid value
    const newBidValue =
      currentBidValue !== undefined && currentBidValue
        ? Number(currentBidValue) - 0.25
        : Number(currentMaxBid) - 0.25;

    // Check if the new bid value is less than or equal to currentMaxBid
    if (newBidValue >= currentMaxBid) {
      setBidError(prevError => {
        return {
          ...prevError,
          [rowId]: ''
        };
      });
      // Update the bid value
      return {
        ...prevValues,
        [rowId]: newBidValue.toFixed(2)
      };
    } else {
      setBidError(prevError => {
        return {
          ...prevError,
          [rowId]: 'Bid value cannot be less than current maximum bid.'
        };
      });
      // Set error because attempting to decrement below currentMaxBid

      return parseFloat(String(prevValues)).toFixed(2); // Return previous values without modification
    }
  });
};
