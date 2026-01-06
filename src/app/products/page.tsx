import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsappButton from '@/components/WhatsappButton';
import GeminiChat from '@/components/GeminiChat';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Tüm Ürünler</h1>
            <p className="text-slate-600 dark:text-slate-400">Teknoloji dünyasının en seçkin ürünlerini keşfedin.</p>
          </div>

          {products.length === 0 ? (
             <div className="text-center py-20">
                <p className="text-xl text-slate-500">Şu anda listelenecek ürün bulunmuyor.</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product: any) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <WhatsappButton />
      <GeminiChat />
    </div>
  );
}
