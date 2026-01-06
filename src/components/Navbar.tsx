import Link from 'next/link';
import { ShoppingBag, Menu, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white">
              KenCha<span className="text-blue-600">Tech</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium uppercase tracking-wide">
              Anasayfa
            </Link>
            <Link href="/products" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium uppercase tracking-wide">
              Ürünler
            </Link>
            <Link href="/about" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium uppercase tracking-wide">
              Hakkımızda
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
             <Link href="/login" className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" title="Giriş Yap / Üye Ol">
              <User className="w-5 h-5" />
            </Link>
            <button className="p-2 text-slate-900 dark:text-white hover:text-blue-600 transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-0 w-2 h-2 bg-blue-600 rounded-full"></span>
            </button>
            <button className="md:hidden p-2 text-slate-900 dark:text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
