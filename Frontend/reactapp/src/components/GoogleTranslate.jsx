import React, { useEffect } from 'react';
import './GoogleTranslate.css';

const GoogleTranslate = () => {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      const script = document.createElement('script');
      script.src = `https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;
      script.async = true;
      document.body.appendChild(script);
    };

    addGoogleTranslateScript();

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en' },
        'google_translate_element'
      );
    };
  }, []);

  return (
    <div className="google-translate-container">
      <div id="google_translate_element" className="translate-widget"></div>
    </div>
  );
};

export default GoogleTranslate;
