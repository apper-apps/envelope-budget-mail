import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg bg-white shadow-subtle border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-medium hover:scale-[1.01]",
        className
      )}
      {...props}
    />
  );
});

Card.displayName = "Card";

export default Card;