'use-client';
import { MyDiamonds } from '@/components/common/my-diamonds/my-diamonds';
import { useGetProductDetailsQuery } from '@/features/api/my-diamonds/my-diamond';
import React, { useEffect, useState } from 'react';

const MyInvoices = ({ myInvoiceData }: any) => {
  const [id, setId] = useState('');
  const [myInvoiceDetail, setMyInvoiceDetail] = useState([]);
  // Define query parameters for API request
  let singleExpand = 'items.variant.product%2Citems.variant.prices';

  let myInvoices = 'my-invoices';

  // Fetch recent confirmation data using a API
  const { data: productData } = useGetProductDetailsQuery({
    id,
    singleExpand,
  });

  // useEffect to update recentConfirmationDetail when productData changes
  useEffect(() => {
    setMyInvoiceDetail(productData?.order);
  }, [productData, myInvoiceDetail]);

  // Function to handle clicking on a card and set the Invoice ID
  let handleCardClick = (id: string) => {
    setId(id);
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
