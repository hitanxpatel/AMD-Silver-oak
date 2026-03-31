const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// List of keywords for heuristic analysis
const healthyKeywords = ['salad', 'fruit', 'vegetable', 'apple', 'banana', 'orange', 'nuts', 'chicken', 'fish', 'water', 'broccoli', 'spinach', 'berry', 'berries', 'oats', 'quinoa'];
const unhealthyKeywords = ['pizza', 'burger', 'fried', 'chips', 'fries', 'sugar', 'candy', 'cake', 'cookie', 'soda', 'donut', 'chocolate', 'bacon', 'sausage'];

// Emoji mappings based on categories
const emojis = ['🍽️', '🥑', '🍎', '🥦', '🥕', '🍗', '🍜', '🍣', '🥙', '🍩', '🍕', '🍔', '🍟', '🍰'];

app.post('/analyze', (req, res) => {
    const { foodName } = req.body;
    
    if (!foodName) {
        return res.status(400).json({ error: 'Food name is required' });
    }

    const searchKey = foodName.toLowerCase().trim();
    
    // Generate intelligent heuristics and fake AI behavior
    // 1. Determine status
    let status = "Moderate";
    if (healthyKeywords.some(keyword => searchKey.includes(keyword))) {
        status = "Healthy";
    } else if (unhealthyKeywords.some(keyword => searchKey.includes(keyword))) {
        status = "Unhealthy";
    }

    // 2. Generate random calories between 50 and 500 based on hash of string
    // To make the "AI" seem consistent, we can generate a pseudo-random number using a simple hash
    let hash = 0;
    for (let i = 0; i < searchKey.length; i++) {
        hash = searchKey.charCodeAt(i) + ((hash << 5) - hash);
    }
    const pseudoRandom = Math.abs(hash) % 450; 
    let calories = 50 + pseudoRandom;
    
    // Adjust calories to make sense with the status
    if (status === "Healthy" && calories > 300) calories -= 150;
    if (status === "Unhealthy" && calories < 250) calories += 150;

    // 3. Generate suggestion
    let suggestion = "Enjoy in moderation. Balance is the key to a healthy lifestyle!";
    if (status === "Healthy") {
        suggestion = "Excellent choice! Packed with nutrients to fuel your day.";
    } else if (status === "Unhealthy") {
        suggestion = "High in calorie density. Try to consume this as an occasional treat rather than a daily habit.";
    }

    // 4. Random emoji for visual flair
    const emojiHash = Math.abs(hash) % emojis.length;
    const foodEmoji = emojis[emojiHash];

    // Always return a meaningful response
    res.json({
        food: foodName,
        calories: calories,
        status: status,
        suggestion: `⚡ AI Insight: ${suggestion}`,
        emoji: foodEmoji
    });
});

app.listen(port, () => {
    console.log(`Food & Health Advisor running at http://localhost:${port}`);
});
