'use client';

import { useState, useEffect } from 'react';
import { Star, Send } from 'lucide-react';
import { toast } from 'sonner';

interface Review {
  id: number;
  rating: number;
  comment: string;
  user: { name: string };
  createdAt: string;
}

export default function Reviews({ productId }: { productId: number }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [user, setUser] = useState<any>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Kullanıcıyı kontrol et
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));

    // Yorumları çek (Şu an sunucu tarafında include ediliyor ama client tarafında da refresh için fetch gerekebilir,
    // şimdilik basit tutalım ve sayfayı refresh ettirelim yorumdan sonra)
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Yorum yapmak için giriş yapmalısınız.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          userEmail: user.email,
          rating,
          comment
        })
      });

      if (res.ok) {
        toast.success('Yorumunuz gönderildi!');
        setComment('');
        // Sayfayı yenile ki yeni yorum görünsün (Server component olduğu için)
        window.location.reload(); 
      } else {
        toast.error('Bir hata oluştu.');
      }
    } catch (e) {
      toast.error('Hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-8">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Müşteri Yorumları</h2>
      
      {/* Yorum Yapma Formu */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 mb-8">
        <h3 className="font-semibold mb-4 text-slate-800 dark:text-slate-200">Yorum Yap</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
             <label className="block text-sm mb-2 text-slate-600 dark:text-slate-400">Puanınız</label>
             <div className="flex gap-1">
               {[1, 2, 3, 4, 5].map((star) => (
                 <button
                   type="button"
                   key={star}
                   onClick={() => setRating(star)}
                   className={`p-1 transition-colors ${rating >= star ? 'text-yellow-400' : 'text-slate-300 dark:text-slate-600'}`}
                 >
                   <Star className="w-6 h-6 fill-current" />
                 </button>
               ))}
             </div>
          </div>
          <div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ürün hakkındaki düşünceleriniz..."
              required
              className="w-full p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
              rows={3}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50"
          >
             <Send className="w-4 h-4" /> Gönder
          </button>
        </form>
      </div>

      {/* Yorum Listesi (Parent componentten prop olarak alınacak) */}
      {/* Bu kısım page.tsx içinde render edilecek */}
    </div>
  );
}