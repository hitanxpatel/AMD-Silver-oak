async function analyzeFood() {
    const inputField = document.getElementById('foodInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const btnText = analyzeBtn.querySelector('span');
    const loader = document.getElementById('loader');
    const resultCard = document.getElementById('resultCard');
    
    const foodName = inputField.value.trim();

    if (!foodName) {
        alert("Please enter a food name.");
        return;
    }

    // Toggle loader
    btnText.innerText = "Analyzing...";
    analyzeBtn.disabled = true;
    resultCard.classList.add('hidden');
    loader.classList.remove('hidden');

    try {
        const response = await fetch('/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ foodName })
        });

        const data = await response.json();

        // Simulate a tiny delay to show the "AI thinking" effect naturally
        setTimeout(() => {
            // Update UI elements
            document.getElementById('resultTitle').innerText = data.food;
            document.getElementById('foodEmoji').innerText = data.emoji || '🍽️';
            document.getElementById('resCalories').innerText = data.calories + ' kcal';
            document.getElementById('resStatus').innerText = data.status;
            document.getElementById('resSuggestion').innerText = data.suggestion;

            // Handle status coloring
            const statusContainer = document.getElementById('statusContainer');
            statusContainer.className = 'metric-box status-box'; // Reset classes
            
            if (data.status === 'Healthy') {
                statusContainer.classList.add('status-green');
            } else if (data.status === 'Moderate') {
                statusContainer.classList.add('status-yellow');
            } else if (data.status === 'Unhealthy') {
                statusContainer.classList.add('status-red');
            }

            // Hide loader and show result
            loader.classList.add('hidden');
            resultCard.classList.remove('hidden');
        }, 800);

    } catch (error) {
        console.error("Error analyzing food:", error);
        alert("An error occurred while analyzing the food.");
        loader.classList.add('hidden');
    } finally {
        setTimeout(() => {
            btnText.innerText = "Analyze Food";
            analyzeBtn.disabled = false;
        }, 800);
    }
}

// Allow pressing 'Enter' to submit
document.getElementById('foodInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        analyzeFood();
    }
});
