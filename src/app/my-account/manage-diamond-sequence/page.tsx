'use client';
import { CustomCheckBox } from '@/components/common/checkbox';
import React, { useState } from 'react';

const ManageDiamondSequence = () => {
  //checkbox states
  const [isCheck, setIsCheck] = useState<string[]>([]);
  //specific checkbox
  const handleClick = (e: any) => {
    const { id } = e.target;

    let updatedIsCheck = [...isCheck];

    if (updatedIsCheck.includes(id)) {
      updatedIsCheck = updatedIsCheck.filter((item) => item !== id);
    } else {
      updatedIsCheck.push(id);
    }

    setIsCheck(updatedIsCheck);
  };
  return (
    <div className="absolute top-[231px] left-[122px] w-[1440px] flex flex-row flex-wrap items-start justify-start gap-[28px] text-inherit font-inherit">
      <div className="flex flex-col items-start justify-start relative gap-[10px]">
        <div className="relative bg-solitaireSenary rounded-md w-[230px] h-7 z-[0]" />
        <div className="my-0 mx-[!important] absolute top-[4px] left-[15px] w-[230px] flex flex-row items-center justify-start gap-[100px] z-[1]">
          <div className="m-0 pl-[19px]">Stock No</div>
          <CustomCheckBox
            data={'1'}
            onClick={handleClick}
            isChecked={isCheck}
          />
        </div>
      </div>
      <div className="flex flex-col items-start justify-start relative gap-[10px]">
        <div className="relative rounded-md w-[230px] h-7 z-[0]" />
        <div className="my-0 mx-[!important] absolute top-[4px] left-[15px] w-[230px] flex flex-row items-center justify-start gap-[100px] z-[1]">
          <div className="m-0 pl-[19px]">Stock No</div>
          <CustomCheckBox
            data={'1'}
            onClick={handleClick}
            isChecked={isCheck}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageDiamondSequence;
