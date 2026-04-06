import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePatient } from '../context/PatientContext';
import { CheckCircle2, Printer, Home, MapPin, Clock, Building2, Copy, Check } from 'lucide-react';
import { useState, useMemo } from 'react';

const TokenSlip = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { patientData, resetPatientData } = usePatient();
  const [uhidCopied, setUhidCopied] = useState(false);

  const handleDone = () => {
    resetPatientData();
    navigate('/');
  };

  if (!patientData.departmentInfo) {
    return (
      <div className="page-content">
        <div className="hospital-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{t('No token data')}</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>{t('Go Home')}</button>
        </div>
      </div>
    );
  }

  const { name: dept, floor, room, token } = patientData.departmentInfo;
  const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const generatedUHID = useMemo(() => {
    if (patientData.uhid) return patientData.uhid;
    return `PES-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  }, [patientData.uhid]);

  const copyUHID = () => {
    navigator.clipboard.writeText(generatedUHID).then(() => {
      setUhidCopied(true);
      setTimeout(() => setUhidCopied(false), 2000);
    });
  };

  return (
    <div className="page-content animate-fade-in-up">
      <div className="token-slip">
        {/* Header */}
        <div className="token-slip-header">
          <div className="token-slip-success-icon">
            <CheckCircle2 size={32} />
          </div>
          <div className="token-slip-title">{t('Registration Complete')}</div>
          <div className="token-slip-subtitle">{t('Your Token')}</div>
        </div>

        {/* Body */}
        <div className="token-slip-body">
          {/* Token Number */}
          <div className="token-number-display">
            <div className="token-label">Your Queue Number</div>
            <div className="token-number">{token}</div>
          </div>

          {/* UHID Card */}
          <div className="uhid-card">
            <div className="uhid-info">
              <div className="uhid-label">{t('Your UHID')}</div>
              <div className="uhid-value">{generatedUHID}</div>
              <div className="uhid-hint">{t('Save UHID')}</div>
            </div>
            <button onClick={copyUHID} className="btn btn-secondary btn-icon" style={{ flexShrink: 0 }}>
              {uhidCopied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>

          {/* Details */}
          <div className="token-details">
            <div className="token-detail-row">
              <div className="token-detail-icon">
                <Building2 size={18} />
              </div>
              <div>
                <div className="token-detail-label">{t('Department')}</div>
                <div className="token-detail-value">{dept}</div>
              </div>
            </div>
            <div className="token-detail-row">
              <div className="token-detail-icon">
                <MapPin size={18} />
              </div>
              <div>
                <div className="token-detail-label">{t('Floor')} & {t('Room')}</div>
                <div className="token-detail-value">{t('Floor')} {floor} — {t('Room')} {room || 'N/A'}</div>
              </div>
            </div>
            <div className="token-detail-row">
              <div className="token-detail-icon">
                <Clock size={18} />
              </div>
              <div>
                <div className="token-detail-label">{t('Time')}</div>
                <div className="token-detail-value">{timeNow}</div>
              </div>
            </div>
          </div>

          {/* Date */}
          <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {today}
          </div>

          {/* Actions */}
          <div className="token-slip-actions">
            <button className="btn btn-secondary" onClick={() => window.print()}>
              <Printer size={18} /> {t('Print')}
            </button>
            <button className="btn btn-primary" onClick={handleDone}>
              <Home size={18} /> {t('Finish')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenSlip;
