import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import WasteDetectionResult from './components/WasteDetectionResult';

function MyComponent() {
  const location = useLocation();
  const analysisResult = location.state?.analysisResult;

  return (
    <div className="flex overflow-hidden flex-col pb-16 bg-white">
      <Navbar />
      <WasteDetectionResult initialResult={analysisResult} />
    </div>
  );
}

export default MyComponent;
