import { HeadquaterLocation } from '@/constants/v3/headquater-location';
import React from 'react';
const LocationTab = ({ selectedRegion, setSelectedRegion }: any) => {
  return (
    <div className="flex bg-neutral900 inline-block rounded-[6px] p-1 cursor-pointer gap-2">
      {HeadquaterLocation.map((data: any) => (
        <div
          className={`text-neutral0 p-2 border-[1px] border-neutral900 rounded-[4px] text-lRegular ${
            selectedRegion === data.region &&
            'bg-neutral0 text-neutral900 font-medium'
          }`}
          onClick={() => setSelectedRegion(data.region)}
          key={data.region}
        >
          {' '}
          {data.region}
        </div>
      ))}
    </div>
  );
};

export default LocationTab;
