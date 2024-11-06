import React from 'react';

function WeightInput({ id }) {
  return (
    <input
      type="number"
      id={id}
      data-layername="enterYourEmail"
      className="gap-2 self-stretch py-3 pl-3 mt-5 bg-white rounded-lg border border-purple-800 border-solid w-[588px] max-md:max-w-full"
      placeholder="以公斤為單位"
    />
  );
}

export default WeightInput;
