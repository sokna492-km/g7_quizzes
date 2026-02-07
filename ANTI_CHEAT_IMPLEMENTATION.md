# Anti-Cheat Implementation - Phase 1 & 2

## Overview
Implemented comprehensive anti-cheat measures to prevent your nephew from gaming the quiz system by rapidly clicking without reading questions.

## ✅ Implemented Features

### **Phase 1: Core Anti-Cheat**

#### 1. **70% Accuracy Threshold for Payout** ⭐
- **Location**: `App.tsx` - `handleQuizFinish()`
- **Logic**: Quiz must achieve ≥70% accuracy to receive any payout
- **Formula**: `accuracy = score / totalQuestions`
- **Result**: If accuracy < 70%, payout = 0 riels

#### 2. **Penalty System (+250/-50)** ⭐
- **Location**: `App.tsx` - `handleQuizFinish()`
- **Formula**: `basePoints = (correct × 250) - (wrong × 50)`
- **Effect**: Makes random clicking unprofitable (negative expected value)
- **Example**:
  - 10 questions, 7 correct, 3 wrong = (7 × 250) - (3 × 50) = 1,750 - 150 = **1,600 riels**
  - 10 questions, 5 correct, 5 wrong = (5 × 250) - (5 × 50) = 1,250 - 250 = **1,000 riels**
  - But if accuracy < 70%, final payout = **0 riels**

#### 3. **Shuffle Answer Positions** ⭐
- **Location**: `QuizPlayer.tsx` - `shuffledIndices` state
- **Logic**: Uses Fisher-Yates algorithm to randomize answer order for each question
- **Effect**: Prevents memorizing answer positions (e.g., "always click B")
- **Implementation**: Shuffled indices generated once per quiz session and persisted

### **Phase 2: Time Controls**

#### 4. **3-Second Delay Before "Next" Button** ⏱️
- **Location**: `QuizPlayer.tsx` - `handleAnswer()` and `showNextButton` state
- **Logic**: After answering, "Next" button is disabled for 3 seconds
- **UI**: Shows "សូមរង់ចាំ... ⏳" (Please wait...) during delay
- **Effect**: Forces student to read the explanation before moving on

#### 5. **5-Second Average Time Validation** ⏱️
- **Location**: `App.tsx` - `handleQuizFinish()`
- **Logic**: Tracks time spent on each question, calculates average
- **Threshold**: Average time per question must be ≥ 5 seconds
- **Result**: If average < 5 seconds, payout = 0 riels
- **Tracking**: `questionTimes` array stores duration for each question

#### 6. **Rapid Click Detection** 🚨
- **Location**: `QuizPlayer.tsx` - `handleAnswer()`
- **Logic**: Counts answers given in < 2 seconds
- **Tracking**: `rapidClickCount` increments for each rapid answer
- **Future Use**: Can be used to block quiz after 3 consecutive rapid answers (not yet enforced)

## 📊 Data Tracking

### New Fields in `QuizResult` (Firestore)
```typescript
{
  wrongAnswers: number;           // Count of incorrect answers
  averageTimePerQuestion: number; // Average seconds per question
  isValid: boolean;               // Whether quiz passed validation
}
```

### New Fields in `QuizSession` (localStorage)
```typescript
{
  wrongAnswers: number;           // Running count of wrong answers
  questionTimes: number[];        // Array of time spent per question
  rapidClickCount: number;        // Count of answers < 2 seconds
  shuffledIndices: number[][];    // Shuffled answer order per question
}
```

## 🎯 Validation Logic

```typescript
// In handleQuizFinish()
const accuracy = score / total;
const averageTime = sum(questionTimes) / questionTimes.length;

const passedAccuracyCheck = accuracy >= 0.7;
const passedTimeCheck = averageTime >= 5;
const isValid = passedAccuracyCheck && passedTimeCheck;

const basePoints = (score × 250) - (wrongAnswers × 50);
const finalPoints = isValid ? Math.max(0, basePoints) : 0;
```

