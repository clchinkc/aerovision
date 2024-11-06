import React from 'react';

function Button({ text, variant, className }) {
  const baseClasses = "gap-2 px-8 py-4 text-xl font-bold whitespace-nowrap border border-purple-800 border-solid min-h-[62px] rounded-[500px] w-[236px] max-md:px-5";
  const variantClasses = variant === 'primary' ? "text-white bg-purple-800" : "text-purple-800";
  
  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`}>
      {text}
    </button>
  );
}

export default Button;
