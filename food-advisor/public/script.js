async function analyzeFood() {
    const inputField = document.getElementById('foodInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const foodName = inputField.value.trim();

    if (!foodName) {
        alert("Please enter a food name.");
        return;
    }

    // Loader effect
    analyzeBtn.innerText = "Analyzing...";
    analyzeBtn.disabled = true;

    try {
        const response = await fetch('/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ foodName })
        });

        const data = await response.json();

        // Update UI
        document.getElementById('resultTitle').innerText = 
            foodName.charAt(0).toUpperCase() + foodName.slice(1).toLowerCase();
        
        document.getElementById('resCalories').innerText = data.calories;
        document.getElementById('resStatus').innerText = data.status;
        document.getElementById('resSuggestion').innerText = data.suggestion;

        // Show result card
        document.getElementById('resultCard').classList.remove('hidden');
    } catch (error) {
        console.error("Error analyzing food:", error);
        alert("An error occurred while analyzing the food.");
    } finally {
        analyzeBtn.innerText = "Analyze";
        analyzeBtn.disabled = false;
    }
}

// Allow pressing 'Enter' to submit
document.getElementById('foodInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        analyzeFood();
    }
});
