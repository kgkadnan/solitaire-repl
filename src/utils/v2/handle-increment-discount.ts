import { IBidValues } from '@/app/v2/bid-2-buy/components/data-table';

export const handleIncrementDiscount = (
  rowId: string,
  currentMaxBid: any,
  setBidError: React.Dispatch<React.SetStateAction<string>>,
  setBidValues: React.Dispatch<React.SetStateAction<IBidValues>>
) => {
  // Retrieve the current_max_bid for the row from the rows data
  setBidError('');
  setBidValues(prevValues => {
    const currentBidValue = prevValues[rowId];
    // If there's already a bid value for this row, increment it
    if (currentBidValue !== undefined) {
      return {
        ...prevValues,
        [rowId]: Number(currentBidValue) + 0.5
      };
    }
    // If no bid value for this row yet, start from current_max_bid and add 0.5
    else {
      return {
        ...prevValues,
        [rowId]: Number(currentMaxBid) + 0.5
      };
    }
  });
};
