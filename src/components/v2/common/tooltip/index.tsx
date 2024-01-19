import React from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';

interface ITooltip {
  tooltipTrigger: React.ReactNode;
  tooltipContent: React.ReactNode;
  tooltipContentStyles?: string;
}
const Tooltip = ({
  tooltipTrigger,
  tooltipContent,
  tooltipContentStyles
}: ITooltip) => {
  return (
    <RadixTooltip.Provider delayDuration={0}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{tooltipTrigger}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className={`data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-neutral25 select-none rounded-[8px] bg-primaryMain p-[12px]  text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] ${tooltipContentStyles}`}
          >
            {tooltipContent}
            <RadixTooltip.Arrow className="fill-primaryMain" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

export default Tooltip;
