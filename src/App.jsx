import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import Layout from './components/Layout';
import LanguageSelect from './pages/LanguageSelect';
import PatientType from './pages/PatientType';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Symptoms from './pages/Symptoms';
import TokenSlip from './pages/TokenSlip';
import StaffDashboard from './pages/StaffDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><LanguageSelect /></Layout>} />
        <Route path="/patient-type" element={<Layout><PatientType /></Layout>} />
        <Route path="/register" element={<Layout><Registration /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/symptoms" element={<Layout><Symptoms /></Layout>} />
        <Route path="/token" element={<Layout hideFooter><TokenSlip /></Layout>} />
        <Route path="/staff" element={<Layout><StaffDashboard /></Layout>} />
        <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
