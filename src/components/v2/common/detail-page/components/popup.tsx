import Image from 'next/image';
import React from 'react';

import { FILE_URLS } from '@/constants/v2/detail-page';
import { getShapeDisplayName } from '@/utils/v2/detail-page';
const ShowPopups = ({ data, currentIndex }: any) => {
  return (
    <div className="absolute top-[calc(100%+10px)]  right-[8%] opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 group-hover:pointer-events-auto">
      <div className="w-[277px] flex items-center gap-2 p-[14px] bg-neutral0 border-[1px] border-neutral-200 rounded-[8px] shadow-popupsShadow">
        <div>
          <Image
            src={`${FILE_URLS.IMG.replace(
              '***',
              data[currentIndex]?.lot_id ?? ''
            )}`}
            alt="diamondImage"
            width={74}
            height={74}
          />
        </div>
        <div className="flex flex-col mr-1 gap-[10px]">
          <div>{data[currentIndex]?.lot_id}</div>
          <div className="flex gap-1">
            <p>{getShapeDisplayName(data[currentIndex]?.shape)}</p>
            <p>{data[currentIndex]?.carats ?? '-'}</p>
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="text-[15px] text-neutral-900 font-medium">
            {`$${
              data[currentIndex]?.variants[0]?.prices[0]?.amount?.toFixed(2) ??
              '-'
            }`}
          </div>
          <div className="text-successMain text-mMedium">
            {data[currentIndex]?.discount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPopups;
