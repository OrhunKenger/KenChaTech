import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { prisma } from '@/lib/prisma';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  tools: [
    {
      functionDeclarations: [
        {
          name: "save_order",
          description: "Müşteri bir ürün satın almak istediğini beyan ettiğinde ve ismini verdiğinde bu fonksiyonu çağır. Siparişi kaydeder.",
          parameters: {
            type: SchemaType.OBJECT,
            properties: {
              customerName: {
                type: SchemaType.STRING,
                description: "Müşterinin adı ve soyadı.",
              },
              productName: {
                type: SchemaType.STRING,
                description: "Müşterinin satın almak veya ilgilenmek istediği ürünün adı.",
              },
              note: {
                type: SchemaType.STRING,
                description: "Varsa müşterinin ek notu veya iletişim isteği.",
              }
            },
            required: ["customerName", "productName"],
          },
        },
      ],
    },
  ],
});

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    // 1. Ürün Bilgisi
    const products = await prisma.product.findMany({
      take: 10,
      select: { name: true, price: true, category: true, stock: true, features: true }
    });
    
    const productContext = products.length > 0 
      ? products.map(p => `- ${p.name} (Fiyat: ${p.price} TL, Kategori: ${p.category}, Stok: ${p.stock}, Özellikler: ${p.features})`).join('\n')
      : "Şu an stoklarımız güncelleniyor, lütfen WhatsApp hattımızdan bilgi alın.";

    // 2. Sistem Talimatı
    const systemPrompt = `
      Sen **KenChaTech** markasının seçkin, profesyonel ve teknoloji uzmanı yapay zeka asistanısın.
      Markamız 2026 yılında kuruldu ve "Lüks, Hoş, Sade" prensibiyle çalışır.

      **Karakterin ve Kuralların:**
      1.  **Ton:** Kibar, resmi ("Siz" dili), güven veren ve seçkin.
      2.  **Satış:** Müşterinin ihtiyacını anla ve uygun ürünü öner.
      3.  **Sipariş:** Müşteri ürün almak isterse **önce ismini sor**. İsmi alınca 'save_order' aracını kullan.
      4.  **Hafıza:** Konuşmanın akışını hatırla. Eğer müşteri ismini verdiyse tekrar sorma, direkt siparişi kaydet.
      5.  **Bilgi:** Kargo 16:00'da çıkar (Aynı gün). İade 14 gündür.
      
      **Mevcut Ürün Listesi:**
      ${productContext}
    `;

    // 3. Sohbet Geçmişini Yapılandır
    // Frontend'den gelen mesajları Gemini formatına çevir (ilk mesaj hariç, çünkü sistem promptu başta olacak)
    const chatHistory = history 
      ? history.slice(1).map((msg: any) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        }))
      : [];

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [{ text: "Anlaşıldı. KenChaTech standartlarına uygun hizmet sunmak için hazırım." }],
        },
        ...chatHistory // Geçmişi ekle
      ],
    });

    // 4. Mesajı Gönder
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const functionCalls = response.functionCalls();

    // 5. Fonksiyon Çağrısı Kontrolü
    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];
      
      if (call.name === "save_order") {
        const args = call.args as any;
        
        await prisma.chatOrder.create({
          data: {
            customerName: args.customerName,
            productName: args.productName,
            note: args.note || ""
          }
        });

        return NextResponse.json({
          response: `Teşekkürler Sayın ${args.customerName}. ${args.productName} için talebinizi öncelikli olarak sistemimize kaydettim. Müşteri temsilcimiz en kısa sürede size ulaşarak gönderim sürecini başlatacaktır. Başka bir arzunuz var mı?` 
        });
      }
    }

    return NextResponse.json({ response: response.text() });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ response: 'Şu an teknik bir bakım çalışması yürütüyoruz. Lütfen biraz sonra tekrar deneyin.' });
  }
}