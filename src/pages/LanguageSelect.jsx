import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePatient } from '../context/PatientContext';
import { Globe, ChevronRight, Camera, X, QrCode } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';

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
  const [showScanner, setShowScanner] = useState(false);
  const [scannerError, setScannerError] = useState('');
  const scannerRef = useRef(null);
  const html5QrCodeRef = useRef(null);

  const handleSelect = (code) => {
    i18n.changeLanguage(code);
    updatePatientData({ language: code });
    navigate('/patient-type');
  };

  const openScanner = async () => {
    setShowScanner(true);
    setScannerError('');
  };

  const closeScanner = async () => {
    if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
      try {
        await html5QrCodeRef.current.stop();
      } catch (err) {
        console.log('Scanner stop error:', err);
      }
    }
    setShowScanner(false);
  };

  useEffect(() => {
    if (!showScanner) return;

    const startScanner = async () => {
      try {
        html5QrCodeRef.current = new Html5Qrcode("qr-reader");
        await html5QrCodeRef.current.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            if (decodedText) {
              closeScanner();
              window.location.href = decodedText;
            }
          },
          (errorMessage) => {
            // Ignore scan errors, keep scanning
          }
        );
      } catch (err) {
        setScannerError('Camera access denied or not available. Please allow camera permissions.');
        console.log('Scanner error:', err);
      }
    };

    const timer = setTimeout(startScanner, 300);
    return () => clearTimeout(timer);
  }, [showScanner]);

  return (
    <div className="page-content animate-fade-in-up">
      {/* Scanner Modal */}
      {showScanner && (
        <div className="scanner-modal-overlay" onClick={closeScanner}>
          <div className="scanner-modal" onClick={(e) => e.stopPropagation()}>
            <div className="scanner-header">
              <h3>Scan QR Code</h3>
              <button className="scanner-close-btn" onClick={closeScanner}>
                <X size={24} />
              </button>
            </div>
            <div className="scanner-body">
              <div id="qr-reader" ref={scannerRef}></div>
              {scannerError && (
                <div className="scanner-error">{scannerError}</div>
              )}
              <p className="scanner-hint">Point your camera at the QR code to open the app</p>
            </div>
          </div>
        </div>
      )}

      {/* QR Scanner Banner */}
      <div className="qr-scanner-banner">
        <div className="qr-scanner-icon">
          <QrCode size={24} />
        </div>
        <div className="qr-scanner-content">
          <div className="qr-scanner-title">Scan QR Code to Open App</div>
          <div className="qr-scanner-desc">Use your phone's camera to scan and start registration</div>
        </div>
        <button className="qr-scanner-btn" onClick={openScanner}>
          <Camera size={20} />
          Scan
        </button>
      </div>

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
