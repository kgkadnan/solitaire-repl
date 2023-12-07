'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { cn } from '@lib/utils';
import { isAfter, endOfDay } from 'date-fns';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const today = new Date(); // Get the current date

  const isDateDisabled = (date: Date) => {
    // Disable dates that are after today (future dates)
    return isAfter(date, endOfDay(today));
  };
  return (
    <DayPicker
      disabled={isDateDisabled}
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        row: 'flex w-full mt-1',
        cell: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-[#354444] first:[&:has([aria-selected])]:rounded-l last:[&:has([aria-selected])]:rounded-r focus-within:relative focus-within:z-20',
        day: cn('h-9 w-9 p-0 font-normal aria-selected:opacity-100'),
        day_selected:
          'bg-[#000] text-solitaireTertiary-foreground hover:bg-[#000] hover:text-solitaireTertiary-foreground focus:bg-[#000] focus:text-solitaireTertiary-foreground rounded-full',
        day_today: 'bg-[#80706F] text-accent-foreground rounded-full',
        day_outside: 'text-muted-foreground opacity-50',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-[#354444] aria-selected:text-accent-foreground',
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
