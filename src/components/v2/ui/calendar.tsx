'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('', className)}
      classNames={{
        months:
          'flex flex-col text-neutral900   sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month:
          'space-y-4 border-solid  border-r-[1px]  px-3 !m-[0px] border-neutral200 ',
        caption: 'flex justify-center pt-3 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn('h-7 w-7 bg-transparent p-0 '),
        nav_button_previous:
          'absolute left-1 border-none outline-none text-neutral900',
        nav_button_next:
          'absolute right-1 border-none outline-none text-neutral900',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-neutral400 rounded-md w-9 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: 'h-9 w-9 bg-red text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md  first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day: cn(
          'h-9 w-9  p-0 font-normal  rounded-[4px] text-lMedium font-medium'
        ),
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primaryMain text-neutral0 hover:bg-primaryMain hover:text-neutral0 focus:bg-primaryMain focus:text-neutral0',
        day_today: 'bg-primaryMain text-neutral0',
        day_outside:
          'day-outside text-neutral400 opacity-50  aria-selected:text-neutral400',
        day_disabled: 'text-neutral400 opacity-50',
        day_range_middle:
          'aria-selected:bg-neutral100 aria-selected:text-neutral900',
        day_hidden: 'invisible',
        ...classNames
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
