import { MyDiamonds } from '@/components/common/my-diamonds/my-diamonds';
import React from 'react';

const MyInvoices = () => {
  let data = [
    {
      invoiceNo: '987654321',
      trackOrder: 'Trace your order here',
      noOfStones: '8',
      payableAmount: '3150.50 $',
      created_at: '2023-11-24T07:22:50.354Z',
      paymentTerm: '14 Days',
      comment: '',
    },
    {
      invoiceNo: '123456789',
      trackOrder: 'Trace your order here',
      noOfStones: '3',
      payableAmount: '1500.75 $',
      created_at: '2023-11-24T07:22:50.354Z',
      paymentTerm: '10 Days',
      comment:
        'Nulla facilisi. Vestibulum auctor tortor vel elit scelerisque, ac aliquet turpis cursus.',
    },
    {
      invoiceNo: '456789012',
      trackOrder: 'Trace your order here',
      noOfStones: '6',
      payableAmount: '2480.25 $',
      created_at: '2023-11-24T07:22:50.354Z',
      paymentTerm: '21 Days',
      comment:
        'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
    },
    {
      invoiceNo: '789012345',
      trackOrder: 'Trace your order here',
      noOfStones: '4',
      payableAmount: '1800.00 $',
      created_at: '2023-11-24T07:22:50.354Z',
      paymentTerm: '7 Days',
      comment: 'Duis vel metus sit amet mi commodo tincidunt at nec libero.',
    },
    {
      invoiceNo: '345678901',
      trackOrder: 'Trace your order here',
      noOfStones: '2',
      payableAmount: '1200.50 $',
      created_at: '2023-11-24T07:22:50.354Z',
      paymentTerm: '5 Days',
      comment:
        'Suspendisse potenti. Vestibulum nec tortor eu orci fermentum congue ac vitae elit.',
    },
    {
      invoiceNo: '345678901',
      trackOrder: 'Trace your order here',
      noOfStones: '2',
      payableAmount: '1200.50 $',
      created_at: '2023-11-24T07:22:50.354Z',
      paymentTerm: '5 Days',
      comment:
        'Suspendisse potenti. Vestibulum nec tortor eu orci fermentum congue ac vitae elit.',
    },
    {
      invoiceNo: '345678901',
      trackOrder: 'Trace your order here',
      noOfStones: '2',
      payableAmount: '1200.50 $',
      created_at: '2023-11-24T07:22:50.354Z',
      paymentTerm: '5 Days',
      comment:
        'Suspendisse potenti. Vestibulum nec tortor eu orci fermentum congue ac vitae elit.',
    },
    {
      invoiceNo: '345678901',
      trackOrder: 'Trace your order here',
      noOfStones: '2',
      payableAmount: '1200.50 $',
      created_at: '2023-11-24T07:22:50.354Z',
      paymentTerm: '5 Days',
      comment:
        'Suspendisse potenti. Vestibulum nec tortor eu orci fermentum congue ac vitae elit.',
    },
    {
      invoiceNo: '345678901',
      trackOrder: 'Trace your order here',
      noOfStones: '2',
      payableAmount: '1200.50 $',
      created_at: '2023-11-24T07:22:50.354Z',
      paymentTerm: '5 Days',
      comment:
        'Suspendisse potenti. Vestibulum nec tortor eu orci fermentum congue ac vitae elit.',
    },
    {
      invoiceNo: '345678901',
      trackOrder: 'Trace your order here',
      noOfStones: '2',
      payableAmount: '1200.50 $',
      created_at: '2023-11-24T07:22:50.354Z',
      paymentTerm: '5 Days',
      comment:
        'Suspendisse potenti. Vestibulum nec tortor eu orci fermentum congue ac vitae elit.',
    },
    {
      invoiceNo: '345678901',
      trackOrder: 'Trace your order here',
      noOfStones: '2',
      payableAmount: '1200.50 $',
      created_at: '2023-11-24T07:22:50.354Z',
      paymentTerm: '5 Days',
      comment:
        'Suspendisse potenti. Vestibulum nec tortor eu orci fermentum congue ac vitae elit.',
    },
  ];

  return <MyDiamonds data={data} />;
};

export default MyInvoices;
