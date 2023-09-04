// components/Tooltip.js

import { useState } from 'react';
import style from './tooltip.module.scss';
interface ITooltip {
  tooltipElement: React.ReactNode;
  content: React.ReactNode;
  handleEvent?: () => void;
  tooltipStyles?: ItooltipStyles;
}
interface ItooltipStyles {
  tooltipContainerStyles?: string;
  tooltipContentStyle?: string;
}
const Tooltip: React.FC<ITooltip> = (tooltip: ITooltip) => {
  const { tooltipElement, tooltipStyles, content, handleEvent } = tooltip;
  const [isActive, setIsActive] = useState(false);

  const toggleTooltip = () => {
    setIsActive(!isActive);
    handleEvent!();
  };

  const closeTooltip = () => {
    setIsActive(false);
  };

  return (
    <div
      className={`${style.tooltip} ${tooltipStyles?.tooltipContainerStyles}`}
    >
      <div
        className={style.tooltipTrigger}
        onMouseEnter={toggleTooltip}
        onMouseLeave={closeTooltip}
        onClick={toggleTooltip}
      >
        {tooltipElement}
      </div>
      <div
        className={`${style.tooltipData} ${tooltipStyles?.tooltipContentStyle}`}
      >
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
