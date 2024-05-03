// components/CountdownTimer.js
import { useEffect, useState } from 'react';

const CountdownTimer = ({
  initialHours = 0,
  initialMinutes = 0,
  initialSeconds = 0,
  customize = false
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
    <div
      className={`flex justify-center items-center gap-2 ${
        customize ? 'h-[60px]' : 'h-[34px]'
      } mr-2`}
    >
      <div
        className={`flex flex-col items-center gap-[2px] ${
          customize ? 'w-[40px]' : 'w-[25px]'
        }`}
      >
        <span
          className={`text-neutral800 ${
            customize ? 'text-[12px]' : 'text-[8px]'
          } uppercase`}
        >
          Hours
        </span>
        <div className="text-lg font-semibold rounded  relative w-full">
          <div
            className={`gap-[1px] flex flex-col  absolute inset-0 z-0 w-full ${
              customize ? 'h-[40px]' : 'h-[20px]'
            }`}
          >
            <div
              className={`${
                customize ? 'h-[20px]' : 'h-[10px]'
              } w-full rounded-[6px]`}
              style={{
                background:
                  'linear-gradient(90deg, #DBF2FC 40%, #E8E8FF 60%, #FFF4E3 100%)'
              }}
            ></div>
            <div
              className={`${
                customize ? 'h-[20px]' : 'h-[10px]'
              } w-full rounded-[6px]`}
              style={{
                background:
                  'linear-gradient(90deg, #DBF2FC 40%, #E8E8FF 60%, #FFF4E3 100%)'
              }}
            ></div>
          </div>
          <div
            className={`z-2 relative flex justify-center items-center text-neutral600  medium ${
              customize ? 'h-[40px] text-headingS' : 'h-[20px] text-lMedium'
            }`}
          >
            {formatTime(time.hours)}
          </div>
        </div>
      </div>
      <span className="text-lg font-semibold mt-[16px] text-neutral900">:</span>
      <div
        className={`flex flex-col items-center gap-[2px] ${
          customize ? 'w-[40px]' : 'w-[25px]'
        }`}
      >
        <span
          className={`text-neutral800 ${
            customize ? 'text-[12px]' : 'text-[8px]'
          } uppercase`}
        >
          MINUTES
        </span>
        <div className="text-lg font-semibold rounded  relative w-full">
          <div
            className={`gap-[1px] flex flex-col  absolute inset-0 z-0 w-full ${
              customize ? 'h-[40px]' : 'h-[20px]'
            }`}
          >
            <div
              className={`${
                customize ? 'h-[20px]' : 'h-[10px]'
              } w-full rounded-[6px]`}
              style={{
                background: 'linear-gradient(90deg, #DBF2FC 0%, #E8E8FF 100%)'
              }}
            ></div>
            <div
              className={`${
                customize ? 'h-[20px]' : 'h-[10px]'
              } w-full rounded-[6px]`}
              style={{
                background: 'linear-gradient(90deg, #DBF2FC 0%, #E8E8FF 100%)'
              }}
            ></div>
          </div>
          <div
            className={`z-2 relative flex justify-center items-center text-neutral600  medium ${
              customize ? 'h-[40px] text-headingS' : 'h-[20px] text-lMedium'
            }`}
          >
            {formatTime(time.minutes)}
          </div>
        </div>
      </div>
      <span className="text-lg font-semibold mt-[16px] text-neutral900">:</span>
      <div
        className={`flex flex-col items-center gap-[2px] ${
          customize ? 'w-[40px]' : 'w-[25px]'
        }`}
      >
        <span
          className={`text-neutral800 ${
            customize ? 'text-[12px]' : 'text-[8px]'
          } uppercase`}
        >
          SECONDS
        </span>
        <div className="text-lg font-semibold rounded  relative w-full">
          <div
            className={`gap-[1px] flex flex-col  absolute inset-0 z-0 w-full ${
              customize ? 'h-[40px]' : 'h-[20px]'
            }`}
          >
            <div
              className={`${
                customize ? 'h-[20px]' : 'h-[10px]'
              } w-full rounded-[6px]`}
              style={{
                background: 'linear-gradient(90deg, #DBF2FC 50%,  #FFF4E3 100%)'
              }}
            ></div>
            <div
              className={`${
                customize ? 'h-[20px]' : 'h-[10px]'
              } w-full rounded-[6px]`}
              style={{
                background: 'linear-gradient(90deg, #DBF2FC 50%,  #FFF4E3 100%)'
              }}
            ></div>
          </div>
          <div
            className={`z-2 relative flex justify-center items-center text-neutral600  medium ${
              customize ? 'h-[40px] text-headingS' : 'h-[20px] text-lMedium'
            }`}
          >
            {formatTime(time.seconds)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
