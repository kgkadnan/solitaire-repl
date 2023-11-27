'use client';
import React, { useEffect, useState } from 'react';
import { MyDiamonds } from '@/components/common/my-diamonds/my-diamonds';
import {
  useCardRecentConfirmationQuery,
  useGetAllRecentConfirmationQuery,
} from '@/features/api/my-diamonds/recent-confirmation-slice';

const RecentConfirmation = () => {
  let myDiamondStatus = 'pending';
  let fulfillmentStatus = 'not_fulfilled';
  let paymentStatus = 'awaiting';
  let fields = 'id,display_id,total';
  let expand = 'items';
  let singleExpand = 'items.variant.product';

  const [recentConfirmData, setRecentConfirmData] = useState([]);
  const [orderId, setOrderId] = useState('');
  const {
    data: myDiamondrecentConfirmData,
    error,
    isLoading,
    refetch,
  } = useCardRecentConfirmationQuery({
    myDiamondStatus,
    fulfillmentStatus,
    paymentStatus,
    fields,
    expand,
  });

  useEffect(() => {
    setRecentConfirmData(myDiamondrecentConfirmData?.orders);
  }, [myDiamondrecentConfirmData]);

  let data = [
    {
      orderId: '987654321',
      noOfStones: '8',
      payableAmount: '3150.50 $',
      created_at: '2023-11-24T07:22:50.354Z',
      paymentTerm: '14 Days',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et justo vitae justo efficitur placerat.',
    },
    {
      orderId: '123456789',
      noOfStones: '3',
      payableAmount: '1500.75 $',
      created_at: '2023-11-24T07:22:50.354Z',
      paymentTerm: '10 Days',
      comment:
        'Nulla facilisi. Vestibulum auctor tortor vel elit scelerisque, ac aliquet turpis cursus.',
    },
    {
      orderId: '456789012',
      noOfStones: '6',
      payableAmount: '2480.25 $',
      created_at: '2023-11-24T07:22:50.354Z',
      paymentTerm: '21 Days',
      comment:
        'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
    },
  ];

  const { data: test } = useGetAllRecentConfirmationQuery({
    orderId,
    singleExpand,
  });
  console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', test);

  let handleCardClick = (id: string) => {
    setOrderId(id);
  };

  return (
    <MyDiamonds data={recentConfirmData} handleCardClick={handleCardClick} />
  );
};

export default RecentConfirmation;
