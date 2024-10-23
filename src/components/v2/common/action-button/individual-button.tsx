import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:none focus-visible:none focus-visible:none disabled:pointer-events-none disabled:opacity-50 ',
  {
    variants: {
      variant: {
        default: '',
        destructive: 'bg-destructive text-destructive-foreground ',
        primary: 'bg-primaryMain text-neutral25',
        secondary:
          'border border-solid border-neutral200 border-[1px] bg-neutral0 text-neutral900',
        disable:
          'border border-solid border-neutral200  border-[1px] bg-neutral100 text-neutral400 !shadow-none cursor-not-allowed ',
        link: 'text-primary underline-offset-4 '
      },
      size: {
        default: 'h-10 px-0 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        custom: ' h-[56px]'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const IndividualActionButton = React.forwardRef<
  HTMLButtonElement,
  IButtonProps
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';

  // Determine hover, focus, and active states based on variant
  const hoverStyles =
    variant === 'primary' ? 'hover:bg-primaryHover' : 'hover:bg-neutral-50';
  const focusStyles =
    variant === 'primary' ? 'focus:bg-primaryMain' : 'focus:bg-neutral-50';
  const activeStyles =
    variant === 'primary'
      ? 'active:bg-primary-pressed'
      : 'active:bg-neutral-100';

  return (
    <Comp
      className={cn(
        buttonVariants({ variant, size, className }),
        hoverStyles,
        focusStyles,
        activeStyles
      )}
      ref={ref}
      {...props}
    />
  );
});
IndividualActionButton.displayName = 'IndividualActionButton';

export { IndividualActionButton, buttonVariants };
