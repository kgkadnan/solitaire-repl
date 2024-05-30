import { useEffect, useState } from 'react';
import CountdownTimer from '../timer';
import { VOLUME_DISCOUNT_LIMIT } from '@/constants/business-logic';
import StaticSlider from './static-slider';
import Image from 'next/image';
import infoSvg from '@public/v2/assets/icons/info.svg';

const VolumeDiscount: React.FC<any> = ({
  totalSpent,
  expiryTime,
  eligibleForDiscount
}) => {
  const [timeDifference, setTimeDifference] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isInfoHovered, setIsInfoHovered] = useState(false);

  useEffect(() => {
    if (expiryTime) {
      const currentTime: any = new Date();
      const targetTime: any = new Date(expiryTime!);
      let timeDiff: any = targetTime - currentTime;
      if (timeDiff <= 0) {
        // If the expiry time has passed, set the time difference to 48 hours
        timeDiff = 48 * 60 * 60 * 1000;
      }
      setTimeDifference(timeDiff);
    }
  }, [expiryTime]);
  return (
    <>
      <div
        className="w-[300px] h-[420px] rounded-[8px] border-[1px] border-primaryBorder flex flex-col gap-[20px]"
        style={{ boxShadow: 'var(--input-shadow)' }}
      >
        <div
          className="px-4 py-6 flex justify-between border-b-[1px] border-neutral200 relative"
          onMouseEnter={() => setIsInfoHovered(true)}
          onMouseLeave={() => setIsInfoHovered(false)}
        >
          <div className=" flex">
            <p className="font-medium text-[18px] text-neutral900">
              Volume Discount
            </p>
            <div className="pl-[6px] flex">
              {' '}
              <Image src={infoSvg} alt="volume discount info" />
            </div>
            {isInfoHovered && (
              <div className="absolute bg-[#ECF2FC] w-[320px] border-[1px] border-[#B6CFF3] rounded-[8px] p-4 text-[#475467] top-[-100px] gap-2 right-[0px]">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1">
                    <Image src={infoSvg} alt="volume discount info" />{' '}
                    <p className="text-neutral900 font-medium text-mMedium">
                      Information
                    </p>
                  </div>
                  <p>
                    Eligibility for a volume discount requires the sum of your
                    pending invoices in the last 48 hours to exceed $300.00K
                  </p>
                </div>
              </div>
            )}
          </div>
          <div
            className={`border-[1px]  px-[6px] py-1  rounded-[4px] ${
              eligibleForDiscount
                ? 'bg-successSurface border-successBorder text-successMain'
                : 'bg-dangerSurface border-dangerBorder text-dangerMain'
            }`}
          >
            <p className="text-mMedium font-medium ">
              {eligibleForDiscount ? 'Eligible' : 'Not Eligible'}
            </p>
          </div>
        </div>
        <div className="px-[12px] py-[28px] border-b-[1px] border-neutral200">
          {eligibleForDiscount ? (
            <div>
              <p className="text-successHover text-sRegular font-medium">
                You are eligible for a volume discount of <strong>2.0%</strong>
              </p>
              <StaticSlider totalSpent={totalSpent} />
              <div className="text-sMedium text-neutral600 font-medium bg-[#F1FAF8] rounded-[4px] p-[6px]">
                You can utilize current volume discount within &nbsp;
                <span className="font-semiBold">
                  {Math.floor(timeDifference! / (1000 * 60 * 60))}
                </span>{' '}
                hours.
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-[72px]">
              <StaticSlider totalSpent={totalSpent} />
              <div className="text-sMedium text-neutral600 font-medium bg-[#F1FAF8] rounded-[4px] p-[6px]">
                Spend{' '}
                <span className="font-semiBold">
                  ${((VOLUME_DISCOUNT_LIMIT - totalSpent) / 1000).toFixed(2)}K
                </span>{' '}
                more within{' '}
                <span className="font-semiBold">
                  {Math.floor(timeDifference! / (1000 * 60 * 60))}
                </span>{' '}
                hours to get a 2% volume discount
              </div>
            </div>
          )}
        </div>
        <div
          className="relative px-[12px] "
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {timeDifference !== null && (
            <CountdownTimer
              initialHours={Math.floor(timeDifference / (1000 * 60 * 60))}
              initialMinutes={Math.floor(
                (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
              )}
              initialSeconds={Math.floor((timeDifference % (1000 * 60)) / 1000)}
              customize={true}
            />
          )}
          <div className="absolute top-0 right-0 pr-[12px]">
            {' '}
            <Image src={infoSvg} alt="volume discount info" />
          </div>
          {isHovered && (
            <div className="absolute bg-[#ECF2FC] w-[320px] border-[1px] border-[#B6CFF3] rounded-[8px] p-4 text-[#475467] top-[-100px] gap-2 right-0">
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  <Image src={infoSvg} alt="volume discount info" />{' '}
                  <p className="text-neutral900 font-medium text-mMedium">
                    Information
                  </p>
                </div>
                <p>
                  Timer indicates the time remained to utilize their current
                  volume discount.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VolumeDiscount;
