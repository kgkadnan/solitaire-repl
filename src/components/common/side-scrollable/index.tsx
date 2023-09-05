import React, { useRef, useState } from 'react';
import styles from './side-scrollable.module.scss';
// import './test.css';

interface ISideScrollableProps {
  leftFixedStyle?: string;
  leftFixedContent: React.ReactNode;
  rightSideStyle?: string;
  rightSideContent: React.ReactNode;
}

export const CustomSideScrollable: React.FC<ISideScrollableProps> = ({
  leftFixedStyle,
  leftFixedContent,
  rightSideStyle,
  rightSideContent,
}) => {
  const scrollableRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number | null>(null);
  const [scrollLeft, setScrollLeft] = useState<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (scrollableRef.current) {
      setStartX(e.pageX - scrollableRef.current.offsetLeft);
      setScrollLeft(scrollableRef.current.scrollLeft);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollableRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollableRef.current.offsetLeft;
    const walk = (x - (startX as number)) * 2; // Adjust the scroll speed here
    scrollableRef.current.scrollLeft = (scrollLeft as number) - walk;
  };

  return (
    <div className="flex">
      <div className={`${leftFixedStyle}`}>{leftFixedContent}</div>
      <div
        role="scrollable-container"
        className={styles.scrollableContainer}
        ref={scrollableRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
      >
        <div
          className={`${styles.scrollText} ${rightSideStyle}`}
          data-testid="scrollable-container"
        >
          {rightSideContent}
        </div>
      </div>
    </div>
  );
};
