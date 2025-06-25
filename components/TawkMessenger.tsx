/**
 * Developed by Md Naim Hossen
 * Full Stack Developer
 *
 * WhatsApp: +880 1776-556776
 * Email: developernaim83@gmail.com
 */

'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

const TawkMessenger: React.FC = () => {
  useEffect(() => {
    const scriptId = 'tawk-script';

    if (document.getElementById(scriptId)) return;

    window.Tawk_LoadStart = new Date();

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://embed.tawk.to/683b20fda963cb190c3fac95/1isjfhnjc';
    script.async = true;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
      delete window.Tawk_API;
      delete window.Tawk_LoadStart;
    };
  }, []);

  return null;
};

export default TawkMessenger;
