'use client';

import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images.length > 0 ? images[0] : '');

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      {/* Ana Resim */}
      <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative">
        {selectedImage ? (
           <img 
             src={selectedImage} 
             alt={productName} 
             className="w-full h-full object-contain p-4 animate-in fade-in duration-300"
           />
        ) : (
           <div className="flex flex-col items-center text-slate-400">
              <ImageIcon className="w-16 h-16 mb-2 opacity-50" />
              <span className="text-sm">Görsel Yok</span>
           </div>
        )}
      </div>
      
      {/* Küçük Resimler (Galeri) */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto w-full py-2 px-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={`w-20 h-20 flex-shrink-0 border-2 rounded-lg overflow-hidden transition-all duration-200 bg-white dark:bg-slate-900 ${
                selectedImage === img 
                  ? 'border-blue-500 scale-105 shadow-md ring-2 ring-blue-200 dark:ring-blue-900' 
                  : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`${productName} - ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
