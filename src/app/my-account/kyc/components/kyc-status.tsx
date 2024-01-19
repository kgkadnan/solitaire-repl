import diamond from '@public/assets/icons/Group 1713.svg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface IKycStatus {
  status: string;
  content: string;
  linkHref?: string;
  linkLabel?: string;
}

export default function KycStatus({
  status,
  content,
  linkHref,
  linkLabel
}: IKycStatus) {
  return (
    <div className="flex justify-center h-[70vh] items-center">
      <div className="absolute flex flex-col items-center gap-[60px] text-[20px]">
        <Image className="relative w-[204px] h-[204px]" alt="" src={diamond} />
        <div className="flex flex-col items-center justify-start gap-[30px]">
          <div className="relative tracking-[0.16em] uppercase font-medium text-solitaireTertiary">
            KYC STATUS: {status}
          </div>
          <div className="relative text-[16px] font-medium text-center inline-block w-[659px] text-solitaireTertiary">
            {content}
          </div>
          {linkHref && (
            <div className="text-center bg-solitaireQuaternary w-[160px] h-[40px] cursor-pointer rounded-[5px]">
              <Link
                href={linkHref}
                className="text-[14px] font-medium text-solitaireTertiary "
              >
                {linkLabel}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
