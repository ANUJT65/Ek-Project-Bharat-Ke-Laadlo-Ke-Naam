import React, { useEffect } from 'react';

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
        { pageLanguage: 'en' }, // Set your default page language
        'google_translate_element'
      );
    };
  }, []);

  return (
    <div className="google-translate-container">
      <div id="google_translate_element"></div>
    </div>
  );
};

export default GoogleTranslate;
