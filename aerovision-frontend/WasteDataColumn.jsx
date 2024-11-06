import React from 'react';

function WasteDataColumn({ title }) {
  const wasteData = [
    { type: '塑膠', amount: '61' },
    { type: '紙張', amount: '72' },
    { type: '金屬', amount: '40' },
    { type: '食物', amount: '270' },
    { type: '玻璃', amount: '18' },
    { type: '其他', amount: '11' },
  ];

  return (
    <div data-layername="column" className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col w-full max-md:mt-10 max-md:max-w-full">
        <header className="overflow-hidden px-16 py-9 bg-purple-800 bg-opacity-80 max-md:px-5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div data-layername="column" className="flex flex-col w-[57%] max-md:ml-0 max-md:w-full">
              <h3 data-layername="廢物類別" className="text-3xl font-bold text-center text-white max-md:mt-10">
                廢物類別
              </h3>
            </div>
            <div data-layername="column" className="flex flex-col ml-5 w-[43%] max-md:ml-0 max-md:w-full">
              <h3 data-layername="數量" className="text-3xl font-bold text-center text-white max-md:mt-10">
                數量
              </h3>
            </div>
          </div>
        </header>
        <div className="flex relative z-10 flex-col items-center px-20 py-8 w-full text-3xl font-bold text-center text-black whitespace-nowrap min-h-[559px] max-md:px-5 max-md:max-w-full">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/f11a87bf9f8279e6889e12a8055ff694a6a754efb5380b190f6091a56df35ec1?placeholderIfAbsent=true&apiKey=5bc2a3668e784135b048483cd2966401" alt="" className="object-cover absolute inset-0 size-full" />
          <div className="flex relative gap-10 max-w-full w-[322px]">
            <div className="flex flex-col flex-1">
              {wasteData.map((item, index) => (
                <div key={index} data-layername={item.type} className={index > 0 ? "mt-16 max-md:mt-10" : ""}>
                  {item.type}
                </div>
              ))}
            </div>
            <div className="flex flex-col flex-1 items-center">
              {wasteData.map((item, index) => (
                <div key={index} data-layername={item.amount} className={index > 0 ? "mt-16 max-md:mt-10" : ""}>
                  {item.amount}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WasteDataColumn;
