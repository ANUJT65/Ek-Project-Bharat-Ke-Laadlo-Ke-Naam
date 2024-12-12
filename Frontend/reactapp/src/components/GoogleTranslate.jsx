import React, { useEffect } from 'react';
import './GoogleTranslate.css';

const GoogleTranslate = () => {
  useEffect(() => {
    const scriptLoaded = document.querySelector('script[src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]');

    if (!scriptLoaded) {
      const addGoogleTranslateScript = () => {
        const script = document.createElement('script');
        script.src = `https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;
        script.async = true;
        document.body.appendChild(script);
      };

      const customizeGoogleTranslate = () => {
        // MutationObserver to watch for changes in the DOM
        const observer = new MutationObserver(() => {
          const frame = document.querySelector('iframe');
          if (frame) {
            const iframeDocument = frame.contentDocument || frame.contentWindow.document;
            const languageSelect = iframeDocument.querySelector('.goog-te-combo');
            if (languageSelect) {
              // Hide languages except 'en' (English)
              [...languageSelect.options].forEach(option => {
                if (option.value !== 'en') {
                  option.style.display = 'none';
                }
              });
              observer.disconnect(); // Stop observing once the changes are made
            }
          }
        });

        observer.observe(document.body, { childList: true, subtree: true });
      };

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en', includedLanguages: 'en,hi,bn,gu,kn,ml,mr,pa,ta,te' }, // All Indian languages
          'google_translate_element'
        );
        customizeGoogleTranslate(); // Customize the dropdown after initialization
      };

      addGoogleTranslateScript();
    }
  }, []);

  return (
    <div className="google-translate-container">
      <div id="google_translate_element" className="translate-widget"></div>
    </div>
  );
};

export default GoogleTranslate;
