import { useEffect, useState } from 'react';
import CountdownTimer from '../timer';
import { VOLUME_DISCOUNT_LIMIT } from '@/constants/business-logic';
import StaticSlider from './static-slider';

const VolumeDiscount: React.FC<any> = ({
  totalSpent,
  expiryTime,
  eligibleForDiscount
}) => {
  const [timeDifference, setTimeDifference] = useState(null);

  useEffect(() => {
    if (expiryTime) {
      const currentTime: any = new Date();
      const targetTime: any = new Date(expiryTime!);
      const timeDiff: any = targetTime - currentTime;

      setTimeDifference(timeDiff);
    }
  }, [expiryTime]);
  return (
    <>
      <div
        className="w-[300px] h-[400px] rounded-[8px] border-[1px] border-primaryBorder flex flex-col gap-[24px]"
        style={{ boxShadow: 'var(--input-shadow)' }}
      >
        <div className="px-4 py-6 flex justify-between border-b-[1px] border-neutral200">
          <div className="font-medium text-[18px] text-neutral900">
            Volume Discount
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
                You are eligible for a volume discount of 2.0%
              </p>
              slider
              <div className="text-sMedium text-neutral600 font-medium bg-[#F1FAF8] rounded-[4px] p-[6px]">
                You can utilize current volume discount within
                <span className="font-semiBold">
                  {Math.floor(timeDifference! / (1000 * 60 * 60))}
                </span>{' '}
                hours.
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-[80px]">
              {/* <CustomSlider/> */}
              <StaticSlider
                filledRange={25000}
                // filledRange={totalSpent}
              />
              {/* <CustomizedSlider/> */}
              <div className="text-sMedium text-neutral600 font-medium bg-[#F1FAF8] rounded-[4px] p-[6px]">
                Spend{' '}
                <span className="font-semiBold">
                  ${VOLUME_DISCOUNT_LIMIT - totalSpent}K
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
        <div>
          {timeDifference !== null && (
            <CountdownTimer
              initialHours={Math.floor(timeDifference / (1000 * 60 * 60))}
              initialMinutes={Math.floor(
                (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
              )}
              initialSeconds={Math.floor((timeDifference % (1000 * 60)) / 1000)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default VolumeDiscount;
