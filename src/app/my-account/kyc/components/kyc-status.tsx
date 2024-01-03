import diamond from '@public/assets/icons/Group 1713.svg';
import Image from 'next/image';
export default function KycStatus() {
  return (
    <div className="flex justify-center h-[70vh] items-center">
      <div className="absolute flex flex-col items-center gap-[60px] text-[20px]">
        <Image className="relative w-[204px] h-[204px]" alt="" src={diamond} />
        <div className="flex flex-col items-center justify-start gap-[30px]">
          <div className="relative tracking-[0.16em] uppercase font-medium text-solitaireTertiary">
            KYC STATUS: PENDING
          </div>
          <div className="relative text-[16px] font-medium text-center inline-block w-[659px] text-solitaireTertiary">
            We have received your KYC, we are reviewing it. We will give an
            update over it soon, by then you can explore our website
          </div>
        </div>
      </div>
    </div>
  );
}
