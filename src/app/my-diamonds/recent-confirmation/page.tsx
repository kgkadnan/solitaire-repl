import React from 'react';
import ChevronImage from '@public/assets/icons/chevron-forward-outline.svg';
import Image from 'next/image';

const RecentConfirmation = () => {
  let data = [
    {
      orderId: '352146529',
      date: '25/07/2023',
    },
    {
      orderId: '822148529',
      date: '28/07/2023',
    },
    {
      orderId: '462146529',
      date: '30/07/2023',
    },
  ];
  return (
    <>
      {data.map((items: any) => {
        return (
          <div
            key={items.orderId}
            className="bg-solitaireSecondary w-full h-[80px] flex items-center px-5 rounded-xl cursor-pointer mt-3"
          >
            <div className="flex justify-between w-full">
              <div className="flex gap-[20px]">
                <p>
                  Order ID:{' '}
                  <span className="text-solitaireTertiary">
                    {items.orderId}
                  </span>
                </p>
                <p>
                  Date:{' '}
                  <span className="text-solitaireTertiary">{items.date}</span>
                </p>
              </div>
              <div>
                <Image src={ChevronImage} alt="chevron image" />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default RecentConfirmation;
