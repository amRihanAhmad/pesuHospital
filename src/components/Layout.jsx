import HospitalHeader from './HospitalHeader';
import HospitalFooter from './HospitalFooter';

const Layout = ({ children, hideFooter = false }) => {
  return (
    <>
      <HospitalHeader />
      <main className="app-container">
        {children}
      </main>
      {!hideFooter && <HospitalFooter />}
    </>
  );
};

export default Layout;
