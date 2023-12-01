'use-client';
import { MyDiamonds } from '@/components/common/my-diamonds/my-diamonds';
import { useGetAllRecentConfirmationQuery } from '@/features/api/my-diamonds/my-diamond';
import React, { useEffect, useState } from 'react';

const MyInvoices = ({ myInvoiceData }: any) => {
  const [orderId, setOrderId] = useState('');
  const [myInvoiceDetail, setMyInvoiceDetail] = useState([]);
  // Define query parameters for API request
  let singleExpand = 'items.variant.product%2Citems.variant.prices';

  let myInvoices = 'my-invoices';

  // Fetch recent confirmation data using a API
  const { data: productData } = useGetAllRecentConfirmationQuery({
    orderId,
    singleExpand,
  });

  // useEffect to update recentConfirmationDetail when productData changes
  useEffect(() => {
    setMyInvoiceDetail(productData?.order);
  }, [productData, myInvoiceDetail]);

  let handleCardClick = (id: string) => {
    setOrderId(id);
  };
  return (
    <MyDiamonds
      data={myInvoiceData}
      handleCardClick={handleCardClick}
      productPageDetail={myInvoiceDetail}
      check={myInvoices}
    />
  );
};

export default MyInvoices;
