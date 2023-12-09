'use client';
import React, { useEffect, useState } from 'react';
import { MyDiamonds } from '@/components/common/my-diamonds/my-diamonds';
import { useGetProductDetailsQuery } from '@/features/api/my-diamonds/my-diamond';

const RecentConfirmation = ({ recentConfirmData }: any) => {
  // Define query parameters for API request
  const singleExpand = 'items.variant.product%2Citems.variant.prices';

  // State variables to manage data and UI state
  const [recentConfirmationDetail, setRecentConfirmationDetail] = useState([]);
  const [id, setId] = useState('');
  const recentConfirmationCheck = 'recent-confirmation';

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
    setRecentConfirmationDetail(productData?.order);
  }, [productData, recentConfirmationDetail]);

  // Function to handle clicking on a card and set the orderId
  const handleCardClick = (id: string) => {
    setId(id);
  };

  return (
    <MyDiamonds
      data={recentConfirmData}
      handleCardClick={handleCardClick}
      productPageDetail={recentConfirmationDetail}
      check={recentConfirmationCheck}
    />
  );
};

export default RecentConfirmation;
