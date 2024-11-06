import React from 'react';

function LanguageToggle() {
  return (
    <div className="flex gap-8 justify-center items-center self-stretch my-auto">
      <div className="flex gap-2 items-center self-stretch my-auto">
        <span className="self-stretch my-auto text-base text-white">ENG</span>
        <div className="flex flex-col justify-center items-start self-stretch p-1 my-auto w-10 bg-white rounded-lg rotate-[3.141592653589793rad]">
          <div className="flex w-4 h-4 bg-purple-800 rounded min-h-[16px]" />
        </div>
        <span className="self-stretch my-auto text-base text-white">中</span>
      </div>
    </div>
  );
}

export default LanguageToggle;
