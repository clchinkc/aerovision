import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="flex overflow-hidden flex-col justify-center items-center pr-9 pl-4 w-full bg-purple-800 min-h-[72px] max-md:pr-5 max-md:max-w-full max-sm:hidden">
      <div className="flex flex-wrap gap-10 justify-between items-center w-full max-w-[1312px] max-md:max-w-full max-sm:hidden">
        <div className="flex gap-8 items-center self-stretch my-auto min-w-[240px]">
          <div className="flex items-start self-stretch p-3 my-auto w-[155px]">
            <Link to="/upload">
              <img 
                loading="lazy" 
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/84f38566f5bb1aec38e0c28209988da7a486907699eebe95a11062b1054b413d" 
                alt="Company logo" 
                className="object-contain aspect-[3.45] w-[131px]" 
              />
            </Link>
          </div>
          <nav className="flex overflow-hidden gap-8 items-start self-stretch my-auto text-xl font-bold text-white whitespace-nowrap">
            <Link to="/upload" className="gap-1 self-stretch">上傳照片</Link>
            <Link to="/data" className="gap-1 self-stretch">廢物數據</Link>
            <Link to="/analysis" className="gap-1 self-stretch">分析結果</Link>
          </nav>
        </div>
        <div className="flex gap-2 items-center self-stretch my-auto">
          <span className="self-stretch my-auto text-base text-white">ENG</span>
          <div className="flex flex-col justify-center items-start self-stretch p-1 my-auto w-10 bg-white rounded-lg rotate-[3.141592653589793rad]">
            <div className="flex w-4 h-4 bg-purple-800 rounded min-h-[16px]"></div>
          </div>
          <span className="self-stretch my-auto text-base text-white">中</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
