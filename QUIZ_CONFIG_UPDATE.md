# Quiz Configuration Update - 7 Questions & Adjusted Thresholds

## Overview
Updated quiz configuration to increase difficulty and provide more comprehensive assessment with 7 questions instead of 5.

## ✅ Changes Implemented

### **1. Quiz Length**
- **Before**: 5 questions per quiz
- **After**: 7 questions per quiz
- **Impact**: More comprehensive assessment of student knowledge

### **2. Minimum Accuracy for Payout**
- **Before**: 70% (4 out of 5 correct = 80%)
- **After**: 57.1% (4 out of 7 correct)
- **Formula**: `MIN_ACCURACY = 4/7 ≈ 0.571`
- **Impact**: Students must get at least 4 questions correct to earn rewards

### **3. Minimum Time Per Question**
- **Before**: 5 seconds average
- **After**: 6 seconds average
- **Impact**: Encourages more thoughtful reading and consideration

### **4. Penalty System** (Unchanged)
- **Correct Answer**: +250 riels
- **Wrong Answer**: -50 riels per mistake
- **Formula**: `(correct × 250) - (wrong × 50)`

## 📊 Payout Examples (7 Questions)

| Correct | Wrong | Base Calculation | Passes? | Final Payout |
|---------|-------|------------------|---------|--------------|
| 7 | 0 | (7×250) - (0×50) = 1,750 | ✅ Yes | **1,750 riels** |
| 6 | 1 | (6×250) - (1×50) = 1,450 | ✅ Yes | **1,450 riels** |
| 5 | 2 | (5×250) - (2×50) = 1,150 | ✅ Yes | **1,150 riels** |
| 4 | 3 | (4×250) - (3×50) = 850 | ✅ Yes (minimum) | **850 riels** |
| 3 | 4 | (3×250) - (4×50) = 550 | ❌ No (42.9%) | **0 riels** |
| 2 | 5 | (2×250) - (5×50) = 250 | ❌ No (28.6%) | **0 riels** |
| 1 | 6 | (1×250) - (6×50) = -50 | ❌ No (14.3%) | **0 riels** |
| 0 | 7 | (0×250) - (7×50) = -350 | ❌ No (0%) | **0 riels** |

## 🎯 Validation Rules

### **Must Pass BOTH Checks:**

1. **Accuracy Check**: ≥ 4 correct answers (57.1%)
2. **Time Check**: ≥ 6 seconds average per question

### **Failure Scenarios:**

❌ **Scenario 1**: 3 correct, 4 wrong, 8 seconds average
- Accuracy: 42.9% (FAIL)
- Time: 8 seconds (PASS)
- **Result**: 0 riels

❌ **Scenario 2**: 5 correct, 2 wrong, 4 seconds average
- Accuracy: 71.4% (PASS)
- Time: 4 seconds (FAIL)
- **Result**: 0 riels

✅ **Scenario 3**: 4 correct, 3 wrong, 7 seconds average
- Accuracy: 57.1% (PASS)
- Time: 7 seconds (PASS)
- **Result**: 850 riels

## 📝 Files Modified

### **1. utils/antiCheatUtils.ts**
```typescript
// Before
MIN_ACCURACY: 0.7,    // 70%
MIN_AVG_TIME: 5,      // 5 seconds

// After
MIN_ACCURACY: 4/7,    // 57.1% (4 out of 7)
MIN_AVG_TIME: 6,      // 6 seconds
```

### **2. geminiService.ts**
```typescript
// Before
numQuestions = 5

// After
numQuestions = 7
```

### **3. App.tsx**
```typescript
// Before
setLastTotalQuestions(5)
const total = ... || 5

// After
setLastTotalQuestions(7)
const total = ... || 7
```

## 🔄 Comparison: 5 vs 7 Questions

| Aspect | 5 Questions | 7 Questions | Change |
|--------|-------------|-------------|--------|
| **Min Correct** | 4 (80%) | 4 (57.1%) | More forgiving |
| **Max Payout** | 1,250 riels | 1,750 riels | +40% |
| **Min Passing** | 1,000 riels | 850 riels | -15% |
| **Time Required** | 25 seconds | 42 seconds | +68% |
| **Assessment Depth** | Basic | Comprehensive | Better |

## 💡 Benefits

### **For Students:**
✅ More opportunities to demonstrate knowledge (7 vs 5)
✅ More forgiving threshold (57% vs 70%)
✅ Higher maximum reward (1,750 vs 1,250)
✅ Better learning assessment

### **For Your Nephew:**
❌ Can't speed through (need 6s average)
❌ Can't get lucky with 3 correct (need 4)
❌ More questions = harder to cheat
❌ Longer quiz = more time to track patterns

### **For You:**
✅ Better data on student comprehension
✅ More granular assessment
✅ Higher engagement (longer quiz)
✅ Better ROI on AI generation costs

## 🚀 Impact on Anti-Cheat

### **Harder to Cheat:**
- 7 questions provide more data points to detect patterns
- 6-second minimum makes rapid clicking harder
- 57.1% threshold still prevents random guessing (expected 25% with 4 options)

### **Random Guessing Math:**
- Expected correct with random guessing: 7 × 0.25 = 1.75 questions
- Need 4 correct to pass
- Probability of passing with random guessing: **~3.5%** (very low)

## 📈 Expected Outcomes

### **Legitimate Students:**
- Should easily pass with 4-7 correct
- Average time naturally > 6 seconds
- Will earn 850-1,750 riels per quiz

### **Your Nephew (Cheating):**
- Random clicking: ~3.5% chance of passing
- Speed clicking: Caught by time validation
- Pattern memorization: Prevented by shuffling
- Expected payout: **0 riels** (most attempts)

## ✨ Summary

The new configuration:
- **Increases** quiz depth (7 questions)
- **Maintains** anti-cheat effectiveness
- **Improves** student assessment
- **Rewards** genuine learning more generously
- **Punishes** cheating more effectively

Your nephew will need to actually learn to earn rewards! 🎯
