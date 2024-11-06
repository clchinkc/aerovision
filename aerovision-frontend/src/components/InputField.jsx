import React from 'react';

function InputField({ placeholder, className }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={`gap-2 self-stretch py-3 pl-3 bg-white rounded-lg border border-purple-800 border-solid w-[588px] max-md:max-w-full ${className}`}
    />
  );
}

export default InputField;
