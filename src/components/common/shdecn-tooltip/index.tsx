import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

export function CustomTooltip({
  tooltipTrigger,
  tooltipContent,
  tooltipStyles,
  delayDuration
}: any) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={delayDuration}>
        <TooltipTrigger> {tooltipTrigger}</TooltipTrigger>
        <TooltipContent className={tooltipStyles.tooltipContent}>
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
