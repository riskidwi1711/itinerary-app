
import React from 'react';

const Heading = ({ level = 1, children, className = '', ...props }) => {
  const Tag = `h${level}`;
  const baseClasses = 'font-bold text-gray-800';

  const sizeClasses = {
    1: 'text-2xl',
    2: 'text-xl',
    3: 'text-lg',
    4: 'text-base',
    5: 'text-sm',
    6: 'text-xs',
  };

  const size = sizeClasses[level] || sizeClasses[1];

  return (
    <Tag className={`${baseClasses} ${size} ${className}`} {...props}>
      {children}
    </Tag>
  );
};

export default Heading;
