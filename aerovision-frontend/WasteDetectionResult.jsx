import React from 'react';
import DateInput from './DateInput';
import FlightInput from './FlightInput';
import WeightInput from './WeightInput';
import WasteChart from './WasteChart';
import Button from './Button';

function WasteDetectionResult() {
  return (
    <main className="mt-24 ml-8 w-full max-w-[1237px] max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <section data-layername="column" className="flex flex-col w-[56%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow mt-3 max-md:mt-10 max-md:max-w-full">
            <h1 data-layername="總計廢棄物偵測結果" className="self-start text-5xl font-bold text-blue-950 text-opacity-80 max-md:max-w-full max-md:text-4xl">
              總計廢棄物偵測結果
            </h1>
            <div className="flex flex-col items-start pl-16 mt-10 w-full max-md:pl-5 max-md:max-w-full">
              <div className="max-w-full w-[407px] max-md:ml-1">
                <div className="flex gap-5 max-md:flex-col">
                  <div data-layername="column" className="flex flex-col w-[38%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col items-start self-stretch my-auto text-xl font-bold whitespace-nowrap text-blue-950 max-md:mt-10">
                      <label htmlFor="photoDate" className="self-stretch">拍攝照片日期</label>
                      <label htmlFor="flightNumber" className="mt-14 max-md:mt-10">航班編號</label>
                      <label htmlFor="totalWeight" className="mt-11 max-md:mt-10">廢物總重量</label>
                    </div>
                  </div>
                  <div data-layername="column" className="flex flex-col ml-5 w-[62%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col w-full text-base whitespace-nowrap text-blue-950 max-md:mt-10">
                      <DateInput id="photoDate" />
                      <FlightInput id="flightNumber" />
                      <WeightInput id="totalWeight" />
                    </div>
                  </div>
                </div>
              </div>
              <WasteChart />
              <Button text="清除所有" variant="outline" className="self-center mt-5 ml-14" />
            </div>
          </div>
        </section>
        <aside data-layername="column" className="flex flex-col ml-5 w-[44%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col w-full max-md:mt-10 max-md:max-w-full">
            <div className="overflow-hidden px-16 py-9 bg-purple-800 bg-opacity-80 max-md:px-5 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col">
                <div data-layername="column" className="flex flex-col w-[57%] max-md:ml-0 max-md:w-full">
                  <h2 data-layername="廢物類別" className="text-3xl font-bold text-center text-white max-md:mt-10">
                    廢物類別
                  </h2>
                </div>
                <div data-layername="column" className="flex flex-col ml-5 w-[43%] max-md:ml-0 max-md:w-full">
                  <h2 data-layername="數量" className="text-3xl font-bold text-center text-white max-md:mt-10">
                    數量
                  </h2>
                </div>
              </div>
            </div>
            <div className="flex relative z-10 flex-col items-center px-20 py-8 w-full text-3xl font-bold text-center text-black whitespace-nowrap min-h-[559px] max-md:px-5 max-md:max-w-full">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/f11a87bf9f8279e6889e12a8055ff694a6a754efb5380b190f6091a56df35ec1?placeholderIfAbsent=true&apiKey=5bc2a3668e784135b048483cd2966401" alt="" className="object-cover absolute inset-0 size-full" />
              <div className="flex relative gap-10 max-w-full w-[318px]">
                <div className="flex flex-col flex-1">
                  <div data-layername="塑膠">塑膠</div>
                  <div data-layername="紙張" className="mt-16 max-md:mt-10">紙張</div>
                  <div data-layername="金屬" className="mt-16 max-md:mt-10 max-md:mr-0.5">金屬</div>
                  <div data-layername="食物" className="mt-16 max-md:mt-10">食物</div>
                  <div data-layername="玻璃" className="mt-16 max-md:mt-10">玻璃</div>
                </div>
                <div className="flex flex-col flex-1">
                  <div data-layername="07" className="self-start">0.7</div>
                  <div data-layername="08" className="mt-16 max-md:mt-10">0.8</div>
                  <div data-layername="04" className="mt-16 max-md:mt-10">0.4</div>
                  <div className="flex flex-col px-1.5 mt-20 max-md:mt-10">
                    <div data-layername="21">2.1</div>
                    <div data-layername="01" className="mt-16 max-md:mt-10">0.1</div>
                  </div>
                </div>
              </div>
              <div className="flex relative gap-5 justify-between mt-16 max-w-full w-[302px] max-md:mt-10">
                <div data-layername="其他">其他</div>
                <div data-layername="0" className="my-auto">0</div>
              </div>
            </div>
            <Button text="上傳至數據庫" variant="primary" className="self-center mt-16 max-md:mt-10" />
          </div>
        </aside>
      </div>
    </main>
  );
}

export default WasteDetectionResult;
