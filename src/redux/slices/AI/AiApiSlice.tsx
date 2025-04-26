import { createAsyncThunk } from '@reduxjs/toolkit';
import { addMessage, setLoading, setActiveHistory, updateContent, ChatState } from './AiSlice';
import { ChatMessage } from './AiSlice';
import { v4 as uuidv4 } from 'uuid';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { formatDate } from '../../../page/SinglePackage/DateAvailability';

const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const fetchChatResponse = createAsyncThunk(
  'chat/fetchResponse',
  async ({ newMessageId, userMessage, historyId, promptType, data }: { newMessageId: string, userMessage: string, historyId: string, promptType: string, data: any }, { dispatch, getState }) => {
    dispatch(setLoading(true));
    const newMessageIdAssistant = uuidv4();
    
    // Generate a new history ID if one isn't provided
    let currentHistoryId = historyId;
    if (!currentHistoryId) {
      currentHistoryId = uuidv4();
      dispatch(setActiveHistory(currentHistoryId));
    }
    
    dispatch(
      updateContent({
        historyId: currentHistoryId,
        messageId: newMessageIdAssistant,
        newContent: "Audio response",
        isAudioLoading: true,
      })
    );
    
    const userNewMessage: ChatMessage = { id: newMessageId, role: 'user', content: userMessage, isAudioLoading: false };
    dispatch(addMessage({ historyId: currentHistoryId, message: userNewMessage }));

    try {
      // Get current chat history
      const state = getState() as { aiChat: ChatState };
      const activeHistory = state.aiChat.histories.find(h => h.historyId === currentHistoryId);
      const chatHistory = activeHistory?.messages || [];
      
      // Format available dates information
      const formattedDates = data.data.availableDates?.map((date: any) => 
        `From ${formatDate(date.startDate)} to ${formatDate(date.endDate)}`
      ).join('\n') || 'No available dates specified';

      // Format previous messages for context
      const historyContext = chatHistory
        .filter(msg => msg.id !== newMessageId) // Exclude the current message
        .map(msg => `${msg.role === 'user' ? 'USER' : 'ASSISTANT'}: ${msg.content}`)
        .join('\n\n');

      // Generate strict prompt with all package details and history
      const formattedPrompt = `
      **CONVERSATION HISTORY:**
      ${historyContext || 'No previous messages in this conversation.'}
      
      **ROLE:**  
      You are **"Himalaya Guide"**, a friendly but expert Indian travel consultant. Answer **only what is asked**—don't overload with extra details unless requested.  
      
      **RULES:**  
      1. **Focus on the exact question** (e.g., if asked "weather," don't explain "how to reach").  
      2. **If no data exists**, use your knowledge (never say "data not found").  
      3. **Structure replies clearly** with bullet points/paragraphs.  
      4. **Maintain context** from previous messages when relevant.
      
      **RESPONSE TEMPLATES:**  
      1. **For Nearby Places:**  
         "📍 *Near [Package Name], these are key places to explore:*  
         - **Place 1** (X km): [Brief significance + travel tip]  
         - **Place 2** (Y km): [Cultural/geographic highlight]  
         *Base town:* [Name] (nearest hub for supplies)."  
      
      2. **For Weather/Best Season:**  
         "🌤️ *Best time for [Package Name]:*  
         - **Summer (Mar-Jun):** [Temp range, conditions]  
         - **Monsoon (Jul-Aug):** [Risks, accessibility]  
         - **Winter (Nov-Feb):** [Snow/road status].  
         *Ideal months:* [Month1-Month2] for [reason]."  
      
      3. **For How to Reach:**  
         "🚗 *Reaching [Package Name]:*  
         - ✈️ Nearest airport: [Name] (XX km)  
         - 🚉 Nearest train: [Station] (YY km)  
         - 🚙 Road: [Last motorable point] + [trek distance, if any]."  
      
      4. **For Demographics/Culture:**  
         "👳 *Local Insights:*  
         - Tribes/communities: [Bhotiya/Gaddi, etc.]  
         - Language: [Hindi/Kumaoni/Nepali]  
         - Customs: [Pilgrimage etiquette, dress code]."  
      
      **PROHIBITED:**  
      - ❌ Don't combine answers (e.g., if asked "weather," don't add "nearby places").  
      - ❌ No pricing: *"Contact our team for personalized quotes."*  
      
      **PACKAGE DATA:**  
      ${JSON.stringify(data, null, 2)}  

      **PACKAGE DATES WITH PRICE:**
      ${formattedDates}
      
      **NEW USER QUESTION:**  
      "${userMessage}"  
      
      **EXAMPLE RESPONSES:**  
      1. *User asks:* "What's the weather at Om Kailash?"  
         *You reply:*  
         "🌤️ *Om Kailash Parvat weather:*  
         - **May-June:** Days 12-18°C, nights 0-5°C (best for trekking)  
         - **July-August:** Heavy rains (avoid due to landslides)  
         - **Sept-Oct:** Clear skies, chilly mornings (ideal for photography)."  
      
      2. *User asks:* "How to reach Adi Kailash?"  
         *You reply:*  
         "🚗 *Route to Adi Kailash:*  
         - ✈️ Nearest airport: Pantnagar (220km)  
         - 🚉 Train to Kathgodam + 10hr drive to Dharchula  
         - 🚙 Final stretch: Shared jeep to Kuti (6hrs), then 18km trek."  
      `;

      // Call Gemini API
      const result = await model.generateContentStream(formattedPrompt);

      let botMessage = "";
      dispatch(
        addMessage({
          historyId: currentHistoryId,
          message: { id: newMessageIdAssistant, role: "assistant", content: "", isAudioLoading: promptType === "AUDIO" },
        })
      );

      // Handle text streaming from Gemini
      for await (const chunk of result.stream) {
        const chunkText = await chunk.text();
        if (chunkText) {
          botMessage += chunkText;
          dispatch(
            updateContent({
              historyId: currentHistoryId,
              messageId: newMessageIdAssistant,
              newContent: botMessage,
            })
          );
        }
      }

    } catch (error) {
      console.error("Error fetching response from Gemini:", error);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);