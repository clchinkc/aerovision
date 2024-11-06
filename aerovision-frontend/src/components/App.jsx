import React from 'react';
import Navbar from './NavbarComponents/Navbar';
import MainContent from './MainContent/MainContent';

function App() {
  return (
    <div className="flex overflow-hidden flex-col pb-12 bg-white">
      <Navbar />
      <MainContent />
    </div>
  );
}

export default App;
