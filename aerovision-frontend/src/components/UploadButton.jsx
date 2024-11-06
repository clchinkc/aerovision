import React from 'react';

function UploadButton({ onClick }) {
  return (
    <button 
      onClick={onClick}
      className="flex gap-2 justify-center items-center px-4 py-7 mt-12 max-w-full bg-white border border-purple-800 border-solid min-h-[81px] rounded-[50px] w-[338px] max-md:mt-10"
    >
      <span className="flex self-stretch my-auto w-6 min-h-[24px]" />
      <span className="z-10 mt-0 text-4xl font-bold text-center text-purple-800">
        上傳
      </span>
    </button>
  );
}

export default UploadButton;
