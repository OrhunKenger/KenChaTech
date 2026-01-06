import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsappButton from '@/components/WhatsappButton';
import GeminiChat from '@/components/GeminiChat';
import { ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-slate-900">
          <div className="absolute inset-0 z-0 opacity-40">
            {/* Abstract Background */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-600 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-700"></div>
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              Teknolojinin <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Lüks</span> Dokunuşu
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 font-light max-w-2xl mx-auto">
              KenChaTech ile geleceği bugünden deneyimleyin. En yeni ve en seçkin teknoloji ürünleri, kusursuz hizmet anlayışıyla.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all hover:shadow-lg hover:shadow-blue-500/30">
                Alışverişe Başla
              </Link>
              <Link href="/about" className="px-8 py-4 bg-transparent border border-white/20 hover:bg-white/10 text-white rounded-full font-bold transition-all backdrop-blur-sm">
                Bizi Tanıyın
              </Link>
            </div>
          </div>
        </section>

        {/* Features / Why Us */}
        <section className="py-24 bg-white dark:bg-slate-950">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                <div className="p-6">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Aynı Gün Kargo</h3>
                  <p className="text-slate-600 dark:text-slate-400">Siparişleriniz aynı gün özenle hazırlanıp kargoya teslim edilir. Hız bizim işimiz.</p>
                </div>
                <div className="p-6">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Güvenli Alışveriş</h3>
                  <p className="text-slate-600 dark:text-slate-400">KVKK uyumlu, gizlilik ve satış sözleşmeleriyle korunan güvenli altyapı.</p>
                </div>
                <div className="p-6">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">7/24 Destek</h3>
                  <p className="text-slate-600 dark:text-slate-400">WhatsApp hatlarımız ve AI asistanımız ile her an yanınızdayız.</p>
                </div>
             </div>
           </div>
        </section>

        {/* Featured Products */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Öne Çıkan Ürünler</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">En çok tercih edilen, en yeni teknoloji harikalarını sizin için seçtik.</p>
            </div>
            
            {products.length === 0 ? (
              <div className="text-center py-10 bg-white dark:bg-slate-800 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                <p className="text-slate-500">Henüz ürün eklenmemiş.</p>
                <Link href="/admin" className="text-blue-600 hover:underline mt-2 inline-block">Yönetici panelinden ürün ekleyin</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product: any) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            )}
            
            <div className="text-center mt-12">
               <Link href="/products" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-4 transition-all">
                  Tüm Ürünleri Gör <ArrowRight className="w-4 h-4" />
               </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsappButton />
      <GeminiChat />
    </div>
  );
}