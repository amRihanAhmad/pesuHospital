import { Phone, Mail, MapPin, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const HospitalFooter = () => {
  return (
    <footer className="hospital-footer">
      <div className="hospital-footer-inner">
        <div className="footer-contact">
          <div className="footer-contact-item">
            <Phone size={14} />
            <span>+91 80 1234 5678</span>
          </div>
          <div className="footer-contact-item">
            <Mail size={14} />
            <span>info@peshospital.edu.in</span>
          </div>
          <div className="footer-contact-item">
            <MapPin size={14} />
            <span>Hosur Road, Bengaluru</span>
          </div>
        </div>
        <div className="footer-staff-links">
          <Link to="/staff" className="footer-staff-link">
            Staff Portal
          </Link>
          <Link to="/admin" className="footer-staff-link">
            <Shield size={12} /> Admin
          </Link>
        </div>
        <div className="footer-legal">
          PES Hospital &copy; {new Date().getFullYear()}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default HospitalFooter;
