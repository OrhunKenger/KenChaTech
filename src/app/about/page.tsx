import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsappButton from '@/components/WhatsappButton';
import GeminiChat from '@/components/GeminiChat';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">
            Geleceği Bugün Yaşayın
          </h1>
          
          <div className="prose prose-lg dark:prose-invert mx-auto text-slate-600 dark:text-slate-300 leading-relaxed">
            <p className="mb-6 text-xl">
              KenChaTech, teknolojinin sınırlarını zorlayan ürünleri kullanıcılarla buluşturmak amacıyla <strong>2026</strong> yılında İstanbul'da kurulmuştur.
            </p>
            
            <p className="mb-6">
              Modern yaşamın hızına ayak uyduran, estetik ve performansı bir arada sunan teknolojik çözümlerimizle, müşterilerimize sadece bir ürün değil, ayrıcalıklı bir yaşam tarzı vadediyoruz. "Lüks, Hoş ve Sade" felsefesiyle yola çıkan markamız, karmaşadan uzak, rafine bir teknoloji deneyimi sunmayı ilke edinmiştir.
            </p>

            <p className="mb-6">
              Sektördeki yenilikleri yakından takip eden uzman ekibimiz, en kaliteli ürünleri en uygun koşullarda sizlere ulaştırmak için çalışmaktadır. Müşteri memnuniyetini her şeyin üzerinde tutan anlayışımız, 7/24 aktif destek hatlarımız ve yapay zeka destekli asistanımız ile her an yanınızdayız.
            </p>
            
            <p>
              KenChaTech ailesi olarak, bize duyduğunuz güven için teşekkür ederiz.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="text-3xl font-bold text-blue-600 mb-2">2026</div>
                <div className="text-sm text-slate-500 uppercase tracking-wide">Kuruluş</div>
             </div>
             <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="text-3xl font-bold text-blue-600 mb-2">%100</div>
                <div className="text-sm text-slate-500 uppercase tracking-wide">Müşteri Memnuniyeti</div>
             </div>
             <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-sm text-slate-500 uppercase tracking-wide">Kesintisiz Destek</div>
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
