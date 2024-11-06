import React from 'react';

const ImageComponent = () => {
  return (
    <section className="flex overflow-hidden flex-col bg-white">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b7f017ef2fa4a02c2374024c7fa25bb90ade2df32c58752d1b633227b6c705f6?placeholderIfAbsent=true&apiKey=5bc2a3668e784135b048483cd2966401"
        alt="Descriptive image content"
        className="object-contain w-full aspect-[1.33] max-md:max-w-full"
      />
    </section>
  );
};

export default ImageComponent;
