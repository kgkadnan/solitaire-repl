import { MyDiamonds } from '@/components/common/my-diamonds/my-diamonds';
import React from 'react';

const PreviousConfirmation = () => {
  let data = [
    {
      invoiceNo: '987654321',
      noOfStones: '8',
      paidAmount: '3150.50 $',
      created_at: '2023-11-24T07:22:50.354Z',
      paymentTerm: '14 Days',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et justo vitae justo efficitur placerat.',
    },
    {
      invoiceNo: '123456789',
      noOfStones: '15',
      payableAmount: '1500.75 $',
      created_at: '2023-11-24T07:22:50.354Z',
      paymentTerm: '9 Days',
      comment:
        'Nulla facilisi. Vestibulum auctor tortor vel elit scelerisque, ac aliquet turpis cursus.',
    },
  ];

  return <MyDiamonds data={data} />;
};

export default PreviousConfirmation;
