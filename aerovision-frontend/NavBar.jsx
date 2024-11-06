import React from 'react';

function Navbar() {
  return (
    <header data-layername="navbar6Desktop" className="flex overflow-hidden flex-col justify-center items-center pr-9 pl-4 w-full bg-purple-800 min-h-[72px] max-md:pr-5 max-md:max-w-full max-sm:hidden">
      <div data-layername="container" className="flex flex-wrap gap-10 justify-between items-center w-full max-w-[1312px] max-md:max-w-full max-sm:hidden">
        <div className="flex gap-8 items-center self-stretch my-auto min-w-[240px]">
          <div data-layername="icon" className="flex items-start self-stretch p-3 my-auto w-[155px]">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/84f38566f5bb1aec38e0c28209988da7a486907699eebe95a11062b1054b413d?placeholderIfAbsent=true&apiKey=5bc2a3668e784135b048483cd2966401" alt="Company logo" className="object-contain aspect-[3.45] w-[131px]" />
          </div>
          <nav data-layername="column" className="flex overflow-hidden gap-8 items-start self-stretch my-auto text-xl font-bold text-white whitespace-nowrap">
            <a href="#" data-layername="link02" className="gap-1 self-stretch">上傳照片</a>
            <a href="#" data-layername="link01" className="gap-1 self-stretch">廢物數據</a>
          </nav>
        </div>
        <div data-layername="column" className="flex gap-8 justify-center items-center self-stretch my-auto">
          <div className="flex gap-8 justify-center items-center self-stretch my-auto">
            <div data-layername="toggle" className="flex gap-2 items-center self-stretch my-auto">
              <span data-layername="label1" className="self-stretch my-auto text-base text-white">ENG</span>
              <div data-layername="switch" className="flex flex-col justify-center items-start self-stretch p-1 my-auto w-10 bg-white rounded-lg rotate-[3.141592653589793rad] max-sm:hidden">
                <div data-layername="circle1" className="flex w-4 h-4 bg-purple-800 rounded min-h-[16px]"></div>
              </div>
              <span data-layername="label2" className="self-stretch my-auto text-base text-white">中</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
