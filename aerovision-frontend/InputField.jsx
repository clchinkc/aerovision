import React from 'react';

function InputField({ id, placeholder }) {
  return (
    <input
      id={id}
      className="gap-2 self-stretch py-3 pl-3 mt-6 bg-white rounded-lg border border-purple-800 border-solid w-[588px] max-md:max-w-full"
      type="text"
      placeholder={placeholder}
    />
  );
}

export default InputField;
