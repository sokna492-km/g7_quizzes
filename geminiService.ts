
import { GoogleGenAI, Type } from "@google/genai";
import { Question, Subject, Difficulty } from "./types";

export interface GenerateQuizOptions {
  /** Number of questions (default 7). For Python subject, can be 7–10. */
  numQuestions?: number;
  /** If true, generate question text, options, and explanation in English (e.g. for Python). */
  inEnglish?: boolean;
}

/**
 * Generates a quiz based on subject and chapter content using Gemini API.
 * Uses gemini-3-flash-preview for efficiency and to reduce quota exhaustion risks.
 */
export const generateQuiz = async (
  subject: Subject,
  chapterTitle: string,
  chapterSummary: string,
  difficulty: Difficulty,
  options: GenerateQuizOptions = {}
): Promise<Question[]> => {
  const { numQuestions = 7, inEnglish = false } = options;
  const count = Math.min(10, Math.max(1, numQuestions || 7));

  // Always initialize GoogleGenAI with a named parameter inside the function.
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

  const langInstructions = inEnglish
    ? `
    CRITICAL REQUIREMENTS (all in English):
    1. The "questionText" must be a complete question in English.
    2. The "options" array MUST contain exactly 4 distinct strings in English.
    3. Each option MUST be a plausible, non-empty answer. Do NOT leave options blank.
    4. The "correctAnswerIndex" (0-3) must point to the correct option.
    5. The "explanation" must be a helpful paragraph in English explaining WHY the answer is correct.`
    : `
    CRITICAL REQUIREMENTS:
    1. The "questionText" must be a complete question in Khmer.
    2. The "options" array MUST contain exactly 4 distinct strings. 
    3. Each option MUST be a plausible, non-empty answer in Khmer. Do NOT leave options blank.
    4. The "correctAnswerIndex" (0-3) must point to the correct option.
    5. The "explanation" must be a helpful paragraph in Khmer explaining WHY the answer is correct.
    Technical terms for Mathematics or Science can be in English in parentheses if standard.`;

  const prompt = inEnglish
    ? `
    You are a professional programming instructor. 
    Generate a quiz based on the following Python learning context:
    
    SUBJECT: ${subject}
    CHAPTER: ${chapterTitle}
    CONTENT SUMMARY: ${chapterSummary}
    DIFFICULTY: ${difficulty}
    
    The quiz must have exactly ${count} multiple-choice questions. 
    Each question must be clear and appropriate for someone learning Python.
    ${langInstructions}
  `
    : `
    You are a professional Grade 7 teacher in Cambodia. 
    Generate a quiz based on the following textbook context (RAG):
    
    SUBJECT: ${subject}
    CHAPTER: ${chapterTitle}
    CONTENT SUMMARY: ${chapterSummary}
    DIFFICULTY: ${difficulty}
    
    The quiz must have exactly ${count} multiple-choice questions. 
    Each question must be appropriate for a 12-13 year old Grade 7 student.
    ${langInstructions}
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
