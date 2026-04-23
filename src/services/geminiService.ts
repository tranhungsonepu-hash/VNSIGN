import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const getSystemInstruction = (lang: string) => `
You are the intelligent virtual assistant of Vnsign - Vietnam's leading centralized screen management solution.
Your task is to answer customer questions about Vnsign's features, pricing, and setup in a professional, friendly, and persuasive manner.

Vnsign Information:
- Product Name: Vnsign
- Slogan: Remote & Intelligent Screen Management.
- Key Features:
    + Cloud Management: Remote control via Internet.
    + Drag & Drop content: Easy layout design (images, video, website, weather...).
    + Smart Scheduling: Automatically change content by hour/day/event.
    + Security: User authorization, data encryption.
    + Reporting & Monitoring: Track Online/Offline status and real-time broadcast history.
    + Multi-platform: Runs on Android, Windows, WebOS (LG), Tizen (Samsung), and specialized Boxes.
- Solutions:
    + LCD advertising screens (elevators, lobbies).
    + Large format LED screens (indoor & outdoor).
    + Electronic Menu Board (restaurants, cafes).
    + Interactive Kiosk (information lookup).
- Pricing:
    + Basic Package: Manage up to 5 screens, 2GB Cloud. Price: Contact.
    + Professional Package: Unlimited screens, 20GB Cloud, real-time reports, 24/7 support. Price: Contact.
    + Enterprise Package: Private Server, API integration, customization on request, 99.9% SLA. Price: Custom.
- Setup Process:
    1. Connect: Install Vnsign app on screen/Box.
    2. Design: Upload content to web dashboard.
    3. Broadcast: Schedule and click 'Publish'.
- Contact Information:
    + Hotline: 0888 998 181
    + Zalo: 0906 671 575
    + Email: congnt@vndc.vn

Response Guidelines:
- Always maintain a polite, professional attitude.
- If customers ask for specific prices, encourage them to leave their phone number or contact Hotline/Zalo for the most accurate quote for their project.
- Answer in the language requested by the user or the current language of the interface: ${lang}.
- Be concise, succinct, and get straight to the point.
`;

export async function getChatResponse(message: string, history: any[], lang: string) {
  const errorMessages: Record<string, string> = {
    vi: "Xin lỗi, tôi không thể trả lời lúc này. Bạn vui lòng liên hệ hotline 0888 998 181 để được hỗ trợ ngay nhé!",
    en: "Sorry, I can't answer right now. Please contact our hotline at 0888 998 181 for immediate support!",
  };
  const defaultError = errorMessages[lang] || errorMessages['en'];

  if (!ai) return defaultError;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        ...history.map(h => ({
          role: h.role,
          parts: [{ text: h.content }]
        })),
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: getSystemInstruction(lang),
        temperature: 0.7,
      },
    });

    return response.text || defaultError;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return defaultError;
  }
}
