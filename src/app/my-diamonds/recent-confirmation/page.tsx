'use client';
import React, { useEffect, useState } from 'react';
import { MyDiamonds } from '@/components/common/my-diamonds/my-diamonds';
import {
  useCardRecentConfirmationQuery,
  useGetAllRecentConfirmationQuery,
} from '@/features/api/my-diamonds/my-diamond';

const RecentConfirmation = () => {
  let myDiamondStatus = 'pending';
  let fulfillmentStatus = 'not_fulfilled';
  let paymentStatus = 'awaiting';
  let fields = 'id,display_id,total';
  let expand = 'items';
  let singleExpand = 'items.variant.product%2Citems.variant.prices';

  const [recentConfirmData, setRecentConfirmData] = useState([]);
  const [recentConfirmationDetail, setRecentConfirmationDetail] = useState([]);
  const [orderId, setOrderId] = useState('');

  const { data: myDiamondrecentConfirmData } = useCardRecentConfirmationQuery({
    myDiamondStatus,
    fulfillmentStatus,
    paymentStatus,
    fields,
    expand,
  });

  useEffect(() => {
    setRecentConfirmData(myDiamondrecentConfirmData?.orders);
  }, [myDiamondrecentConfirmData]);

  const { data: productData } = useGetAllRecentConfirmationQuery({
    orderId,
    singleExpand,
  });

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
    />
  );
};

export default RecentConfirmation;
