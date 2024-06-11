'use client';

import * as React from 'react';
import { format } from 'date-fns';

import CalendarIcon from '@public/v2/assets/icons/date-picker/calender.svg?url';

import { cn } from '@/lib/utils';

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@radix-ui/react-popover';
import { Calendar } from '@components/v2/ui/calendar';
import { Button } from '@components/v2/ui/button';
import ActionButton from '../action-button';
import { ManageLocales } from '@/utils/v2/translate';

export function DatePickerWithRange({
  className,
  handleApplyFilter,
  setDate,
  date
}: any) {
  const [isOpen, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!isOpen);
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover open={isOpen} onOpenChange={handleOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            className={
              'w-[220px] rounded-[4px] gap-2 shadow-inner bg-neutral0 border-[1px] border-solid border-neutral200 items-center !text-neutral400 text-mRegular justify-center text-left font-normal'
            }
          >
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL y')} - {format(date.to, 'LLL y')}
                </>
              ) : (
                format(date.from, 'LLL y')
              )
            ) : (
              <span className="text-neutral400">Pick a date</span>
            )}
            <CalendarIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="bg-neutral0 border-[1px] border-solid border-neutral200 rounded-[8px]">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              className="bg-neutral0 rounded-t-[8px] border-b-[1px] border-solid border-neutral200"
            />
            <div className="p-[16px]">
              <ActionButton
                actionButtonData={[
                  {
                    variant: 'secondary',
                    label: ManageLocales('app.yourOrder.datePicker.cancel'),
                    handler: () => {
                      setDate(undefined);
                      handleOpen();
                      handleApplyFilter({}, 'reset');
                    },
                    customStyle: 'flex-1'
                  },
                  {
                    variant: 'primary',
                    label: ManageLocales('app.yourOrder.datePicker.apply'),
                    handler: () => {
                      if (date && date.to && date.from) {
                        handleApplyFilter(
                          {
                            from: format(date.from, 'LLL dd, y'),
                            to: format(date.to, 'LLL dd, y')
                          },
                          ''
                        );
                        handleOpen();
                      }
                    },
                    customStyle: 'flex-1'
                  }
                ]}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
