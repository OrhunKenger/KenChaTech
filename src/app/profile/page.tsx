'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { User, MapPin, Phone, Mail, Package, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    
    // Verileri getir (Mock veya API eklenebilir, şimdilik localStorage + fetch)
    // Gerçek uygulamada burada /api/user/me gibi bir endpoint çağrılır.
    // Biz şimdilik basitçe localStorage'dan alıp, güncelleme için API yazacağız.
    fetchUser(parsedUser.email);
  }, []);

  const fetchUser = async (email: string) => {
      try {
          // Bu endpoint henüz yok, ama varmış gibi yazıp sonra ekleyeceğim.
          const res = await fetch(`/api/users/profile?email=${email}`);
          if (res.ok) {
              const data = await res.json();
              setFormData({
                  name: data.name,
                  phone: data.phone || '',
                  address: data.address || ''
              });
          }
      } catch (e) {
          console.error(e);
      } finally {
          setLoading(false);
      }
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
          const res = await fetch('/api/users/profile', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                  email: user.email,
                  ...formData 
              })
          });

          if (res.ok) {
              const updated = await res.json();
              localStorage.setItem('user', JSON.stringify({ ...user, name: updated.name }));
              toast.success('Profil başarıyla güncellendi.');
          } else {
              toast.error('Güncelleme başarısız.');
          }
      } catch (e) {
          toast.error('Hata oluştu.');
      }
  };

  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120]">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <User className="w-8 h-8 text-blue-500" />
            Profilim
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sol Taraf: Özet Kartı */}
            <div className="lg:col-span-1">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-3xl font-bold text-white mb-4">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user?.name}</h2>
                        <p className="text-slate-500 text-sm">{user?.email}</p>
                        <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                            {user?.role}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sağ Taraf: Düzenleme Formu */}
            <div className="lg:col-span-2">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">
                        Bilgilerimi Güncelle
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                                <User className="w-4 h-4" /> Ad Soyad
                            </label>
                            <input 
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                                <Phone className="w-4 h-4" /> Telefon
                            </label>
                            <input 
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                                <MapPin className="w-4 h-4" /> Adres
                            </label>
                            <textarea 
                                rows={3}
                                value={formData.address}
                                onChange={(e) => setFormData({...formData, address: e.target.value})}
                                className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors">
                            <Save className="w-5 h-5" /> Kaydet
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}