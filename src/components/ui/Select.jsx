import React from 'react';
import { cn } from '@src/utils';

const Select = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <select
      className={cn(
        "w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-gray-800 bg-gray-50 transition-all duration-200",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Select.displayName = "Select";

export { Select };
