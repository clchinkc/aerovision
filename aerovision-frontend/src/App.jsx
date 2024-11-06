import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UploadPhoto from './UploadPhoto';
import MyComponent from './MyComponent';
import DataTable from './DataTable';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main routes */}
        <Route path="/" element={<Navigate to="/upload" replace />} />
        <Route path="/upload" element={<UploadPhoto />} />
        <Route path="/analysis" element={<MyComponent />} />
        <Route path="/data" element={<DataTable />} />
        
        {/* Redirect unknown routes to upload page */}
        <Route path="*" element={<Navigate to="/upload" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
