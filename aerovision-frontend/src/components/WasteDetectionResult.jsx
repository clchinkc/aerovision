import React, { useState, useEffect } from 'react';
import DateInput from './DateInput';
import FlightInput from './FlightInput';
import WeightInput from './WeightInput';
import Button from './Button';
import { api } from '../services/api';

function WasteDetectionResult() {
  const [flightId, setFlightId] = useState('');
  const [totalWeight, setTotalWeight] = useState('');
  const [date, setDate] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [wasteTypes, setWasteTypes] = useState([]);
  const [isManualMode, setIsManualMode] = useState(false);
  const [manualItems, setManualItems] = useState([]);

  useEffect(() => {
    // Fetch waste types when component mounts
    api.getWasteTypes().then(setWasteTypes).catch(console.error);
  }, []);

  const handleImageUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if (!file) return;

      const result = await api.uploadImage(file, flightId, parseFloat(totalWeight));
      setAnalysisResult(result);
      setError(null);
    } catch (err) {
      setError('Failed to analyze image');
      console.error(err);
    }
  };

  const handleManualSubmit = async () => {
    try {
      const result = await api.submitManualAnalysis(
        manualItems,
        flightId,
        parseFloat(totalWeight)
      );
      setAnalysisResult(result);
      setError(null);
    } catch (err) {
      setError('Failed to submit manual analysis');
      console.error(err);
    }
  };

  const handleAddManualItem = () => {
    setManualItems([
      ...manualItems,
      { waste_type: wasteTypes[0], quantity: 0, recyclable: false }
    ]);
  };

  const handleUpdateManualItem = (index, field, value) => {
    const updatedItems = [...manualItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setManualItems(updatedItems);
  };

  const handleClear = () => {
    setAnalysisResult(null);
    setError(null);
    setManualItems([]);
  };

  return (
    <main className="mt-24 ml-8 w-full max-w-[1237px] max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <section className="flex flex-col w-[56%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow mt-3 max-md:mt-10 max-md:max-w-full">
            <h1 className="self-start text-5xl font-bold text-blue-950 text-opacity-80 max-md:max-w-full max-md:text-4xl">
              總計廢棄物偵測結果
            </h1>
            
            <div className="flex justify-end mb-4">
              <Button
                text={isManualMode ? "照片模式" : "手動模式"}
                variant="outline"
                onClick={() => setIsManualMode(!isManualMode)}
              />
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            <div className="flex flex-col items-start pl-16 mt-10 w-full max-md:pl-5 max-md:max-w-full">
              <DateInput 
                id="photoDate" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <FlightInput 
                id="flightNumber"
                value={flightId}
                onChange={(e) => setFlightId(e.target.value)}
              />
              <WeightInput 
                id="totalWeight"
                value={totalWeight}
                onChange={(e) => setTotalWeight(e.target.value)}
              />

              {isManualMode ? (
                <div className="w-full mt-6">
                  <Button
                    text="新增廢棄物項目"
                    variant="outline"
                    onClick={handleAddManualItem}
                  />
                  
                  {manualItems.map((item, index) => (
                    <div key={index} className="flex gap-4 mt-4">
                      <select
                        value={item.waste_type}
                        onChange={(e) => handleUpdateManualItem(index, 'waste_type', e.target.value)}
                        className="p-2 border rounded"
                      >
                        {wasteTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleUpdateManualItem(index, 'quantity', parseFloat(e.target.value))}
                        className="p-2 border rounded"
                        placeholder="重量 (kg)"
                      />
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={item.recyclable}
                          onChange={(e) => handleUpdateManualItem(index, 'recyclable', e.target.checked)}
                          className="mr-2"
                        />
                        可回收
                      </label>
                    </div>
                  ))}
                  
                  <Button
                    text="提交"
                    variant="primary"
                    onClick={handleManualSubmit}
                    className="mt-6"
                  />
                </div>
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mt-6"
                />
              )}

              {analysisResult && (
                <div className="mt-6 w-full">
                  <h2 className="text-2xl font-bold mb-4">分析結果</h2>
                  <div className="bg-white p-4 rounded shadow">
                    <p>可見重量: {analysisResult.analysis.visible_weight} kg</p>
                    {analysisResult.analysis.hidden_weight && (
                      <p>隱藏重量: {analysisResult.analysis.hidden_weight} kg</p>
                    )}
                    <h3 className="font-bold mt-4 mb-2">廢棄物明細:</h3>
                    <ul>
                      {analysisResult.analysis.items.map((item, index) => (
                        <li key={index} className="mb-2">
                          {item.waste_type}: {item.quantity} kg 
                          ({item.recyclable ? '可回收' : '不可回收'})
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <Button 
                text="清除所有" 
                variant="outline" 
                className="self-center mt-5 ml-14"
                onClick={handleClear}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default WasteDetectionResult;
