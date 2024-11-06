import React from 'react';
import Navbar from './Navbar';
import UploadSection from './UploadSection';
import UploadButton from './UploadButton';

function UploadPhoto() {
  return (
    <main className="flex overflow-hidden flex-col items-center pb-16 bg-white">
      <Navbar />
      <h1 className="mt-24 text-5xl font-bold text-center text-sky-950 max-md:mt-10 max-md:text-4xl">
        上傳廢棄物照片
      </h1>
      <UploadSection />
      <UploadButton />
    </main>
  );
}

export default UploadPhoto;
