import React from 'react';

function ImageSlider() {
  return (
    <div className="flex flex-col items-center min-w-[240px] w-[640px] max-md:max-w-full">
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/0e33755434d135a65bd6bb1704279d5b449d6bd207435fdf58ae04818f9e86be?placeholderIfAbsent=true&apiKey=5bc2a3668e784135b048483cd2966401" alt="Slider image" className="object-contain max-w-full rounded-lg aspect-[1.5] w-[640px] max-sm:hidden" />
      <div className="flex gap-6 items-center mt-6">
        <button data-layername="button" className="flex gap-2 justify-center items-center self-stretch px-4 my-auto w-14 h-14 bg-white border border-purple-800 border-solid rounded-[50px]" aria-label="Previous slide">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/39122ff3efd4226c69055e286cc2fe162f56bfd23f8849248f39f630ce1369f4?placeholderIfAbsent=true&apiKey=5bc2a3668e784135b048483cd2966401" alt="" className="object-contain self-stretch my-auto w-6 aspect-square" />
        </button>
        <div data-layername="sliderDots" className="flex gap-2.5 items-start self-stretch p-2.5 my-auto">
          <div data-layername="dot" className="flex shrink-0 w-2 h-2 bg-purple-800 rounded-full"></div>
          <div data-layername="dot" className="flex shrink-0 w-2 h-2 rounded-full bg-slate-300"></div>
        </div>
        <button data-layername="button" className="flex gap-2 justify-center items-center self-stretch px-4 my-auto w-14 h-14 bg-white border border-purple-800 border-solid rounded-[50px]" aria-label="Next slide">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ce6ecd0eeaa45783a28404871766ca2eb996b6024231e839e5e71544c65b9a4c?placeholderIfAbsent=true&apiKey=5bc2a3668e784135b048483cd2966401" alt="" className="object-contain self-stretch my-auto w-6 aspect-square" />
        </button>
      </div>
    </div>
  );
}

export default ImageSlider;
