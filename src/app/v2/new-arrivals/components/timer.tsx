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
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center">
        <span className="text-xs font-semibold text-gray-500 uppercase">
          Hours
        </span>
        <div className="text-lg font-semibold bg-blue-100 rounded p-2">
          {/* <div>
          <div className='bg-[red]'>a</div>
          <div className='bg-[green]'>b</div>
          </div> */}
          {formatTime(time.hours)}
        </div>
      </div>
      <span className="text-lg font-semibold">:</span>
      <div className="flex flex-col items-center">
        <span className="text-xs font-semibold text-gray-500 uppercase">
          Minutes
        </span>
        <div className="text-lg font-semibold bg-blue-200 rounded p-2">
          {formatTime(time.minutes)}
        </div>
      </div>
      <span className="text-lg font-semibold">:</span>
      <div className="flex flex-col items-center">
        <span className="text-xs font-semibold text-gray-500 uppercase">
          Seconds
        </span>
        <div className="text-lg font-semibold bg-blue-300 rounded p-2">
          {formatTime(time.seconds)}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
