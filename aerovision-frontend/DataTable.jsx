import React from 'react';
import Navbar from './Navbar';
import MonthlyTotal from './MonthlyTotal';
import WasteDataColumn from './WasteDataColumn';

function DataTable() {
  return (
    <main className="flex overflow-hidden flex-col items-center pb-32 bg-white max-md:pb-24">
      <Navbar />
      <MonthlyTotal />
      <section className="mt-9 w-full max-w-[1155px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <WasteDataColumn title="本月總計" />
          <WasteDataColumn title="上月總計" />
        </div>
      </section>
    </main>
  );
}

export default DataTable;
