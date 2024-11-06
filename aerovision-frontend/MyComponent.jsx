import React from 'react';
import Navbar from './NavbarComponents/Navbar';
import WasteDetectionResult from './WasteDetectionComponents/WasteDetectionResult';

function MyComponent() {
  return (
    <div data-layername="資料標示" className="flex overflow-hidden flex-col pb-16 bg-white">
      <Navbar />
      <WasteDetectionResult />
    </div>
  );
}

export default MyComponent;
