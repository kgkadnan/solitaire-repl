import { useState, useEffect } from 'react';

const Timer = ({
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
    const intervalId = setInterval(() => {
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
        } else {
          clearInterval(intervalId);
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center justify-center space-x-1">
      <div className="bg-blue-200 p-2 rounded">
        {String(time.hours).padStart(2, '0')}
      </div>
      <div>:</div>
      <div className="bg-blue-200 p-2 rounded">
        {String(time.minutes).padStart(2, '0')}
      </div>
      <div>:</div>
      <div className="bg-blue-200 p-2 rounded">
        {String(time.seconds).padStart(2, '0')}
      </div>
    </div>
  );
};

export default Timer;
