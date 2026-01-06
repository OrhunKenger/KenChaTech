'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validasyonlar
    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor.');
      return;
    }

    if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
       setError('Lütfen geçerli bir telefon numarası girin.');
       return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          address: formData.address
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Kayıt başarılı! Giriş yapabilirsiniz.');
        router.push('/login');
      } else {
        setError(data.error || 'Kayıt başarısız.');
      }
    } catch (err) {
      setError('Bir hata oluştu.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-xl w-full bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-8">Kayıt Ol</h2>
          
          {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
             <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Ad Soyad</label>
              <input 
                type="text" 
                name="name"
                required 
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">E-posta</label>
                  <input 
                    type="email" 
                    name="email"
                    required 
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Telefon</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required 
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="05..."
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Adres</label>
              <textarea 
                name="address"
                required 
                value={formData.address}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Şifre</label>
                  <input 
                    type="password" 
                    name="password"
                    required 
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Şifre Tekrar</label>
                  <input 
                    type="password" 
                    name="confirmPassword"
                    required 
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
            </div>
            
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors mt-4">
              Kayıt Ol
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-slate-500">
            Zaten hesabınız var mı? <Link href="/login" className="text-blue-600 hover:underline">Giriş Yap</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}