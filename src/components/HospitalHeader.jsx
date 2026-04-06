import { Phone, Clock, MapPin, HeartPulse } from 'lucide-react';

const HospitalHeader = () => {
  return (
    <header className="hospital-header">
      <div className="hospital-header-inner">
        <div className="hospital-logo">
          <div className="hospital-logo-icon">
            <HeartPulse size={24} color="white" strokeWidth={2.5} />
          </div>
          <div className="hospital-logo-text">
            <span className="hospital-name">PES Hospital</span>
            <span className="hospital-tagline">Excellence in Healthcare</span>
          </div>
        </div>
        
        <div className="hospital-header-info">
          <div className="header-info-item">
            <Clock size={16} />
            <span>24/7 Emergency</span>
          </div>
          <div className="header-info-item">
            <Phone size={16} />
            <span>+91 80 1234 5678</span>
          </div>
          <div className="emergency-badge">
            <span>&#9679;</span> Emergency: 102
          </div>
        </div>
      </div>
    </header>
  );
};

export default HospitalHeader;
