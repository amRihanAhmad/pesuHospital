import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePatient } from '../context/PatientContext';
import { Mic, MicOff, Check, ArrowRight, ArrowLeft, Volume2, Thermometer, Eye, Heart, Stethoscope, Bone, Sparkles, Baby, Smile, Ear } from 'lucide-react';

const DEPARTMENT_MAP = [
  { dept: "General Medicine", floor: 1, room: "101", keywords: ["fever", "cold", "cough", "body ache", "weakness"] },
  { dept: "Cardiology", floor: 2, room: "201", keywords: ["chest pain", "heart racing", "breathlessness"] },
  { dept: "Ophthalmology", floor: 2, room: "205", keywords: ["eye pain", "blurry vision", "redness", "eye problem"] },
  { dept: "Gastroenterology", floor: 1, room: "108", keywords: ["stomach pain", "vomiting", "diarrhoea", "acidity", "stomach problem"] },
  { dept: "Orthopaedics", floor: 3, room: "301", keywords: ["bone pain", "joint pain", "back pain"] },
  { dept: "Dermatology", floor: 3, room: "310", keywords: ["skin rash", "itching", "hair loss", "skin problem"] },
  { dept: "Paediatrics", floor: 4, room: "401", keywords: ["child fever", "vaccination", "child growth", "child health"] },
  { dept: "Dental", floor: 1, room: "112", keywords: ["toothache", "gum pain", "cavity", "tooth problem"] },
  { dept: "ENT", floor: 2, room: "210", keywords: ["ear pain", "hearing problem", "throat pain", "ear problem", "nose problem"] }
];

const DISPLAY_SYMPTOMS = [
  { id: "fever", label: "Fever / Cold", icon: Thermometer },
  { id: "eye", label: "Eye Problem", icon: Eye },
  { id: "chest", label: "Chest Pain", icon: Heart },
  { id: "stomach", label: "Stomach Pain", icon: Stethoscope },
  { id: "bone", label: "Bone / Joint Pain", icon: Bone },
  { id: "skin", label: "Skin Problem", icon: Sparkles },
  { id: "child", label: "Child Health", icon: Baby },
  { id: "dental", label: "Tooth / Gum Pain", icon: Smile },
  { id: "ent", label: "Ear / Nose / Throat", icon: Ear }
];

const SYMPTOM_KEYWORDS = {
  "fever": "fever", "eye": "eye problem", "chest": "chest pain",
  "stomach": "stomach pain", "bone": "bone pain", "skin": "skin problem",
  "child": "child health", "dental": "toothache", "ent": "ear problem"
};

const getDepartment = (selectedIds) => {
  const allText = selectedIds.map(id => SYMPTOM_KEYWORDS[id] || id).join(' ').toLowerCase();
  for (const mapping of DEPARTMENT_MAP) {
    if (mapping.keywords.some(kw => allText.includes(kw))) {
      const prefix = mapping.dept.substring(0, 3).toUpperCase();
      const num = String(Math.floor(Math.random() * 99) + 1).padStart(3, '0');
      return { name: mapping.dept, floor: mapping.floor, room: mapping.room, token: `${prefix}-${num}` };
    }
  }
  return { name: "General Medicine", floor: 1, room: "101", token: "GM-" + String(Math.floor(Math.random() * 99) + 1).padStart(3, '0') };
};

const Symptoms = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { patientData, updatePatientData } = usePatient();
  const [selected, setSelected] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [manualText, setManualText] = useState('');

  const hasSpeechSupport = !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  const toggleSymptom = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    const langMap = { 'en': 'en-IN', 'hi': 'hi-IN', 'kn': 'kn-IN', 'te': 'te-IN', 'ta': 'ta-IN' };
    utterance.lang = langMap[patientData.language] || 'en-IN';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const startVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    const langMap = { 'en': 'en-IN', 'hi': 'hi-IN', 'kn': 'kn-IN', 'te': 'te-IN', 'ta': 'ta-IN' };
    recognition.lang = langMap[patientData.language] || 'en-IN';
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const speech = event.results[0][0].transcript.toLowerCase();
      setVoiceText(speech);
      DISPLAY_SYMPTOMS.forEach(sym => {
        const kw = SYMPTOM_KEYWORDS[sym.id];
        if (speech.includes(kw) && !selected.includes(sym.id)) {
          setSelected(prev => [...prev, sym.id]);
        }
      });
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleSubmit = () => {
    const textInput = voiceText || manualText;
    if (selected.length === 0 && !textInput) return;
    const allInput = textInput ? [...selected, textInput] : selected;
    const deptInfo = getDepartment(allInput);
    updatePatientData({ symptoms: selected.map(id => SYMPTOM_KEYWORDS[id] || id), departmentInfo: deptInfo });
    navigate('/token');
  };

  const hasInput = selected.length > 0 || voiceText || manualText;

  return (
    <div className="page-content animate-fade-in-up">
      <div className="hospital-card">
        <div className="hospital-card-body">
          <button onClick={() => navigate(-1)} className="back-btn">
            <ArrowLeft size={16} /> {t('Back')}
          </button>

          <div className="step-indicator">
            <div className="step-dot completed"></div>
            <div className="step-dot active"></div>
            <div className="step-dot active"></div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <h2 className="page-title" style={{ margin: 0 }}>{t('Select Symptoms')}</h2>
            <button onClick={() => speakText(t('Select Symptoms'))} className="btn btn-ghost btn-icon">
              <Volume2 size={18} />
            </button>
          </div>
          <p className="page-subtitle">{t('Tap or voice')}</p>

          {/* Voice Input */}
          {hasSpeechSupport ? (
            <div className="voice-input-container">
              <button
                onClick={startVoiceInput}
                className={`voice-btn ${isListening ? 'listening' : ''}`}
              >
                {isListening ? <MicOff size={28} /> : <Mic size={28} />}
              </button>
              <div className={`voice-status ${isListening ? 'listening' : ''}`}>
                {isListening ? t('Listening') : t('Speak your symptoms')}
              </div>
            </div>
          ) : (
            <div className="voice-input-container" style={{ marginBottom: '1.5rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Type your symptoms (e.g. fever, chest pain)"
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
              />
            </div>
          )}

          {voiceText && (
            <div style={{
              padding: '0.75rem 1rem',
              background: 'var(--hospital-primary-light)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem',
              fontSize: '0.9rem',
              color: 'var(--hospital-primary)',
              textAlign: 'center',
              fontWeight: 500
            }}>
              {t('Voice captured')}: "{voiceText}"
            </div>
          )}

          {/* Symptom Grid */}
          <div className="symptom-grid">
            {DISPLAY_SYMPTOMS.map(sym => {
              const isActive = selected.includes(sym.id);
              const IconComponent = sym.icon;
              return (
                <button
                  key={sym.id}
                  onClick={() => toggleSymptom(sym.id)}
                  className={`symptom-btn ${isActive ? 'selected' : ''}`}
                >
                  <IconComponent size={24} />
                  <span>{sym.label}</span>
                </button>
              );
            })}
          </div>

          <button
            className="btn btn-primary btn-lg btn-block"
            onClick={handleSubmit}
            disabled={!hasInput}
            style={{ opacity: !hasInput ? 0.5 : 1, pointerEvents: !hasInput ? 'none' : 'auto' }}
          >
            {t('Submit')} <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Symptoms;
