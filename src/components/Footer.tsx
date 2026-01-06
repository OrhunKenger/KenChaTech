import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-tighter">KenCha<span className="text-blue-500">Tech</span></h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              2026 yılında kurulan KenChaTech, en yeni teknoloji ürünlerini lüks ve güvenilir bir deneyimle sunar.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Hızlı Bağlantılar</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Anasayfa</Link></li>
              <li><Link href="/products" className="hover:text-blue-400 transition-colors">Ürünler</Link></li>
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">Hakkımızda</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Kurumsal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/policy" className="hover:text-blue-400 transition-colors">Gizlilik Sözleşmesi</Link></li>
              <li><Link href="/policy" className="hover:text-blue-400 transition-colors">Satış Sözleşmesi</Link></li>
              <li><Link href="/policy" className="hover:text-blue-400 transition-colors">İade Koşulları</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">İletişim</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>İstanbul, Türkiye</li>
              <li>orhunkenger1929@gmail.com</li>
              <li>+90 531 014 04 29</li>
              <li>+90 552 223 37 89</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} KenChaTech. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
