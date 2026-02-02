
import { GoogleGenAI, Type } from "@google/genai";
import { Question, Subject, Difficulty } from "./types";

/**
 * Generates a quiz based on subject and chapter content using Gemini API.
 * Uses gemini-3-flash-preview for efficiency and to reduce quota exhaustion risks.
 */
export const generateQuiz = async (
  subject: Subject,
  chapterTitle: string,
  chapterSummary: string,
  difficulty: Difficulty
): Promise<Question[]> => {
  // Always initialize GoogleGenAI with a named parameter inside the function.
  // This ensures the most up-to-date API key is used from the execution environment.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    You are a professional Grade 7 teacher in Cambodia. 
    Generate a quiz based on the following textbook context (RAG):
    
    SUBJECT: ${subject}
    CHAPTER: ${chapterTitle}
    CONTENT SUMMARY: ${chapterSummary}
    DIFFICULTY: ${difficulty}
    
    The quiz must have exactly 5 multiple-choice questions. 
    Each question must be appropriate for a 12-13 year old Grade 7 student.
    
    CRITICAL REQUIREMENTS:
    1. The "questionText" must be a complete question in Khmer.
    2. The "options" array MUST contain exactly 4 distinct strings. 
    3. Each option MUST be a plausible, non-empty answer in Khmer. Do NOT leave options blank.
    4. The "correctAnswerIndex" (0-3) must point to the correct option.
    5. The "explanation" must be a helpful paragraph in Khmer explaining WHY the answer is correct.
    
    Technical terms for Mathematics or Science can be in English in parentheses if standard.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              questionText: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                minItems: 4,
                maxItems: 4
              },
              correctAnswerIndex: { type: Type.INTEGER },
              explanation: { type: Type.STRING },
            },
            required: ["questionText", "options", "correctAnswerIndex", "explanation"],
          },
        },
      },
    });

    // Directly access the .text property (not a method call).
    const text = response.text || "[]";
    const result = JSON.parse(text);
    
    // Safety check to ensure we only return questions that have valid options
    const filteredResult = (result as Question[]).filter(q => 
      q.questionText && 
      Array.isArray(q.options) && 
      q.options.length === 4 && 
      q.options.every(opt => opt && String(opt).trim().length > 0)
    );

    return filteredResult.length > 0 ? filteredResult : result;
  } catch (error: any) {
    console.error("Error generating quiz:", error);
    // Rethrow to be caught by the UI handler
    throw error;
  }
};
