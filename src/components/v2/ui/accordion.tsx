'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import addIcon from '@public/v2/assets/icons/add-carat.svg';
import lessIcon from '@public/v2/assets/icons/less-icon.svg';
import { cn } from '@lib/utils';
import { ManageLocales } from '@/utils/v2/translate';
import Image from 'next/image';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn('', className)} {...props} />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between font-medium transition-all [&[data-state=open]>svg]:rotate-180',
        className
      )}
      {...props}
    >
      {children}
      {!props.disabled ? (
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      ) : null}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const CustomAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between font-medium transition-all [&[data-state=open]>svg]:rotate-180',
        className
      )}
      {...props}
    >
      {children}
      <button className="flex justify-center items-center font-medium w-[92px] py-[8px] rounded-[4px] gap-1 bg-neutral0 border-[1px] border-solid border-neutral200  h-[30px] text-sMedium cursor-pointer hover:bg-neutral50">
        {props?.value ? (
          <>
            <Image src={lessIcon} alt="lessIcon" width={12} height={12} />
            <span>{ManageLocales('app.advanceSearch.viewLess')}</span>
          </>
        ) : (
          <>
            <Image src={addIcon} alt="addIcon" width={12} height={12} />
            <span>{ManageLocales('app.advanceSearch.viewMore')}</span>
          </>
        )}
      </button>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));

CustomAccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn('pt-0', className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  CustomAccordionTrigger,
  AccordionContent
};
