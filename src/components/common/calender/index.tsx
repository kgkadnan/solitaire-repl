'use client';

import * as React from 'react';
import styles from './calender.module.scss';
import { format, differenceInDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import CalenderIcon from '@public/assets/icons/calender.svg';
import Image from 'next/image';
import { CustomDisplayButton } from '../buttons/display-button';
interface ICustomeCalendarProps {
  className?:string;
  date:any;
  handleDate:(date:any)=>void
}
export const CustomCalender: React.FC<ICustomeCalendarProps> =({
  className,date,handleDate
})=> {

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            // variant={'outline'}
            className={cn(!date && 'text-muted-foreground')}
          >
            <Image src={CalenderIcon} alt="Calender Image" />
            <p className="text-solitaireTertiary ml-2 text-[16px]">
              Filter By Date
            </p>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={`w-auto bg-solitaireSecondary rounded-lg ${styles.calenderContainer}`}
          align="start"
        >
          <div className="border-b border-solitaireTertiary pb-3 text-[12px]">
            {/* {differenceInDays(date?.to, date?.from)} days */}
            {date?.from ? (
              date.to ? (
                <>
                  <div className="text-[14px] tracking-wide mb-2">
                    {differenceInDays(date.to, date.from)} Days
                  </div>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </div>

          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDate}
            numberOfMonths={2}
          />

          <div className="border-t border-solitaireTertiary pt-4 flex justify-end">
            <CustomDisplayButton
              displayButtonLabel="Clear Dates"
              displayButtonAllStyle={{ displayButtonStyle: styles.transparent }}
              handleClick={() => handleDate('')}
            />
            <CustomDisplayButton
              displayButtonLabel="Close"
              displayButtonAllStyle={{ displayButtonStyle: styles.filled }}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
