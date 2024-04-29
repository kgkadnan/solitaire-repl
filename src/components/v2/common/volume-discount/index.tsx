import { useEffect, useState } from 'react';
import CountdownTimer from '../timer';

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
        <div className="px-[12px] border-b-[1px] border-neutral200">slider</div>
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
