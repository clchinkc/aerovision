import React from 'react';

function WasteCategories() {
  const categories = [
    { name: '塑膠', amount: '0.7' },
    { name: '紙張', amount: '0.8' },
    { name: '金屬', amount: '0.4' },
    { name: '食物', amount: '2.1' },
    { name: '玻璃', amount: '0.1' },
    { name: '其他', amount: '0' },
  ];

  return (
    <section className="flex flex-col ml-5 w-[45%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col mt-9 w-full max-md:mt-10 max-md:max-w-full">
        <div className="px-14 py-11 border-2 border-black border-solid bg-purple-800 bg-opacity-80 max-md:px-5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <h3 className="w-[57%] text-4xl font-bold text-center text-white max-md:mt-10 max-md:w-full">
              廢物類別
            </h3>
            <h3 className="w-[43%] text-4xl font-bold text-center text-white max-md:mt-10 max-md:w-full">
              數量
            </h3>
          </div>
        </div>
        <div className="px-20 py-9 bg-white border-2 border-black border-solid max-md:px-5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[56%] max-md:ml-0 max-md:w-full">
              {categories.map((category, index) => (
                <div key={index} className="text-4xl font-bold text-center whitespace-nowrap text-stone-950 max-md:mt-10">
                  {category.name}
                </div>
              ))}
            </div>
            <div className="flex flex-col ml-5 w-[44%] max-md:ml-0 max-md:w-full">
              {categories.map((category, index) => (
                <div key={index} className="text-4xl font-bold text-center whitespace-nowrap text-stone-950 max-md:mt-10">
                  {category.amount}
                </div>
              ))}
            </div>
          </div>
        </div>
        <button className="gap-2 self-center px-8 py-4 mt-10 ml-3 max-w-full text-xl font-bold text-white whitespace-nowrap bg-purple-800 border border-purple-800 border-solid min-h-[63px] rounded-[500px] w-[233px] max-md:px-5">
          上傳至數據庫
        </button>
      </div>
    </section>
  );
}

export default WasteCategories;
