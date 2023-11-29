'use client';
import React, { useEffect, useState } from 'react';
import { MyDiamonds } from '@/components/common/my-diamonds/my-diamonds';
import { useGetAllRecentConfirmationQuery } from '@/features/api/my-diamonds/my-diamond';

const RecentConfirmation = ({ recentConfirmData }: any) => {
  let singleExpand = 'items.variant.product%2Citems.variant.prices';

  const [recentConfirmationDetail, setRecentConfirmationDetail] = useState([]);
  const [orderId, setOrderId] = useState('');

  const { data: productData } = useGetAllRecentConfirmationQuery({
    orderId,
    singleExpand,
  });

  let recentConfirmationCheck = 'recent-confirmation';

  useEffect(() => {
    setRecentConfirmationDetail(productData?.order);
  }, [productData, recentConfirmationDetail]);

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
