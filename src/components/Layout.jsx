import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import HospitalHeader from './HospitalHeader';
import HospitalFooter from './HospitalFooter';

const Layout = ({ children, hideFooter = false }) => {
  return (
    <>
      <HospitalHeader />
      {hideFooter && (
        <div className="staff-nav-bar">
          <Link to="/" className="staff-nav-back">
            <ArrowLeft size={16} />
            Back to Patient Portal
          </Link>
          <div className="staff-nav-title">Staff Portal</div>
        </div>
      )}
      <main className="app-container">
        {children}
      </main>
      {!hideFooter && <HospitalFooter />}
    </>
  );
};

export default Layout;
