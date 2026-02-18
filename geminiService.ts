
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
    
    The quiz must have exactly 7 questions with this EXACT distribution:
    - 1 x MCQ: Standard multiple choice.
    - 1 x Matching: Match 3-4 items/definitions on the left to their corresponding categories/names on the right.
    - 1 x TrueFalse: True or False question.
    - 1 x FillInTheBlank: Must require a NUMERICAL answer ONLY (the answer should be a number).
    - 1 x OddOneOut: Which choice doesn't fit the theme?
    - 1 x DefinitionMatch: Provide a definition, ask for the term.
    - 1 x WhatsMissing: Describe a list/sequence where one item is missing.

    IMPORTANT: Shuffle the order of these question types.
    ${langInstructions}
  `
    : `
    You are a professional Grade 7 teacher in Cambodia. 
    Generate a quiz based on the following textbook context (RAG):
    
    SUBJECT: ${subject}
    CHAPTER: ${chapterTitle}
    CONTENT SUMMARY: ${chapterSummary}
    DIFFICULTY: ${difficulty}
    
    The quiz must have exactly 7 questions with this EXACT distribution:
    - 1 x MCQ: Standard multiple choice.
    - 1 x Matching: ភ្ជាប់ជួរខាងឆ្វេងជាមួយជួរខាងស្តាំ (Match 3 items on left to 3 categories on right).
    - 1 x TrueFalse: True or False question.
    - 1 x FillInTheBlank: Must require a NUMERICAL answer ONLY.
    - 1 x OddOneOut: Which choice doesn't fit the theme?
    - 1 x DefinitionMatch: Provide a definition, ask for the term.
    - 1 x WhatsMissing: Describe a list/sequence where one item is missing.

    IMPORTANT: Shuffle the order of these question types.
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
              type: {
                type: Type.STRING,
                enum: ["MCQ", "TrueFalse", "FillInTheBlank", "OddOneOut", "DefinitionMatch", "WhatsMissing", "Matching"]
              },
              questionText: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              correctAnswerIndex: { type: Type.INTEGER },
              correctAnswerValue: { type: Type.STRING },
              matchingPairs: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    left: { type: Type.STRING },
                    right: { type: Type.STRING }
                  },
                  required: ["left", "right"]
                }
              },
              explanation: { type: Type.STRING },
            },
            required: ["type", "questionText", "explanation"],
          },
        },
      },
    });

    const text = response.text || "[]";
    const result = JSON.parse(text);

    // Validation and sanitization
    const sanitized = (result as Question[]).map(q => {
      if (q.type === 'Matching') {
        if (!q.matchingPairs || q.matchingPairs.length === 0) {
          q.matchingPairs = [{ left: "Item", right: "Category" }];
        }
        // Options should include all unique 'right' values for the dropdowns
        q.options = Array.from(new Set(q.matchingPairs.map(p => p.right)));
      } else if (q.type === 'TrueFalse') {
        q.options = ['ត្រឹមត្រូវ', 'មិនត្រឹមត្រូវ'];
        // Ensure correctAnswerIndex is 0 or 1
        q.correctAnswerIndex = (q.correctAnswerIndex === 1) ? 1 : 0;
      } else if (q.type === 'FillInTheBlank') {
        q.options = [];
        // Ensure correctAnswerValue is a string representation of a number
        const num = String(q.correctAnswerValue).replace(/[^0-9.]/g, '');
        q.correctAnswerValue = num || '0';
      } else {
        if (!q.options || q.options.length < 4) {
          q.options = q.options || [];
          while (q.options.length < 4) q.options.push(`ជម្រើសទី ${q.options.length + 1}`);
        }
        if (q.correctAnswerIndex === undefined || q.correctAnswerIndex < 0 || q.correctAnswerIndex > 3) {
          q.correctAnswerIndex = 0;
        }
      }
      return q;
    });

    return sanitized;
  } catch (error: any) {
    console.error("Error generating quiz:", error);
    // Rethrow to be caught by the UI handler
    throw error;
  }
};
