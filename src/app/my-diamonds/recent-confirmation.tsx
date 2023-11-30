'use client';
import React, { useEffect, useState } from 'react';
import { MyDiamonds } from '@/components/common/my-diamonds/my-diamonds';
import { useGetAllRecentConfirmationQuery } from '@/features/api/my-diamonds/my-diamond';

const RecentConfirmation = ({ recentConfirmData }: any) => {
  // Define query parameters for API request
  let singleExpand = 'items.variant.product%2Citems.variant.prices';

  // State variables to manage data and UI state
  const [recentConfirmationDetail, setRecentConfirmationDetail] = useState([]);
  const [orderId, setOrderId] = useState('');
  let recentConfirmationCheck = 'recent-confirmation';

  // Fetch recent confirmation data using a API
  const { data: productData } = useGetAllRecentConfirmationQuery({
    orderId,
    singleExpand,
  });

  // useEffect to update recentConfirmationDetail when productData changes
  useEffect(() => {
    setRecentConfirmationDetail(productData?.order);
  }, [productData, recentConfirmationDetail]);

  // Function to handle clicking on a card and set the orderId
  let handleCardClick = (id: string) => {
    setOrderId(id);
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
