import React from 'react';

function LanguageToggle() {
  return (
    <div data-layername="toggle" className="flex gap-2 items-center self-stretch my-auto">
      <span data-layername="label1" className="self-stretch my-auto text-base text-white">
        ENG
      </span>
      <div data-layername="switch" className="flex flex-col justify-center items-start self-stretch p-1 my-auto w-10 bg-white rounded-lg rotate-[3.141592653589793rad]">
        <div data-layername="circle1" className="flex w-4 h-4 bg-purple-800 rounded min-h-[16px]" />
      </div>
      <span data-layername="label2" className="self-stretch my-auto text-base text-white">
        中
      </span>
    </div>
  );
}

export default LanguageToggle;
