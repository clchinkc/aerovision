import React from 'react';
import DetectionResults from './DetectionResults';
import WasteCategories from './WasteCategories';

function MainContent() {
  return (
    <main className="mt-28 ml-8 w-full max-w-[1202px] max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <DetectionResults />
        <WasteCategories />
      </div>
    </main>
  );
}

export default MainContent;
