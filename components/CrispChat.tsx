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
    $crisp: any[];
    CRISP_WEBSITE_ID: string;
  }
}

const CrispChat = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = '618876cd-153e-4e4c-bc4b-b3cf210dad0d';

      const script = document.createElement('script');
      script.src = 'https://client.crisp.chat/l.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return null;
};

export default CrispChat
