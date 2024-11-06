import React from 'react';
import InputField from './InputField';

function DetectionResults() {
  return (
    <section className="flex flex-col w-[55%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
        <h2 className="self-start text-5xl font-bold text-blue-950 text-opacity-80 max-md:max-w-full max-md:text-4xl">
          總計廢棄物偵測結果
        </h2>
        <div className="flex flex-col items-start pl-16 mt-14 w-full max-md:pl-5 max-md:mt-10 max-md:max-w-full">
          <div className="ml-7 max-w-full w-[407px] max-md:ml-2.5">
            <div className="flex gap-5 max-md:flex-col">
              <div className="flex flex-col w-[38%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col items-start self-stretch my-auto text-xl font-bold whitespace-nowrap text-blue-950 max-md:mt-10">
                  <label htmlFor="photoDate" className="self-stretch">拍攝照片日期</label>
                  <label htmlFor="flightNumber" className="mt-14 max-md:mt-10">航班編號</label>
                  <label htmlFor="totalWeight" className="mt-11 max-md:mt-10">廢物總重量</label>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[62%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col w-full text-base whitespace-nowrap text-blue-950 max-md:mt-10">
                  <InputField id="photoDate" placeholder="DD/MM/YYYY" />
                  <InputField id="flightNumber" placeholder="UO***" />
                  <InputField id="totalWeight" placeholder="以公斤為單位" />
                </div>
              </div>
            </div>
          </div>
          <img src="http://b.io/screenshot" alt="Waste detection results chart" className="flex shrink-0 mt-6 h-[396px] max-md:max-w-full" />
          <button className="gap-2 self-center px-8 py-4 mt-5 ml-10 max-w-full text-xl font-bold text-purple-800 whitespace-nowrap border border-purple-800 border-solid min-h-[62px] rounded-[500px] w-[236px] max-md:px-5">
            清除所有
          </button>
        </div>
      </div>
    </section>
  );
}

export default DetectionResults;
