import React from 'react';

function MonthlyTotal() {
  return (
    <section className="flex flex-wrap gap-5 justify-between mt-28 max-w-full text-3xl font-bold text-center text-black whitespace-nowrap w-[753px] max-md:mt-10">
      <h2 data-layername="本月總計">本月總計</h2>
      <h2 data-layername="上月總計">上月總計</h2>
    </section>
  );
}

export default MonthlyTotal;
