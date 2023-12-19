'use-client';
import { MyDiamonds } from '@/app/my-diamonds/component/my-diamond/my-diamonds';
import { useGetProductDetailsQuery } from '@/features/api/my-diamonds/my-diamond';
import React, { useEffect, useState } from 'react';
import { IMyInvoice } from '../interface/my-invoice-interface';
import { IModalSetState } from '@/app/search/result/result-interface';

const MyInvoices: React.FC<{
  myInvoiceData: IMyInvoice[];
  modalSetState: IModalSetState;
}> = ({ myInvoiceData, modalSetState }) => {
  const [id, setId] = useState('');
  const [myInvoiceDetail, setMyInvoiceDetail] = useState([]);
  // Define query parameters for API request
  let singleExpand = 'items.variant.product%2Citems.variant.prices';

  let myInvoices = 'my-invoices';

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
      modalSetState={modalSetState}
    />
  );
};

export default MyInvoices;
