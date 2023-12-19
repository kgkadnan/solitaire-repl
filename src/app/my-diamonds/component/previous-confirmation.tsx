'use client';

import { MyDiamonds } from '@/app/my-diamonds/component/my-diamond/my-diamonds';
import { useGetProductDetailsQuery } from '@/features/api/my-diamonds/my-diamond';
import React, { useEffect, useState } from 'react';
import { PreviousConfirmationProps } from '../interface/previous-confirmation-interface';

const PreviousConfirmation: React.FC<PreviousConfirmationProps> = ({
  previousConfirmData,
  setOffset,
  setLimit,
  limit,
  modalSetState
}) => {
  // Define query parameters for API request
  let singleExpand = 'items.variant.product%2Citems.variant.prices';

  // State variables to manage data and UI state
  const [previousConfirmationDetail, setPreviousConfirmationDetail] = useState(
    []
  );
  const [id, setId] = useState('');
  let previousConfirmation = 'previous-confirmations';

  // Fetch recent confirmation data using a API
  const { data: productData } = useGetProductDetailsQuery(
    {
      id,
      singleExpand
    },
    {
      skip: !id
    }
  );

  // useEffect to update recentConfirmationDetail when productData changes
  useEffect(() => {
    setPreviousConfirmationDetail(productData?.order);
  }, [productData, setPreviousConfirmationDetail]);

  // Function to handle clicking on a card and set the Invoice ID
  let handleCardClick = (id: string) => {
    setId(id);
  };

  return (
    <MyDiamonds
      data={previousConfirmData}
      handleCardClick={handleCardClick}
      productPageDetail={previousConfirmationDetail}
      check={previousConfirmation}
      setOffset={setOffset}
      setLimit={setLimit}
      limit={limit}
      modalSetState={modalSetState}
    />
  );
};

export default PreviousConfirmation;
