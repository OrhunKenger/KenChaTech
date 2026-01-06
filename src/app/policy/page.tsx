'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsappButton from '@/components/WhatsappButton';
import GeminiChat from '@/components/GeminiChat';
import { useState } from 'react';

export default function PolicyPage() {
  const [activeTab, setActiveTab] = useState<'return' | 'delivery' | 'privacy' | 'sales'>('delivery');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row min-h-[600px]">
          
          {/* Sidebar */}
          <div className="w-full md:w-1/4 bg-slate-100 dark:bg-slate-800 p-4 border-r border-slate-200 dark:border-slate-700">
             <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 px-2">Politikalar</h2>
             <div className="flex flex-col space-y-2">
               <button 
                 onClick={() => setActiveTab('delivery')}
                 className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'delivery' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
               >
                 Teslimat Politikası
               </button>
               <button 
                 onClick={() => setActiveTab('return')}
                 className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'return' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
               >
                 İade Koşulları
               </button>
               <button 
                 onClick={() => setActiveTab('privacy')}
                 className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'privacy' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
               >
                 Gizlilik Sözleşmesi
               </button>
               <button 
                 onClick={() => setActiveTab('sales')}
                 className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'sales' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
               >
                 Satış Sözleşmesi
               </button>
             </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-3/4 p-8 overflow-y-auto max-h-[800px]">
            {activeTab === 'delivery' && (
              <div className="prose dark:prose-invert max-w-none animate-in fade-in">
                <h2>Teslimat Politikası</h2>
                <p>KenChaTech olarak, siparişlerinizi en hızlı şekilde size ulaştırmayı hedefliyoruz.</p>
                <ul>
                  <li><strong>Aynı Gün Kargo:</strong> Saat 16:00'a kadar verilen tüm siparişler aynı gün kargoya teslim edilir.</li>
                  <li><strong>Hızlı Teslimat:</strong> Anlaşmalı kargo firmalarımızla Türkiye'nin her yerine 1-3 iş günü içinde teslimat sağlanır.</li>
                  <li><strong>Kargo Takibi:</strong> Siparişiniz kargoya verildiğinde size SMS ve e-posta yoluyla takip numarası iletilir.</li>
                  <li><strong>Sigortalı Gönderim:</strong> Tüm ürünlerimiz taşıma sırasında oluşabilecek hasarlara karşı sigortalıdır.</li>
                </ul>
                <p>Profesyonel lojistik ekibimiz, ürünlerinizin zarar görmeden size ulaşması için özel paketleme yöntemleri kullanmaktadır.</p>
              </div>
            )}

            {activeTab === 'return' && (
              <div className="prose dark:prose-invert max-w-none animate-in fade-in">
                <h2>İade Koşulları</h2>
                <p>Müşteri memnuniyeti bizim önceliğimizdir. Satın aldığınız üründen memnun kalmamanız durumunda aşağıdaki koşullar çerçevesinde iade edebilirsiniz:</p>
                <ul>
                  <li>Ürünü teslim aldığınız tarihten itibaren <strong>14 gün</strong> içinde iade hakkınız bulunmaktadır.</li>
                  <li>İade edilecek ürünün ambalajı açılmamış, kullanılmamış ve yeniden satılabilir özelliği bozulmamış olmalıdır.</li>
                  <li>İade işlemi için öncelikle destek hattımızla iletişime geçmeniz gerekmektedir.</li>
                  <li>Ayıplı veya kusurlu ürünlerde kargo ücreti tarafımızca karşılanır. Keyfi iadelerde kargo ücreti müşteriye aittir.</li>
                </ul>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="prose dark:prose-invert max-w-none animate-in fade-in">
                <h2>Gizlilik Sözleşmesi</h2>
                <p>KenChaTech, kişisel verilerinizin güvenliğine büyük önem vermektedir.</p>
                <p>6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında:</p>
                <ul>
                  <li>Kişisel verileriniz (ad, soyad, adres, telefon, e-posta) sadece sipariş işleme ve teslimat süreçlerinde kullanılır.</li>
                  <li>Kredi kartı bilgileriniz sistemimizde saklanmaz, doğrudan güvenli ödeme altyapısı üzerinden işlenir (SSL şifreleme).</li>
                  <li>Verileriniz, yasal zorunluluklar dışında üçüncü şahıslarla asla paylaşılmaz.</li>
                  <li>Sitemizi kullanarak çerez politikamızı kabul etmiş sayılırsınız.</li>
                </ul>
              </div>
            )}

            {activeTab === 'sales' && (
              <div className="prose dark:prose-invert max-w-none animate-in fade-in">
                <h2>Mesafeli Satış Sözleşmesi</h2>
                <p>Bu sözleşme, Alıcı (Müşteri) ile Satıcı (KenChaTech) arasındaki hak ve yükümlülükleri düzenler.</p>
                <p><strong>1. Taraflar:</strong></p>
                <p>Satıcı: KenChaTech<br/>Alıcı: Siparişi veren kişi</p>
                <p><strong>2. Konu:</strong></p>
                <p>İşbu sözleşmenin konusu, Alıcının Satıcıya ait web sitesinden elektronik ortamda siparişini yaptığı ürünün satışı ve teslimi ile ilgilidir.</p>
                <p><strong>3. Cayma Hakkı:</strong></p>
                <p>Alıcı, ürünü teslim aldığı tarihten itibaren 14 gün içinde hiçbir gerekçe göstermeksizin ve cezai şart ödemeksizin sözleşmeden cayma hakkına sahiptir.</p>
                <p><em>(Detaylı sözleşme metni sipariş aşamasında sunulmaktadır.)</em></p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <WhatsappButton />
      <GeminiChat />
    </div>
  );
}
