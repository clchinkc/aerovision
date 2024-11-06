import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import MonthlyTotal from './components/MonthlyTotal';
import WasteDataColumn from './components/WasteDataColumn';
import { api } from './services/api';

function DataTable() {
  const location = useLocation();
  const [historicalData, setHistoricalData] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [historyResult, statsResult] = await Promise.all([
          api.getHistory(),
          api.getStatistics()
        ]);
        setHistoricalData(historyResult);
        setStatistics(statsResult);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="flex overflow-hidden flex-col items-center pb-32 bg-white max-md:pb-24">
      <Navbar />
      <MonthlyTotal statistics={statistics} />
      <section className="mt-9 w-full max-w-[1155px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <WasteDataColumn 
            title="本月總計" 
            data={historicalData?.slice(-1)[0]}
          />
          <WasteDataColumn 
            title="上月總計" 
            data={historicalData?.slice(-2)[0]}
          />
        </div>
      </section>
    </main>
  );
}

export default DataTable;
