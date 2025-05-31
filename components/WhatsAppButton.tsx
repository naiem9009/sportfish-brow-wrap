/**
 * Developed by Md Naim Hossen
 * Full Stack Developer
 *
 * WhatsApp: +880 1776-556776
 * Email: developernaim83@gmail.com
 */


'use client';

import { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';

const WhatsAppChat = () => {
  const [open, setOpen] = useState(false);

  const phoneNumber = '8801234567890'; // Replace with your number
  const defaultMessage = 'Hi, I need help!';

  const chatLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-5 right-5 z-50">
        {!open ? (
          <button
            onClick={() => setOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg"
          >
            <MessageCircle size={24} />
          </button>
        ) : (
          <div className="w-80 bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between bg-green-600 text-white px-4 py-3">
              <div className="font-semibold">Chat with us</div>
              <button onClick={() => setOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="p-4 text-sm text-gray-700">
              <p>Hello 👋, how can we help you?</p>
              <a
                href={chatLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block w-full text-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                Open WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WhatsAppChat;
