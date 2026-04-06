import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePatient } from '../context/PatientContext';
import { Globe, ChevronRight } from 'lucide-react';

const languages = [
  { code: 'en', label: 'English', native: 'English', flag: 'EN' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी', flag: 'HI' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ', flag: 'KN' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు', flag: 'TE' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்', flag: 'TA' }
];

const LanguageSelect = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { updatePatientData } = usePatient();

  const handleSelect = (code) => {
    i18n.changeLanguage(code);
    updatePatientData({ language: code });
    navigate('/patient-type');
  };

  return (
    <div className="page-content animate-fade-in-up">
      {/* Main Card */}
      <div className="hospital-card">
        <div className="hospital-card-header">
          <h1>OPD Registration</h1>
          <p>Select your preferred language</p>
        </div>
        <div className="hospital-card-body">
          <div className="language-grid">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className="language-btn"
              >
                <div className="language-btn-icon">
                  <Globe size={20} style={{ color: 'var(--hospital-primary)' }} />
                </div>
                <div className="language-btn-content">
                  <div className="language-btn-native">{lang.native}</div>
                  <div className="language-btn-english">{lang.label}</div>
                </div>
                <ChevronRight size={20} className="language-btn-arrow" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelect;
