import { IBidValues } from '@/app/v2/bid-2-buy/components/data-table';
export const handleDecrementDiscount = (
  rowId: string,
  currentMaxBid: any,
  setBidError: React.Dispatch<React.SetStateAction<string>>,
  setBidValues: React.Dispatch<React.SetStateAction<IBidValues>>
) => {
  setBidValues(prevValues => {
    const currentBidValue = prevValues[rowId];
    // Calculate the new bid value
    const newBidValue =
      currentBidValue !== undefined
        ? Number(currentBidValue) - 0.25
        : Number(currentMaxBid) - 0.25;

    // Check if the new bid value is less than or equal to currentMaxBid
    if (newBidValue >= currentMaxBid) {
      setBidError('');
      // Update the bid value
      return {
        ...prevValues,
        [rowId]: newBidValue
      };
    } else {
      // Set error because attempting to decrement below currentMaxBid
      setBidError('Bid value cannot be less than current maximum bid.');
      return prevValues; // Return previous values without modification
    }
  });
};
