import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  `inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold 
  ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
   uppercase tracking-wide`,
  {
    variants: {
      variant: {
        default: "bg-slate-900 text-white hover:bg-slate-800",
        primary:
          "bg-sky-500 text-primary-foreground hover:bg-sky-500/90 border-sky-600 border-b-4 active:border-b-0",
        primaryOutline: "bg-white text-sky-500 hover:bg-slate-100",
        secondary:
          "bg-indigo-500 text-primary-foreground hover:bg-indigo-500/90 border-indigo-600 border-b-4 active:border-b-0",
        secondaryOutline: "bg-white text-indigo-500 hover:bg-slate-100",
        danger:
          "bg-rose-500 text-primary-foreground hover:bg-rose-500/90 border-rose-600 border-b-4 active:border-b-0",
        dangerOutline: "bg-white text-rose-500 hover:bg-slate-100",
        super:
          "bg-purple-500 text-primary-foreground hover:bg-purple-500/90 border-purple-600 border-b-4 active:border-b-0",
        superOutline: "bg-white text-purple-500 hover:bg-slate-100",
        ghost:
          "bg-transparent text-slate-500 border-transparent border-0 hover:bg-slate-100",
        sidebar:
          "bg-transparent text-slate-500 border-2 border-transparent hover:bg-slate-100 transition-none",
        sidebarOutline:
          "bg-sky-500/15 text-sky-500 border-sky-300 border-2 hover:bg-sky-500/20 transition-none",
        locked:
          "bg-neutral-200 text-primary-foreground hover:bg-neutral-200/90 border-neutral-400 border-b-4 active:border-b-0",
        darkBlue:
          "bg-darkblue-500 text-primary-foreground hover:bg-darkblue-500/90 border-darkblue-600 border-b-4 active:border-b-0 dark:bg-darkblue-600 dark:hover:bg-darkblue-600/90 dark:border-darkblue-700",
        darkBlueOutline: "bg-white text-darkblue-500 hover:bg-slate-100 dark:bg-transparent dark:text-darkblue-300",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
        rounded: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// List of props that should be excluded from DOM elements
const excludedProps = [
  'afterSignInUrl', 
  'afterSignUpUrl', 
  'component',
  'redirectUrl'
];

const BaseButton = React.forwardRef<HTMLButtonElement, BaseButtonProps & Record<string, any>>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    // Filter out Clerk-specific props
    const domProps = { ...props };
    excludedProps.forEach(prop => {
      if (prop in domProps) {
        delete domProps[prop];
      }
    }); 
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...domProps}
      />
    );
  }
);
BaseButton.displayName = "BaseButton";

// Wrapper component that handles Clerk props
const ClerkButton = React.forwardRef<HTMLButtonElement, BaseButtonProps & { afterSignInUrl?: string; afterSignUpUrl?: string; redirectUrl?: string }>(
  (props, ref) => {
    // Destructure all Clerk-specific props
    const { afterSignInUrl, afterSignUpUrl, redirectUrl, ...buttonProps } = props;
    return <BaseButton ref={ref} {...buttonProps} />;
  }
);
ClerkButton.displayName = "ClerkButton";

export { ClerkButton, buttonVariants };