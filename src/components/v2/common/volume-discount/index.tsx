import { useEffect, useState } from 'react';
import CountdownTimer from '../timer';

const VolumeDiscount: React.FC<any> = ({
  totalSpent,
  expiryTime,
  eligibleForDiscount
}) => {
  // const [timeDifference, setTimeDifference] = useState(expiryTime);

  // useEffect(() => {
  //     const currentTime: any = new Date();
  //     const targetTime: any = new Date(expiryTime!);
  //     const timeDiff: any = targetTime - currentTime;

  //     setTimeDifference(timeDiff);
  //   }, [expiryTime]);
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
          <div>eligi</div>
        </div>
        hi
        <div>
          <CountdownTimer
            initialHours={Math.floor(expiryTime / (1000 * 60 * 60))}
            initialMinutes={Math.floor(
              (expiryTime % (1000 * 60 * 60)) / (1000 * 60)
            )}
            initialSeconds={Math.floor((expiryTime % (1000 * 60)) / 1000)}
          />
        </div>
      </div>
    </>
  );
};

export default VolumeDiscount;
