'use client';

import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function WhatsappButton() {
  const [isOpen, setIsOpen] = useState(false);

  const numbers = [
    { number: '905310140429', label: 'Destek Hattı 1' },
    { number: '905522233789', label: 'Destek Hattı 2' },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 items-start">
      {isOpen && (
        <div className="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-xl flex flex-col gap-2 animate-in slide-in-from-bottom-5 fade-in duration-300 border border-slate-200 dark:border-slate-700">
          {numbers.map((item) => (
            <a
              key={item.number}
              href={`https://wa.me/${item.number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md transition-colors text-slate-700 dark:text-slate-200 whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-green-500" />
              <span className="font-medium text-sm">{item.label}</span>
            </a>
          ))}
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
        aria-label="WhatsApp Destek"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
