import React from 'react';
import LanguageToggle from './LanguageToggle';
import NavLink from './NavLink';

function Navbar() {
  return (
    <header className="flex overflow-hidden flex-col justify-center items-center px-7 w-full bg-purple-800 min-h-[73px] max-md:px-5 max-md:max-w-full">
      <nav className="flex flex-wrap gap-10 justify-between items-center w-full max-w-[1312px] max-md:max-w-full">
        <div className="flex gap-8 items-center self-stretch my-auto min-w-[240px]">
          <div className="flex items-start self-stretch p-3 my-auto w-[155px]">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/00a23fb28f21a3da6b3730999d9d6784cbb7807c278f8f42157511ce062492da?placeholderIfAbsent=true&apiKey=5bc2a3668e784135b048483cd2966401" alt="Company logo" className="object-contain aspect-[3.45] w-[131px]" />
          </div>
          <div className="flex overflow-hidden gap-8 items-start self-stretch my-auto text-xl font-bold text-white whitespace-nowrap">
            <NavLink text="上傳照片" />
            <NavLink text="廢物數據" />
          </div>
        </div>
        <LanguageToggle />
      </nav>
    </header>
  );
}

export default Navbar;
