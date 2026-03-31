const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Mock food database
const foodDb = {
    "apple": { calories: 95, status: "Healthy", suggestion: "Great for a daily snack!" },
    "pizza": { calories: 285, status: "Moderate", suggestion: "Enjoy occasionally, high in carbs and fats." },
    "salad": { calories: 150, status: "Very Healthy", suggestion: "Excellent choice, add lean protein." },
    "burger": { calories: 450, status: "Unhealthy", suggestion: "High calorie density. Eat rarely." }
};

app.post('/analyze', (req, res) => {
    const { foodName } = req.body;
    
    if (!foodName) {
        return res.status(400).json({ error: 'Food name is required' });
    }

    const searchKey = foodName.toLowerCase().trim();
    
    if (foodDb[searchKey]) {
        res.json(foodDb[searchKey]);
    } else {
        res.json({
            calories: "Unknown",
            status: "Unknown",
            suggestion: "Eat in moderation"
        });
    }
});

app.listen(port, () => {
    console.log(`Food & Health Advisor running at http://localhost:${port}`);
});
