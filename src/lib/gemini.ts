import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function getGeminiResponse(prompt: string, context?: string) {
  if (!apiKey) {
    console.error("Gemini API Key is missing");
    return "Üzgünüm, şu an yanıt veremiyorum.";
  }

  try {
    const fullPrompt = `
      Sen KenChaTech adında bir e-ticaret sitesinin yapay zeka asistanısın. 
      Marka 2026 yılında kuruldu. Lüks, teknolojik ürünler satıyor.
      Tonun: Kibar, yardımsever, profesyonel ama samimi.
      
      Kullanıcı sorusu: ${prompt}
      
      Bağlam bilgisi (varsa): ${context || "Yok"}
    `;
    
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Bir hata oluştu, lütfen daha sonra tekrar deneyin.";
  }
}
