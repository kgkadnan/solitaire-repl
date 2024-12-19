import { IBidValues } from '@/app/v2/bid-2-buy';

export const handleIncrementDiscount = (
  rowId: string,
  currentMaxBid: any,
  setBidError: React.Dispatch<React.SetStateAction<{}>>,
  setBidValues: React.Dispatch<React.SetStateAction<IBidValues>>
) => {
  // Retrieve the current_max_bid for the row from the rows data
  setBidError(prevError => {
    return {
      ...prevError,
      [rowId]: ''
    };
  });
  setBidValues((prevValues: any) => {
    const currentBidValue = prevValues[rowId];
    // If there's already a bid value for this row, increment it

    if (currentBidValue !== undefined && currentBidValue) {
      return {
        ...prevValues,
        [rowId]: (parseFloat(String(currentBidValue)) + 0.25).toFixed(2)
      };
    }
    // If no bid value for this row yet, start from current_max_bid and add 0.25
    else {
      return {
        ...prevValues,
        [rowId]: (Number(currentMaxBid) + 0.25).toFixed(2)
      };
    }
  });
};
