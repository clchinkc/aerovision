import React from 'react';

function UploadSection() {
  return (
    <section className="flex relative flex-col items-center px-20 pt-32 pb-60 mt-14 w-full text-2xl text-center whitespace-nowrap max-w-[1018px] min-h-[582px] text-black text-opacity-50 max-md:px-5 max-md:py-24 max-md:mt-10 max-md:max-w-full">
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/6262a4a126ba248e1230f419e4857ae15477da8fb56996bc542a57ee475117e9?placeholderIfAbsent=true&apiKey=5bc2a3668e784135b048483cd2966401" alt="" className="object-cover absolute inset-0 size-full" />
      <div className="flex relative flex-col mb-0 max-w-full w-[267px] max-md:mb-2.5">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/79fba5c5d1f556f6d7f350f2d37707a1c5128ddba836f3b8eb2e9bbe4b08e04b?placeholderIfAbsent=true&apiKey=5bc2a3668e784135b048483cd2966401" alt="Upload icon" className="object-contain w-full aspect-[1.41]" />
        <p>照片格式必須為jpg/png</p>
      </div>
    </section>
  );
}

export default UploadSection;
