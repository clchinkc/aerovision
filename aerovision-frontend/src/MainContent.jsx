import React, { useState } from 'react';
import DetectionResults from './components/DetectionResults';
import WasteCategories from './components/WasteCategories';

function MainContent() {
  const [analysisData, setAnalysisData] = useState(null);

  const handleAnalysisComplete = (data) => {
    setAnalysisData(data);
  };

  return (
    <main className="mt-28 ml-8 w-full max-w-[1202px] max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <DetectionResults onAnalysisComplete={handleAnalysisComplete} />
        <WasteCategories analysisData={analysisData} />
      </div>
    </main>
  );
}

export default MainContent;
