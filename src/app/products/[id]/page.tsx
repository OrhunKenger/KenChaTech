import Reviews from '@/components/Reviews';
import { Star } from 'lucide-react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsappButton from '@/components/WhatsappButton';
import GeminiChat from '@/components/GeminiChat';
import ProductGallery from '@/components/ProductGallery';
import Link from 'next/link';
import { ArrowLeft, Check, ShieldCheck, Truck } from 'lucide-react';

interface ProductDetailProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const { id } = await params;
  const productId = parseInt(id);

  if (isNaN(productId)) {
    notFound();
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { 
      reviews: {
        include: { user: { select: { name: true } } },
        orderBy: { createdAt: 'desc' }
      } 
    }
  });

  // ... (existing logic)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
            {/* ... (existing content) ... */}

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800">
             {/* ... (existing grid) ... */}
             <div className="grid grid-cols-1 lg:grid-cols-2">
               {/* ... (image section) ... */}
               <div className="bg-slate-100 dark:bg-slate-800 p-8 flex flex-col items-center justify-center">
                 <ProductGallery images={images} productName={product.name} />
               </div>

               {/* Details Section */}
               <div className="p-8 lg:p-12 flex flex-col justify-center">
                  {/* ... (existing details) ... */}
                 <div className="mb-2">
                  <span className="text-blue-600 font-semibold uppercase tracking-wider text-sm bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                  {product.name}
                </h1>
                
                {/* Ortalama Puan */}
                <div className="flex items-center gap-2 mb-6">
                   <div className="flex text-yellow-400">
                     {[1,2,3,4,5].map(i => (
                       <Star key={i} className={`w-5 h-5 ${i <= Math.round(product.reviews.reduce((acc:any, r:any) => acc + r.rating, 0) / (product.reviews.length || 1)) ? 'fill-current' : 'text-slate-300 dark:text-slate-600'}`} />
                     ))}
                   </div>
                   <span className="text-sm text-slate-500">({product.reviews.length} değerlendirme)</span>
                </div>

                <div className="text-3xl font-light text-slate-900 dark:text-white mb-8">
                  {product.price.toLocaleString('tr-TR')} <span className="text-lg text-slate-500">TL</span>
                </div>
                
                {/* ... (rest of details) ... */}
                 {/* Stok Durumu */}
                <div className="mb-6">
                   {product.stock > 0 ? (
                     <span className="text-green-600 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full text-sm font-bold">Stokta Var ({product.stock} adet)</span>
                   ) : (
                     <span className="text-red-600 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full text-sm font-bold">Tükendi</span>
                   )}
                </div>

                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                  {product.description}
                </p>

                {features.length > 0 && features[0] !== "" && (
                  <div className="mb-8">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Öne Çıkan Özellikler</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {features.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-center text-slate-600 dark:text-slate-400 text-sm">
                          <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 mb-8">
                   <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <Truck className="w-6 h-6 text-blue-500" />
                      <div>
                        <div className="font-semibold text-sm text-slate-900 dark:text-white">Hızlı Teslimat</div>
                        <div className="text-xs text-slate-500">Aynı gün kargo</div>
                      </div>
                   </div>
                   <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <ShieldCheck className="w-6 h-6 text-blue-500" />
                      <div>
                        <div className="font-semibold text-sm text-slate-900 dark:text-white">Orijinal Ürün</div>
                        <div className="text-xs text-slate-500">Güvenilir satıcı</div>
                      </div>
                   </div>
                </div>

                <a 
                   href={`https://wa.me/905310140429?text=Merhaba, ${product.name} ürünü hakkında bilgi almak istiyorum.`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl text-center transition-all hover:shadow-lg hover:shadow-green-500/30 flex items-center justify-center gap-2"
                >
                  WhatsApp ile Sipariş Ver
                </a>
              </div>
             </div>
          </div>

          {/* Yorumlar Bölümü */}
          <div className="max-w-4xl mx-auto mt-12">
             <Reviews productId={product.id} />
             
             <div className="mt-8 space-y-6">
                {product.reviews.map((review: any) => (
                  <div key={review.id} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                     <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold">
                              {review.user.name.charAt(0).toUpperCase()}
                           </div>
                           <div>
                              <div className="font-semibold text-slate-900 dark:text-white">{review.user.name}</div>
                              <div className="text-xs text-slate-500">{new Date(review.createdAt).toLocaleDateString('tr-TR')}</div>
                           </div>
                        </div>
                        <div className="flex text-yellow-400">
                           {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                        </div>
                     </div>
                     <p className="text-slate-600 dark:text-slate-300">{review.comment}</p>
                  </div>
                ))}
                {product.reviews.length === 0 && (
                   <div className="text-center text-slate-500 py-12">Henüz yorum yapılmamış. İlk yorumu sen yap!</div>
                )}
             </div>
          </div>

        </div>
      </main>

      <Footer />
      <WhatsappButton />
      <GeminiChat />
    </div>
  );
}