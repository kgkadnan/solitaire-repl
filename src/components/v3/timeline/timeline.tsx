import React from 'react';
import classNames from 'classnames';

interface ITimelineProps {
  animate?: boolean;
  children: React.ReactNode;
  className?: string;
  lineColor?: string;
}

const Timeline: React.FC<ITimelineProps> = ({
  animate = true,
  children,
  className = '',
  lineColor = '#000'
}) => (
  <div className="relative flex flex-col items-center">
    <div
      className={classNames(
        className,
        'relative w-full',
        'before:absolute before:left-1/2 before:top-0 before:bottom-0 before:w-[2px]',
        {
          'animate-fadeIn': animate
        }
      )}
      style={{ borderColor: lineColor }}
    >
      {children}
    </div>
  </div>
);

export default Timeline;
