'use client';

import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2000); // 2 saniye göster
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 flex items-center justify-center animate-out fade-out duration-700 delay-1000 fill-mode-forwards pointer-events-none">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white tracking-tighter mb-4 animate-in zoom-in duration-500">
          KenCha<span className="text-blue-600">Tech</span>
        </h1>
        <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}
