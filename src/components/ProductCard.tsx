import Link from 'next/link';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  images: string; // JSON string
  category: string;
}

export default function ProductCard({ id, name, price, images, category }: ProductCardProps) {
  let imageUrl = '';
  try {
    const parsedImages = JSON.parse(images);
    if (Array.isArray(parsedImages) && parsedImages.length > 0) {
      imageUrl = parsedImages[0];
    }
  } catch (e) {
    imageUrl = images; // Fallback
  }

  return (
    <Link href={`/products/${id}`} className="group block">
      <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        <div className="aspect-square relative overflow-hidden bg-slate-100 dark:bg-slate-800">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400">
              <ImageIcon className="w-12 h-12" />
            </div>
          )}
          
          <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur text-white text-xs px-2 py-1 rounded uppercase tracking-wider">
            {category}
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          <div className="flex justify-between items-center">
            <span className="text-xl font-light text-slate-600 dark:text-slate-300">
              {price.toLocaleString('tr-TR')} <span className="text-sm">TL</span>
            </span>
            <span className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}