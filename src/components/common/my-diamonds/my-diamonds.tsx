'use client';

import React from 'react';
import { CustomSlider } from '../slider';
import { ManageLocales } from '@/utils/translate';
import ChevronImage from '@public/assets/icons/chevron-forward-outline.svg';
import Image from 'next/image';
import styles from './my-diamonds.module.scss';
import { CustomFooter } from '../footer';
import { usePathname } from 'next/navigation';
import { formatCreatedAt } from '@/utils/format-date';
import { formatDate } from '@/utils/format-date-only';

export const MyDiamonds = ({ data, handleCardClick }: any) => {
  const router = usePathname();

  const myDiamondsFooter = [
    { id: 1, displayButtonLabel: 'Download Excel', style: styles.transparent },
    { id: 2, displayButtonLabel: 'Download Invoice', style: styles.filled },
  ];

  const renderFooterButtons = () => {
    if (router === '/my-diamonds/recent-confirmation') {
      return [
        <CustomFooter
          key={1}
          footerButtonData={[myDiamondsFooter[0]]}
          noBorderTop={styles.paginationContainerStyle}
        />,
      ];
    }
    // Render both buttons for other routes
    return (
      <CustomFooter
        footerButtonData={myDiamondsFooter}
        noBorderTop={styles.paginationContainerStyle}
      />
    );
  };
  return (
    <div className="mb-[50px] h-[70vh] overflow-auto">
      {data?.map((items: any) => {
        // console.log('items', items);

        return (
          <div key={items.id ? items.id : items.invoiceNo}>
            <CustomSlider
              sheetTriggerStyle="w-full"
              sheetTriggenContent={
                <div
                  className="bg-solitaireSecondary w-full h-[80px] flex items-center px-5 rounded-xl cursor-pointer mt-3"
                  onClick={() => handleCardClick(items.id)}
                >
                  <div className="flex justify-between w-full">
                    <div className="flex gap-[20px]">
                      <p>
                        {items.id ? 'Order ID: ' : 'Invoice No: '}
                        <span className="text-solitaireTertiary">
                          {items.id ? items.id.toUpperCase() : items.invoiceNo}
                        </span>
                      </p>
                      {items.trackOrder && (
                        <p>
                          Track Order:{' '}
                          <span className="text-solitaireTertiary">
                            {items.trackOrder}
                          </span>
                        </p>
                      )}
                      <p>
                        Date:{' '}
                        <span className="text-solitaireTertiary">
                          {formatDate(items.created_at)}
                        </span>
                      </p>
                    </div>
                    <div>
                      <Image src={ChevronImage} alt="chevron image" />
                    </div>
                  </div>
                </div>
              }
              sheetContentStyle={styles.sheetContentStyle}
              sheetContent={
                <>
                  <div className="border-b border-solitaireSenary h-[80px] flex items-center mb-5">
                    {router === '/my-diamonds/recent-confirmation' && (
                      <p>
                        {ManageLocales(
                          'app.myDiamonds.RecentConfirmations.recentConfirmationDetail'
                        )}
                      </p>
                    )}
                    {router === '/my-diamonds/my-invoices' && (
                      <p>
                        {ManageLocales(
                          'app.myDiamonds.myInvoice.myInvoiceDetail'
                        )}
                      </p>
                    )}
                    {router === '/my-diamonds/previous-confirmation' && (
                      <p>
                        {ManageLocales(
                          'app.myDiamonds.previousConfirmation.previousConfirmationDetail'
                        )}
                      </p>
                    )}
                  </div>

                  {/* <div className="flex border-b border-solitaireSenary h-[180px]">
                    <div className="w-[50%]">
                      <div className="flex mb-1">
                        <p className="w-[30%]">
                          {items.orderId ? 'Order ID : ' : 'Invoice Number : '}
                        </p>
                        <span className="text-solitaireTertiary">
                          {items.orderId ? items.orderId : items.invoiceNo}
                        </span>
                      </div>
                      <div className="flex mb-1">
                        <p className="w-[30%]">No. of Stones :</p>
                        <span className="text-solitaireTertiary">
                          {items.noOfStones}
                        </span>
                      </div>
                      {items.payableAmount && (
                        <div className="flex mb-1">
                          <p className="w-[30%]">Payable Amount :</p>
                          <span className="text-solitaireTertiary">
                            {items.payableAmount}
                          </span>
                        </div>
                      )}
                      {items.paidAmount && (
                        <div className="flex mb-1">
                          <p className="w-[30%]">Paid Amount :</p>
                          <span className="text-solitaireTertiary">
                            {items.paidAmount}
                          </span>
                        </div>
                      )}
                      {items.trackingId && (
                        <div className="flex mb-1">
                          <p className="w-[30%]">Tracking ID :</p>
                          <span className="text-solitaireTertiary">
                            {items.trackingId}
                          </span>
                        </div>
                      )}
                      {items.trackOrder && (
                        <div className="flex mb-1">
                          <p className="w-[30%]">Track Order :</p>
                          <span className="text-solitaireTertiary">
                            {items.trackOrder}
                          </span>
                        </div>
                      )}
                      <div className="flex mb-1">
                        <p className="w-[30%]">Date & Time :</p>
                        <span className="text-solitaireTertiary">
                          {formatCreatedAt(items.created_at)}
                        </span>
                      </div>
                      <div className="flex mb-1">
                        <p className="w-[30%]">Payment Terms :</p>
                        <span className="text-solitaireTertiary">
                          {items.paymentTerm}
                        </span>
                      </div>
                    </div>
                    <div className="flex w-[50%]">
                      <p className="pr-10">Comments:</p>
                      <span className="text-solitaireTertiary">
                        {items.comment.length ? items.comment : '-'}
                      </span>
                    </div>
                  </div> */}

                  <div className="fixed bottom-3 w-[70%]">
                    {renderFooterButtons()}
                  </div>
                </>
              }
            />
          </div>
        );
      })}
    </div>
  );
};
