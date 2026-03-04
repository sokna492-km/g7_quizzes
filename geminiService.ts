
import { GoogleGenAI, Type } from "@google/genai";
import { Question, Subject, Difficulty } from "./types";

export interface GenerateQuizOptions {
  /** Number of questions — for Python/SQL/TLA+ subjects this is internally forced to 10. */
  numQuestions?: number;
  /** If true, generate question text, options, and explanation in English (used for Python/SQL/TLA+). */
  inEnglish?: boolean;
}

/**
 * Generates a quiz based on subject and chapter content using Gemini API.
 * Uses gemini-3-flash-preview for efficiency and to reduce quota exhaustion risks.
 *
 * Python / SQL in Supabase / TLA+ → 10 MCQ-only questions in English
 *   (2 theory + 8 practical/real-world)
 * All other subjects → 7 mixed-type questions in Khmer
 */
export const generateQuiz = async (
  subject: Subject,
  chapterTitle: string,
  chapterSummary: string,
  difficulty: Difficulty,
  options: GenerateQuizOptions = {}
): Promise<Question[]> => {
  const { inEnglish = false } = options;

  // Force 10 questions for the three special subjects; default 7 for everything else
  const isSpecialSubject =
    subject === Subject.Python ||
    subject === Subject.SQL ||
    subject === Subject.TLAPlus;
  const count = isSpecialSubject ? 10 : 7;

  // Always initialize GoogleGenAI with a named parameter inside the function.
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

  const isSQL = subject === Subject.SQL;
  const isTLAPlus = subject === Subject.TLAPlus;

  const subjectPersona = isSQL
    ? 'database engineer and SQL/PostgreSQL/Supabase instructor'
    : isTLAPlus
      ? "formal methods expert and TLA+ specification instructor (expert in Leslie Lamport's TLA+, temporal logic, and model checking)"
      : 'Python programming instructor';

  const subjectContext = isSQL
    ? 'SQL & Supabase'
    : isTLAPlus
      ? 'TLA+ Formal Specification'
      : 'Python';

  // ── English MCQ-only prompt (Python / SQL in Supabase / TLA+) ─────────────
  const englishMCQPrompt = `
You are a professional ${subjectPersona}.
Generate a quiz of exactly ${count} Multiple Choice Questions (MCQ) based on the following ${subjectContext} learning context:

SUBJECT: ${subject}
CHAPTER: ${chapterTitle}
CONTENT SUMMARY: ${chapterSummary}
DIFFICULTY: ${difficulty}

QUESTION DISTRIBUTION — you MUST follow this exactly:
  • 2 questions focused on THEORY (concepts, definitions, the purpose of keywords/operators/clauses/functions)
  • 8 questions focused on PRACTICAL / REAL-WORLD scenarios. These MUST include a rich mix of:
      – Code snippets asking what the output, error, or result will be
      – Syntax questions (correct vs incorrect syntax, missing keyword/clause)
      – Logic or algorithmic reasoning
      – Problem-solving with actual data, numbers, or set/list operations
      – Reading or completing a short code block and choosing the right answer

ALL ${count} questions MUST be type "MCQ" — do NOT produce any other question type.

CRITICAL REQUIREMENTS (all in English):
1. Every "questionText" must be a complete, clearly worded question in English.
   For code-based questions: embed the code snippet directly in the question text (use backticks or a code block).
2. The "options" array MUST contain exactly 4 distinct answer strings in English.
3. Every option MUST be plausible and non-empty. Never use placeholders like "Option A".
4. The "correctAnswerIndex" (0–3) must point to the single correct option.
5. The "explanation" must be a clear, helpful paragraph in English explaining WHY the correct answer is right and briefly why the other options are wrong.
6. Shuffle the questions so theory and practical questions are interleaved, NOT grouped together.
7. Calibrate question difficulty appropriately for the level: ${difficulty}.
`;

  // ── Khmer multi-type prompt (all other subjects) ───────────────────────────
  const khmerPrompt = `
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

CRITICAL REQUIREMENTS:
1. The "questionText" must be a complete question in Khmer.
2. The "options" array MUST contain exactly 4 distinct strings. 
3. Each option MUST be a plausible, non-empty answer in Khmer. Do NOT leave options blank.
4. The "correctAnswerIndex" (0-3) must point to the correct option.
5. The "explanation" must be a helpful paragraph in Khmer explaining WHY the answer is correct.
Technical terms for Mathematics or Science can be in English in parentheses if standard.
`;

  const prompt = inEnglish ? englishMCQPrompt : khmerPrompt;

  // Restrict the JSON schema enum to MCQ-only for special subjects
  const allowedTypes = isSpecialSubject
    ? ["MCQ"]
    : ["MCQ", "TrueFalse", "FillInTheBlank", "OddOneOut", "DefinitionMatch", "WhatsMissing", "Matching"];

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
                enum: allowedTypes
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

    // ── Validation and sanitization ──────────────────────────────────────────
    const sanitized = (result as Question[]).map(q => {
      if (q.type === 'Matching') {
        if (!q.matchingPairs || q.matchingPairs.length === 0) {
          q.matchingPairs = [{ left: "Item", right: "Category" }];
        }
        // Options should include all unique 'right' values for the dropdowns
        q.options = Array.from(new Set(q.matchingPairs.map(p => p.right)));

      } else if (q.type === 'TrueFalse') {
        // Use English labels for English-mode quizzes, Khmer otherwise
        q.options = inEnglish ? ['True', 'False'] : ['ត្រឹមត្រូវ', 'មិនត្រឹមត្រូវ'];
        q.correctAnswerIndex = (q.correctAnswerIndex === 1) ? 1 : 0;

      } else if (q.type === 'FillInTheBlank') {
        q.options = [];
        if (subject === Subject.SQL) {
          q.correctAnswerValue = String(q.correctAnswerValue || '').trim() || 'SELECT';
        } else if (subject === Subject.TLAPlus) {
          q.correctAnswerValue = String(q.correctAnswerValue || '').trim() || 'INVARIANT';
        } else {
          // Khmer subjects: FillInTheBlank must be numeric
          const num = String(q.correctAnswerValue).replace(/[^0-9.]/g, '');
          q.correctAnswerValue = num || '0';
        }

      } else {
        // MCQ, OddOneOut, DefinitionMatch, WhatsMissing — all choice-based
        if (!q.options || q.options.length < 4) {
          q.options = q.options || [];
          while (q.options.length < 4) {
            q.options.push(inEnglish ? `Option ${q.options.length + 1}` : `ជម្រើសទី ${q.options.length + 1}`);
          }
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
