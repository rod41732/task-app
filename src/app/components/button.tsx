import { cn } from "@/app/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, forwardRef, ReactNode, useState } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md p-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-x-2",
  {
    variants: {
      variant: {
        primary:
          "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 focus-visible:ring-blue-500",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 focus-visible:ring-red-500",
        secondary:
          "bg-transparent text-gray-500 hover:bg-gray-100 active:bg-gray-200 focus-visible:ring-gray-500",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

type _ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

type ButtonProps = Omit<_ButtonProps, "onClick"> & {
  onClick: () => Promise<void>;
  icon: ReactNode;
};

/** Button: handle async onClick action by disabling itself and replacing icon with spinner */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, onClick, children, icon, ...props }, ref) => {
    const [isLoading, setLoading] = useState(false);

    return (
      <button
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        disabled={isLoading}
        onClick={async () => {
          if (isLoading) {
            return;
          }
          setLoading(true);
          try {
            await onClick();
          } finally {
            setLoading(false);
          }
        }}
        {...props}
      >
        {isLoading ? <Loader2 className="animate-spin" /> : icon}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
