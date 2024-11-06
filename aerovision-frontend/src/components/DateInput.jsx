import React from 'react';

function DateInput({ id }) {
  return (
    <input
      type="date"
      id={id}
      data-layername="enterYourEmail"
      className="gap-2 self-stretch py-3 pl-3 bg-white rounded-lg border border-purple-800 border-solid w-[588px] max-md:max-w-full"
      placeholder="DD/MM/YYYY"
    />
  );
}

export default DateInput;
