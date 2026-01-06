'use client';

import { useState, useEffect, useRef } from 'react';
import { Trash2, Plus, Package, UploadCloud, Users, LogOut, DollarSign, X, RefreshCw, Image as ImageIcon, MessageSquare, TrendingUp, AlertCircle, Wallet, Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  images: string;
  description: string;
  features: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface Order {
  id: number;
  customerName: string;
  productName: string;
  note?: string;
  createdAt: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'users' | 'orders'>('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Edit Mode State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Telefon',
    features: '',
    stock: '1',
  });
  
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    'Telefon', 'Bilgisayar', 'Tablet', 'Akıllı Saat', 
    'Kulaklık', 'Konsol', 'Kamera', 'Drone', 
    'Ev Elektroniği', 'Giyim', 'Aksesuar', 'Ofis', 'Diğer'
  ];

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [prodRes, userRes, orderRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/users'),
        fetch('/api/orders')
      ]);

      const pData = await prodRes.json();
      const uData = await userRes.json();
      const oData = await orderRes.json();

      if (Array.isArray(pData)) setProducts(pData);
      if (Array.isArray(uData)) setUsers(uData);
      if (Array.isArray(oData)) setOrders(oData);
    } catch (error) {
      console.error('Failed to fetch', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (selectedFiles.length + newFiles.length > 10) {
        alert('En fazla 10 fotoğraf yükleyebilirsiniz.');
        return;
      }
      setSelectedFiles(prev => [...prev, ...newFiles]);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const startEditing = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      features: product.features || '',
      stock: product.stock.toString(),
    });
    // Mevcut resimler için önizleme (Sadece gösterimlik, edit modunda yeni resim yüklenirse bunlar değişir)
    // Şimdilik basit tutuyoruz: Yeni resim yüklenmezse eskiler kalır (Backend'de hallettik).
    // Preview'a eski resimleri koymak biraz karmaşık olabilir çünkü File objesi değiller.
    // O yüzden preview'ı boş bırakacağız, kullanıcı yeni resim eklerse görecek.
    setSelectedFiles([]);
    setPreviews([]);
    
    // Sayfayı yukarı kaydır
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditing = () => {
    setEditingProduct(null);
    setFormData({ name: '', description: '', price: '', category: 'Telefon', features: '', stock: '1' });
    setSelectedFiles([]);
    setPreviews([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Edit modunda resim zorunlu değil, create modunda zorunlu (isteğe bağlı)
    if (!editingProduct && selectedFiles.length === 0) {
      alert('Lütfen en az bir fotoğraf seçin.');
      return;
    }

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('category', formData.category);
      data.append('features', formData.features);
      data.append('stock', formData.stock);
      selectedFiles.forEach(file => data.append('images', file));

      let res;
      if (editingProduct) {
        data.append('id', editingProduct.id.toString());
        res = await fetch('/api/products', { method: 'PUT', body: data });
      } else {
        res = await fetch('/api/products', { method: 'POST', body: data });
      }

      if (res.ok) {
        alert(editingProduct ? 'Ürün güncellendi!' : 'Ürün eklendi!');
        cancelEditing(); // Reset form
        fetchAllData();
      } else {
        alert('Hata oluştu.');
      }
    } catch (error) {
      alert('Hata oluştu.');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;
    await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
    setProducts(products.filter(p => p.id !== id));
  };

  const handleDeleteUser = async (id: number) => {
    if (!confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) return;
    await fetch(`/api/users?id=${id}`, { method: 'DELETE' });
    setUsers(users.filter(u => u.id !== id));
  };

  const handleDeleteOrder = async (id: number) => {
    if (!confirm('Bu siparişi silmek istediğinize emin misiniz?')) return;
    await fetch(`/api/orders?id=${id}`, { method: 'DELETE' });
    setOrders(orders.filter(o => o.id !== id));
  };

  const getFirstImage = (jsonString: string) => {
    try {
      const images = JSON.parse(jsonString);
      return Array.isArray(images) && images.length > 0 ? images[0] : null;
    } catch (e) {
      return jsonString;
    }
  };

  // İstatistik Hesaplamaları
  const totalStockValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);
  const totalStockCount = products.reduce((acc, p) => acc + p.stock, 0);
  const lowStockProducts = products.filter(p => p.stock < 3);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col font-sans">
      <nav className="bg-slate-900 text-white p-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
             <div className="bg-blue-600 p-2 rounded-lg font-bold">KT</div>
             <span className="font-bold text-lg tracking-wide">YÖNETİM PANELİ</span>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-sm text-slate-400 hidden md:inline">Admin: Orhun Kenger</span>
             <button onClick={handleLogout} className="flex items-center gap-2 text-sm bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors">
               <LogOut className="w-4 h-4" /> Çıkış
             </button>
          </div>
        </div>
      </nav>
      
      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Tabs */}
          <div className="flex flex-wrap gap-4 mb-8">
             <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-sm ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white scale-105' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50'}`}>
              <TrendingUp className="w-5 h-5" /> Özet
            </button>
            <button onClick={() => setActiveTab('products')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-sm ${activeTab === 'products' ? 'bg-blue-600 text-white scale-105' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50'}`}>
              <Package className="w-5 h-5" /> Ürünler
            </button>
            <button onClick={() => setActiveTab('users')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-sm ${activeTab === 'users' ? 'bg-blue-600 text-white scale-105' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50'}`}>
              <Users className="w-5 h-5" /> Üyeler
            </button>
            <button onClick={() => setActiveTab('orders')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-sm ${activeTab === 'orders' ? 'bg-green-600 text-white scale-105' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50'}`}>
              <MessageSquare className="w-5 h-5" /> Siparişler
              {orders.length > 0 && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full ml-1">{orders.length}</span>}
            </button>
          </div>

          {loading ? (
             <div className="flex justify-center p-20"><RefreshCw className="w-10 h-10 animate-spin text-blue-500" /></div>
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                   {/* Stats Cards (Same as before) */}
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-white/20 rounded-xl"><Wallet className="w-6 h-6" /></div>
                        <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded">Toplam Varlık</span>
                      </div>
                      <div className="text-3xl font-bold mb-1">{totalStockValue.toLocaleString('tr-TR')} TL</div>
                      <div className="text-sm text-blue-100">Depodaki Ürün Değeri</div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl"><Package className="w-6 h-6" /></div>
                        <span className="text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded">Stok</span>
                      </div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{totalStockCount}</div>
                      <div className="text-sm text-slate-500">{products.length} Çeşit Ürün</div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-xl"><MessageSquare className="w-6 h-6" /></div>
                        <span className="text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded">Siparişler</span>
                      </div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{orders.length}</div>
                      <div className="text-sm text-slate-500">Bekleyen Talep</div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-xl"><Users className="w-6 h-6" /></div>
                        <span className="text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded">Müşteriler</span>
                      </div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{users.length}</div>
                      <div className="text-sm text-slate-500">Kayıtlı Üye</div>
                    </div>
                  </div>
                  
                   {/* Low Stock Table */}
                   <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6">
                       <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                         <AlertCircle className="w-5 h-5 text-red-500" /> Kritik Stok Uyarıları
                       </h3>
                       {lowStockProducts.length === 0 ? (
                         <div className="p-8 text-center text-slate-500 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                            Harika! Tüm ürünlerin stok durumu iyi görünüyor.
                         </div>
                       ) : (
                         <div className="overflow-x-auto">
                            <table className="w-full text-left">
                               <thead className="text-xs uppercase text-slate-500 bg-slate-50 dark:bg-slate-800">
                                  <tr><th className="p-3">Ürün</th><th className="p-3">Kategori</th><th className="p-3">Kalan Stok</th><th className="p-3 text-right">İşlem</th></tr>
                               </thead>
                               <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                  {lowStockProducts.map(p => (
                                    <tr key={p.id} className="text-sm">
                                       <td className="p-3 font-medium text-slate-900 dark:text-white">{p.name}</td>
                                       <td className="p-3 text-slate-500">{p.category}</td>
                                       <td className="p-3 font-bold text-red-600">{p.stock}</td>
                                       <td className="p-3 text-right">
                                          <button 
                                            onClick={() => { setActiveTab('products'); startEditing(p); }} 
                                            className="text-blue-600 hover:underline flex items-center gap-1 justify-end ml-auto"
                                          >
                                            <Pencil className="w-3 h-3" /> Güncelle
                                          </button>
                                       </td>
                                    </tr>
                                  ))}
                               </tbody>
                            </table>
                         </div>
                       )}
                    </div>
                </div>
              )}

              {activeTab === 'products' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in">
                  <div className="lg:col-span-1">
                     <div className={`bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl border sticky top-28 transition-colors ${editingProduct ? 'border-orange-200 dark:border-orange-900 ring-2 ring-orange-500/20' : 'border-slate-200 dark:border-slate-800'}`}>
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-100 pb-4">
                          {editingProduct ? (
                            <>
                              <Pencil className="w-5 h-5 text-orange-500" /> Ürünü Düzenle
                            </>
                          ) : (
                            <>
                              <Plus className="w-5 h-5 text-blue-600" /> Yeni Ürün
                            </>
                          )}
                        </h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                           {/* Same form fields */}
                           <div className="group">
                              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1 block">Ürün Adı</label>
                              <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1 block">Fiyat (TL)</label>
                                <input type="number" name="price" required value={formData.price} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                              </div>
                              <div>
                                 <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1 block">Stok</label>
                                 <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                              </div>
                           </div>
                           <div>
                              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1 block">Kategori</label>
                              <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                              </select>
                           </div>
                           <div>
                              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1 block">
                                {editingProduct ? 'Yeni Fotoğraf Ekle (Opsiyonel)' : 'Fotoğraflar'}
                              </label>
                              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors bg-slate-50 dark:bg-slate-800/50" onClick={() => fileInputRef.current?.click()}>
                                 <UploadCloud className="w-8 h-8 text-blue-500 mb-2" />
                                 <span className="text-sm text-slate-500 text-center">Yüklemek için tıklayın</span>
                                 <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple accept="image/*" className="hidden" />
                              </div>
                              {previews.length > 0 && (
                                <div className="grid grid-cols-4 gap-2 mt-4">
                                   {previews.map((src, idx) => (
                                     <div key={idx} className="relative group aspect-square">
                                       <img src={src} className="w-full h-full object-cover rounded-lg border border-slate-200" />
                                       <button type="button" onClick={() => removeFile(idx)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-3 h-3" /></button>
                                     </div>
                                   ))}
                                </div>
                              )}
                           </div>
                           <div>
                               <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1 block">Özellikler</label>
                               <input type="text" name="features" value={formData.features} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                           </div>
                           <div>
                              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1 block">Açıklama</label>
                              <textarea name="description" required value={formData.description} onChange={handleChange} rows={3} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                           </div>
                           
                           <div className="flex gap-2">
                             <button type="submit" className={`flex-1 text-white font-bold py-3 rounded-lg transition-colors shadow-lg ${editingProduct ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/30' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30'}`}>
                               {editingProduct ? 'Güncelle' : 'Kaydet'}
                             </button>
                             {editingProduct && (
                               <button type="button" onClick={cancelEditing} className="px-4 py-3 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                                 İptal
                               </button>
                             )}
                           </div>
                        </form>
                     </div>
                  </div>

                  <div className="lg:col-span-2 space-y-4">
                     {/* Product List Table */}
                     <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm">
                        <h2 className="font-bold text-slate-700 dark:text-slate-200">Ürün Listesi</h2>
                        <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">{products.length} Ürün</span>
                     </div>
                      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <table className="w-full text-left">
                           <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase text-xs">
                              <tr><th className="p-4">Fotoğraf</th><th className="p-4">Ürün</th><th className="p-4">Fiyat</th><th className="p-4">Stok</th><th className="p-4 text-right">İşlem</th></tr>
                           </thead>
                           <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                              {products.map((p) => (
                                <tr key={p.id} className={`${editingProduct?.id === p.id ? 'bg-orange-50 dark:bg-orange-900/20' : ''}`}>
                                   <td className="p-4"><div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden">{getFirstImage(p.images) && <img src={getFirstImage(p.images) as string} className="w-full h-full object-cover" />}</div></td>
                                   <td className="p-4 font-medium text-slate-900 dark:text-white">{p.name}</td>
                                   <td className="p-4">{p.price} TL</td>
                                   <td className="p-4">{p.stock}</td>
                                   <td className="p-4 text-right flex justify-end gap-2">
                                     <button onClick={() => startEditing(p)} className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg" title="Düzenle">
                                        <Pencil className="w-4 h-4" />
                                     </button>
                                     <button onClick={() => handleDeleteProduct(p.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg" title="Sil">
                                        <Trash2 className="w-4 h-4" />
                                     </button>
                                   </td>
                                </tr>
                              ))}
                           </tbody>
                        </table>
                      </div>
                  </div>
                </div>
              )}
              
              {/* User and Order tabs same as before... (just ensuring the file writes completely) */}
               {activeTab === 'users' && (
                 <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in">
                    <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                       <h2 className="text-xl font-bold text-slate-900 dark:text-white">Kayıtlı Kullanıcılar</h2>
                       <div className="text-sm text-slate-500">{users.length} Kullanıcı</div>
                    </div>
                    <div className="overflow-x-auto">
                       <table className="w-full text-left">
                          <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase text-xs">
                             <tr><th className="p-4">İsim</th><th className="p-4">E-posta</th><th className="p-4">Rol</th><th className="p-4">Tarih</th><th className="p-4 text-right">İşlem</th></tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                             {users.map((u) => (
                                <tr key={u.id}>
                                   <td className="p-4 font-medium text-slate-900 dark:text-white">{u.name}</td>
                                   <td className="p-4 text-slate-500">{u.email}</td>
                                   <td className="p-4"><span className={`px-2 py-1 rounded text-xs font-bold ${u.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{u.role}</span></td>
                                   <td className="p-4 text-slate-500 text-sm">{new Date(u.createdAt).toLocaleDateString('tr-TR')}</td>
                                   <td className="p-4 text-right">{u.role !== 'ADMIN' && <button onClick={() => handleDeleteUser(u.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><Trash2 className="w-4 h-4" /></button>}</td>
                                </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </div>
              )}

              {activeTab === 'orders' && (
                 <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in">
                    <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                       <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <MessageSquare className="w-5 h-5 text-green-500" /> AI Üzerinden Gelen Siparişler
                       </h2>
                       <div className="text-sm text-slate-500">{orders.length} Sipariş</div>
                    </div>
                    {orders.length === 0 ? (
                       <div className="p-12 text-center text-slate-500">Henüz bir sipariş talebi yok.</div>
                    ) : (
                       <div className="overflow-x-auto">
                          <table className="w-full text-left">
                             <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase text-xs">
                                <tr><th className="p-4">Müşteri</th><th className="p-4">İlgilendiği Ürün</th><th className="p-4">Notlar</th><th className="p-4">Tarih</th><th className="p-4 text-right">İşlem</th></tr>
                             </thead>
                             <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {orders.map((o) => (
                                   <tr key={o.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                      <td className="p-4 font-bold text-slate-900 dark:text-white">{o.customerName}</td>
                                      <td className="p-4 text-blue-600 font-medium">{o.productName}</td>
                                      <td className="p-4 text-slate-500 italic">"{o.note || 'Not yok'}"</td>
                                      <td className="p-4 text-slate-500 text-sm">{new Date(o.createdAt).toLocaleString('tr-TR')}</td>
                                      <td className="p-4 text-right"><button onClick={() => handleDeleteOrder(o.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><Trash2 className="w-4 h-4" /></button></td>
                                   </tr>
                                ))}
                             </tbody>
                          </table>
                       </div>
                    )}
                 </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}