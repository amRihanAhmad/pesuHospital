import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePatient } from '../context/PatientContext';
import { UserPlus, UserCheck, ArrowLeft } from 'lucide-react';

const PatientType = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { updatePatientData } = usePatient();

  const handleSelection = (isNew) => {
    updatePatientData({ isNew });
    navigate(isNew ? '/register' : '/login');
  };

  return (
    <div className="page-content animate-fade-in-up">
      <div className="hospital-card">
        <div className="hospital-card-body">
          <button onClick={() => navigate('/')} className="back-btn">
            <ArrowLeft size={16} /> {t('Back')}
          </button>

          <h2 className="page-title">{t('Are you a new or returning patient?')}</h2>
          <p className="page-subtitle">{t('Select one to continue')}</p>

          <div className="patient-type-grid">
            <button onClick={() => handleSelection(true)} className="patient-type-card">
              <div className="patient-type-icon">
                <UserPlus size={28} />
              </div>
              <div className="patient-type-title">{t('New Patient')}</div>
              <div className="patient-type-desc">{t('First time visiting')}</div>
            </button>

            <button onClick={() => handleSelection(false)} className="patient-type-card">
              <div className="patient-type-icon">
                <UserCheck size={28} />
              </div>
              <div className="patient-type-title">{t('Returning Patient')}</div>
              <div className="patient-type-desc">{t('Already have UHID')}</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientType;