## 🚫 Validation Failure Feedback

When a quiz fails validation, the user sees:
```
❌ មិនទទួលបានរង្វាន់

ត្រូវការភាពត្រឹមត្រូវយ៉ាងតិច 70% (អ្នកទទួលបាន 60%)
ពេលវេលាមធ្យមក្នុងមួយសំណួរត្រូវតែយ៉ាងតិច 5 វិនាទី (អ្នកប្រើ 3.2 វិនាទី)

សូមព្យាយាមអានសំណួរឱ្យបានល្អិតល្អន់!
```

## 📝 Example Scenarios

### Scenario 1: Legitimate Student
- 10 questions, 8 correct, 2 wrong
- Average time: 12 seconds per question
- **Validation**: ✅ PASS (80% accuracy, 12s average)
- **Payout**: (8 × 250) - (2 × 50) = 2,000 - 100 = **1,900 riels**

### Scenario 2: Speed Clicker (Caught by Time Check)
- 10 questions, 7 correct, 3 wrong
- Average time: 3 seconds per question
- **Validation**: ❌ FAIL (70% accuracy ✅, but 3s average ❌)
- **Payout**: **0 riels**

### Scenario 3: Random Clicker (Caught by Accuracy)
- 10 questions, 5 correct, 5 wrong
- Average time: 8 seconds per question
- **Validation**: ❌ FAIL (50% accuracy ❌, 8s average ✅)
- **Payout**: **0 riels**

### Scenario 4: Smart Cheater (Caught by Both)
- 10 questions, 6 correct, 4 wrong
- Average time: 4 seconds per question
- **Validation**: ❌ FAIL (60% accuracy ❌, 4s average ❌)
- **Payout**: **0 riels**

## 🔧 Files Modified

1. **`types.ts`**
   - Added `wrongAnswers`, `averageTimePerQuestion`, `isValid` to `QuizResult`
   - Added `wrongAnswers`, `questionTimes`, `rapidClickCount`, `shuffledIndices` to `QuizSession`

2. **`components/QuizPlayer.tsx`**
   - Added shuffle logic with Fisher-Yates algorithm
   - Track question start time and calculate duration
   - Detect rapid clicks (< 2 seconds)
   - 3-second delay before showing "Next" button
   - Pass validation data to parent via `onFinish()`

3. **`App.tsx`**
   - Initialize anti-cheat fields in new quiz sessions
   - Validate accuracy and average time in `handleQuizFinish()`
   - Calculate payout with penalty system
   - Store validation data in Firestore
   - Show alert if validation fails

## 🎮 How to Test

1. **Test Normal Flow**:
   - Start a quiz
   - Notice answers are in random order (different from original)
   - Answer a question
   - Notice "Next" button is disabled for 3 seconds
   - Complete quiz with 70%+ accuracy and 5+ seconds average
   - Verify you receive payout

2. **Test Speed Clicking**:
   - Start a quiz
   - Click answers very quickly (< 2 seconds each)
   - Complete quiz
   - Should see alert about average time being too low
   - Verify payout = 0

3. **Test Low Accuracy**:
   - Start a quiz
   - Deliberately answer incorrectly (< 70% accuracy)
   - Complete quiz
   - Should see alert about accuracy being too low
   - Verify payout = 0

## 🚀 Future Enhancements (Phase 3 - Optional)

- **Cooldown System**: Limit paid attempts per lesson per day
- **Rapid Click Blocking**: Auto-block quiz after 3 consecutive rapid answers
- **Progressive Difficulty**: Increase time requirements for higher difficulty levels
- **Streak Bonuses**: Reward consecutive high-accuracy quizzes

## 📌 Notes

- Shuffled indices are generated once per quiz and persisted in session
- Validation is enforced server-side (Firestore) to prevent tampering
- All timing is tracked client-side but validated on completion
- Failed quizzes still count toward streak (encourages learning)
- Math Game (Number Chase) is unaffected by these rules
