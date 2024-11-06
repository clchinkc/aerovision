import React from 'react';

function FlightInput({ id }) {
  return (
    <input
      type="text"
      id={id}
      data-layername="enterYourEmail"
      className="gap-2 self-stretch py-3 pl-3 mt-6 bg-white rounded-lg border border-purple-800 border-solid w-[588px] max-md:max-w-full"
      placeholder="UO***"
    />
  );
}

export default FlightInput;
