import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePatient } from '../context/PatientContext';
import { ArrowRight, ArrowLeft, Search, AlertCircle } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { updatePatientData } = usePatient();
  const [uhid, setUhid] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const validateUHID = (v) => {
    if (!v.trim()) return t('UHID required');
    if (v.trim().length < 3) return t('UHID min 3');
    if (!/^[a-zA-Z0-9-]+$/.test(v.trim())) return t('UHID format');
    return '';
  };

  const handleChange = (e) => {
    setUhid(e.target.value);
    if (touched) setError(validateUHID(e.target.value));
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validateUHID(uhid));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    const err = validateUHID(uhid);
    setError(err);
    if (!err) {
      updatePatientData({ uhid: uhid.trim().toUpperCase() });
      navigate('/symptoms');
    }
  };

  const hasError = touched && error;

  return (
    <div className="page-content animate-fade-in-up">
      <div className="hospital-card">
        <div className="hospital-card-body">
          <button onClick={() => navigate('/patient-type')} className="back-btn">
            <ArrowLeft size={16} /> {t('Back')}
          </button>

          <div className="step-indicator">
            <div className="step-dot active"></div>
            <div className="step-dot active"></div>
            <div className="step-dot"></div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '16px',
              background: 'linear-gradient(135deg, var(--hospital-primary) 0%, var(--hospital-primary-dark) 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.25rem',
              boxShadow: '0 4px 16px rgba(8, 145, 178, 0.3)'
            }}>
              <Search size={30} color="white" />
            </div>
            <h2 className="page-title">{t('Enter UHID')}</h2>
            <p className="page-subtitle">{t('Enter unique hospital ID')}</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <input
                type="text"
                className={`form-input ${hasError ? 'error' : ''}`}
                placeholder="e.g. PES-12345"
                value={uhid}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                style={{
                  textAlign: 'center',
                  fontSize: '16px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  padding: '1.15rem'
                }}
              />
              {hasError && (
                <div className="form-error" style={{ justifyContent: 'center' }}>
                  <AlertCircle size={14} /> {error}
                </div>
              )}
            </div>
            <button type="submit" className="btn btn-primary btn-lg btn-block">
              {t('Next')} <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
