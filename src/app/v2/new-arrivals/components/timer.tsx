// components/CountdownTimer.js
import { useEffect, useState } from 'react';

const CountdownTimer = ({
  initialHours = 0,
  initialMinutes = 0,
  initialSeconds = 0
}) => {
  const [time, setTime] = useState({
    hours: initialHours,
    minutes: initialMinutes,
    seconds: initialSeconds
  });

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(currentTime => {
        let { hours, minutes, seconds } = currentTime;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formatTime = (unit: any) => (unit < 10 ? `0${unit}` : unit);

  return (
    <div className="flex justify-center items-center gap-2 h-[34px] mr-2">
      <div className="flex flex-col items-center gap-[2px] w-[25px]">
        <span className="text-neutral800 text-[8px] uppercase">Hours</span>
        <div className="text-lg font-semibold rounded  relative w-full">
          <div className="gap-[1px] flex flex-col  absolute inset-0 z-0 w-full h-[20px]">
            <div
              className="h-[10px] w-full rounded-[6px]"
              style={{
                background:
                  'linear-gradient(90deg, #DBF2FC 40%, #E8E8FF 60%, #FFF4E3 100%)'
              }}
            ></div>
            <div
              className="h-[10px] w-full rounded-[6px]"
              style={{
                background:
                  'linear-gradient(90deg, #DBF2FC 40%, #E8E8FF 60%, #FFF4E3 100%)'
              }}
            ></div>
          </div>
          <div className="z-2 relative flex justify-center items-center text-neutral600 text-lMedium medium h-[20px]">
            {formatTime(time.hours)}
          </div>
        </div>
      </div>
      <span className="text-lg font-semibold mt-[16px] text-neutral900">:</span>
      <div className="flex flex-col items-center gap-[2px] w-[25px]">
        <span className="text-neutral800 text-[8px] uppercase">MINUTES</span>
        <div className="text-lg font-semibold rounded  relative w-full">
          <div className="gap-[1px] flex flex-col  absolute inset-0 z-0 w-full h-[20px]">
            <div
              className="h-[10px] w-full rounded-[6px]"
              style={{
                background: 'linear-gradient(90deg, #DBF2FC 0%, #E8E8FF 100%)'
              }}
            ></div>
            <div
              className="h-[10px] w-full rounded-[6px]"
              style={{
                background: 'linear-gradient(90deg, #DBF2FC 0%, #E8E8FF 100%)'
              }}
            ></div>
          </div>
          <div className="z-2 relative flex justify-center items-center text-neutral600 text-lMedium medium h-[20px]">
            {formatTime(time.minutes)}
          </div>
        </div>
      </div>
      <span className="text-lg font-semibold mt-[16px] text-neutral900">:</span>
      <div className="flex flex-col items-center gap-[2px] w-[25px]">
        <span className="text-neutral800 text-[8px] uppercase">SECONDS</span>
        <div className="text-lg font-semibold rounded  relative w-full">
          <div className="gap-[1px] flex flex-col  absolute inset-0 z-0 w-full h-[20px]">
            <div
              className="h-[10px] w-full rounded-[6px]"
              style={{
                background: 'linear-gradient(90deg, #DBF2FC 50%,  #FFF4E3 100%)'
              }}
            ></div>
            <div
              className="h-[10px] w-full rounded-[6px]"
              style={{
                background: 'linear-gradient(90deg, #DBF2FC 50%,  #FFF4E3 100%)'
              }}
            ></div>
          </div>
          <div className="z-2 relative flex justify-center items-center text-neutral600 text-lMedium medium h-[20px]">
            {formatTime(time.seconds)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
