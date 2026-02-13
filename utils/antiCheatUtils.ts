/**
 * Utility functions for quiz anti-cheat system
 */

/**
 * Shuffle array using Fisher-Yates algorithm
 * @param array - Array to shuffle
 * @returns Shuffled copy of the array
 */
export function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Generate shuffled indices for all questions in a quiz
 * @param questions - Array of questions
 * @returns 2D array of shuffled indices for each question
 */
export function generateShuffledIndices(questions: { options: any[] }[]): number[][] {
    return questions.map(question =>
        shuffleArray([...Array(question.options.length).keys()])
    );
}

/**
 * Validation thresholds for anti-cheat system
 */
export const VALIDATION_THRESHOLDS = {
    MIN_ACCURACY: 4 / 7,           // 57.1% minimum accuracy (4 out of 7 questions)
    MIN_AVG_TIME: 6,             // 6 seconds minimum average per question
    RAPID_CLICK_THRESHOLD: 2,    // Answers under 2 seconds are considered rapid
    NEXT_BUTTON_DELAY: 3000,     // 3 seconds delay before showing Next button
} as const;

/**
 * Payout calculation constants
 */
export const PAYOUT_CONFIG = {
    POINTS_PER_CORRECT: 250,
    PENALTY_PER_WRONG: 50,
} as const;

/**
 * Calculate quiz payout based on performance
 * @param score - Number of correct answers
 * @param wrongAnswers - Number of wrong answers
 * @returns Base points (can be negative)
 */
export function calculateBasePoints(score: number, wrongAnswers: number): number {
    return (score * PAYOUT_CONFIG.POINTS_PER_CORRECT) - (wrongAnswers * PAYOUT_CONFIG.PENALTY_PER_WRONG);
}

/**
 * Validate quiz results against anti-cheat criteria
 * @param score - Number of correct answers
 * @param totalQuestions - Total number of questions
 * @param questionTimes - Array of time spent on each question (in seconds)
 * @returns Validation result with details
 */
export function validateQuizResults(
    score: number,
    totalQuestions: number,
    questionTimes: number[]
): {
    isValid: boolean;
    accuracy: number;
    averageTime: number;
    passedAccuracyCheck: boolean;
    passedTimeCheck: boolean;
    failureReasons: string[];
} {
    const accuracy = score / totalQuestions;
    const averageTime = questionTimes.length > 0
        ? questionTimes.reduce((sum, time) => sum + time, 0) / questionTimes.length
        : 0;

    const passedAccuracyCheck = accuracy >= VALIDATION_THRESHOLDS.MIN_ACCURACY;
    const passedTimeCheck = averageTime >= VALIDATION_THRESHOLDS.MIN_AVG_TIME;
    const isValid = passedAccuracyCheck && passedTimeCheck;

    const minRequiredCorrect = Math.ceil(totalQuestions * VALIDATION_THRESHOLDS.MIN_ACCURACY);
    const failureReasons: string[] = [];
    if (!passedAccuracyCheck) {
        failureReasons.push(
            `ត្រូវការភាពត្រឹមត្រូវយ៉ាងតិច ${minRequiredCorrect} សំណួរ (អ្នកឆ្លើយត្រូវត្រឹមតែ ${score} សំណួរ)`
        );
    }
    if (!passedTimeCheck) {
        failureReasons.push(
            `ពេលវេលាមធ្យមក្នុងមួយសំណួរត្រូវតែយ៉ាងតិច ${VALIDATION_THRESHOLDS.MIN_AVG_TIME} វិនាទី (អ្នកប្រើ ${averageTime.toFixed(1)} វិនាទី)`
        );
    }

    return {
        isValid,
        accuracy,
        averageTime,
        passedAccuracyCheck,
        passedTimeCheck,
        failureReasons,
    };
}

/**
 * Calculate final payout with validation
 * @param score - Number of correct answers
 * @param wrongAnswers - Number of wrong answers
 * @param totalQuestions - Total number of questions
 * @param questionTimes - Array of time spent on each question
 * @returns Final payout amount (0 if validation failed)
 */
export function calculateFinalPayout(
    score: number,
    wrongAnswers: number,
    totalQuestions: number,
    questionTimes: number[]
): number {
    const validation = validateQuizResults(score, totalQuestions, questionTimes);
    const basePoints = calculateBasePoints(score, wrongAnswers);

    return validation.isValid ? Math.max(0, basePoints) : 0;
}

/**
 * Check if an answer was given too quickly (rapid click)
 * @param timeSpent - Time spent on the question in seconds
 * @returns True if this was a rapid click
 */
export function isRapidClick(timeSpent: number): boolean {
    return timeSpent < VALIDATION_THRESHOLDS.RAPID_CLICK_THRESHOLD;
}
