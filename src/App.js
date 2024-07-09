
import Header from './Components/Header';
import Footer from './Components/Footer';
import Dashboard from './Components/Dashboard';
import Home from './Pages/Home';
import Transactions from './Pages/Transactions';
import TransactionsTable from './Components/Dashboard';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';


function MainLayout() {
  const location = useLocation();
  const isDashboard = location.pathname === '/';

  return (
    <div className="flex">
      <Header />
      <div className="w-full" style={{ backgroundColor: '#FFA07A' }}>
        {!isDashboard && (
          <div className="mx-16 pt-5 bg-slate-100 shadow-2xl rounded-lg">
            <Routes>
              
              <Route path="/transactions" element={<Transactions />} />
              {/* Add more routes for other pages/components as needed */}
            </Routes>
          </div>
        )}
        {isDashboard && (
          <div className="mx-36 pt-5  rounded-lg">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* Add more routes for other pages/components as needed */}
          </Routes>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;


