'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.user.role === 'ADMIN') {
           router.push('/admin');
        } else {
           setError('Bu alana erişim yetkiniz yok.');
           setLoading(false);
        }
      } else {
        setError('Giriş başarısız.');
        setLoading(false);
      }
    } catch (err) {
      setError('Hata oluştu.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700">
        <div className="flex justify-center mb-6">
           <div className="p-4 bg-slate-700 rounded-full">
             <Lock className="w-8 h-8 text-blue-500" />
           </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-white mb-8 tracking-wide">YÖNETİCİ GİRİŞİ</h2>
        
        {error && <div className="bg-red-900/50 text-red-200 border border-red-800 p-3 rounded-lg mb-4 text-sm text-center">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">E-posta</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Şifre</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                GİRİŞ YAPILIYOR...
              </>
            ) : 'GİRİŞ YAP'}
          </button>
        </form>
      </div>
    </div>
  );
}
