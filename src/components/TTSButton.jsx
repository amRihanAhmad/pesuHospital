import { Volume2 } from 'lucide-react';

const TTSButton = ({ text, lang = 'en-IN' }) => {
  const speak = () => {
    if (!('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    
    const langMap = {
      'en': 'en-IN',
      'hi': 'hi-IN',
      'kn': 'kn-IN',
      'te': 'te-IN',
      'ta': 'ta-IN'
    };
    utterance.lang = langMap[lang] || 'en-IN';
    
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button 
      onClick={speak} 
      className="btn btn-ghost btn-icon"
      title="Read Aloud"
    >
      <Volume2 size={20} />
    </button>
  );
};

export default TTSButton;
