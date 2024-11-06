import React from 'react';

const ImageComponent = () => {
  return (
    <div className="flex overflow-hidden flex-col bg-white">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/718ffde1e434f08a24133420dc658ef8bdcba55a95cbc158ac65783a8bc196a8?placeholderIfAbsent=true&apiKey=5bc2a3668e784135b048483cd2966401"
        className="object-contain w-full aspect-[1.33] max-md:max-w-full"
        alt="Full width image"
      />
    </div>
  );
};

export default ImageComponent;
