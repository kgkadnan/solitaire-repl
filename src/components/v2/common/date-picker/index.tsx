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

  // Get today's date
  const today = new Date();

  // Define the DateBefore matcher to disable future dates
  const disableFutureDates = { after: today };

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
              'w-[185px] px-[4px] rounded-[4px] gap-2 shadow-inner bg-neutral0 border-[1px] border-solid border-neutral200  !text-neutral400 text-mRegular justify-start text-left font-normal'
            }
          >
            <CalendarIcon />
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
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="bg-neutral0 border-[1px] border-solid border-neutral200 rounded-[8px] absolute top-[4px] right-[-186px]">
            <Calendar
              initialFocus
              mode="range"
              selected={date}
              onSelect={setDate}
              disabled={disableFutureDates}
              className="bg-neutral0 rounded-t-[8px] border-b-[1px] border-solid border-neutral200 "
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
