// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

let currentScenario = null;
let userChoices = [];

document.addEventListener("DOMContentLoaded", () => {
    loadScenario();
});

// Fetching scenario from Firestore
async function loadScenario() {
    try {
        const snapshot = await db.collection("scenarios").get();
        const scenarios = snapshot.docs.map(doc => doc.data());
        currentScenario = scenarios[Math.floor(Math.random() * scenarios.length)];

        // Show scenario in UI
        displayScenario(currentScenario);
    } catch (error) {
        console.error("Error loading scenario:", error);
    }
}

function displayScenario(scenario) {
    const scenarioContainer = document.getElementById("scenario-container");
    const optionsContainer = document.getElementById("options-container");
    const nextBtn = document.getElementById("next-btn");

    scenarioContainer.innerHTML = <p>${scenario.description}</p>;
    optionsContainer.innerHTML = "";

    scenario.options.forEach((option, index) => {
        const optionBtn = document.createElement("button");
        optionBtn.textContent = option.text;
        optionBtn.onclick = () => handleOptionClick(option);
        optionsContainer.appendChild(optionBtn);
    });

    nextBtn.style.display = "none"; // Hide next button initially
}

// Handle option click
function handleOptionClick(option) {
    userChoices.push(option);

    // Check if the option leads to success or failure
    if (option.outcome === "success") {
        showResult("Congratulations! You succeeded!");
    } else if (option.outcome === "failure") {
        showResult("Sorry, you failed. Try again.");
    } else {
        // Show next button if there are more options or logic to continue
        document.getElementById("next-btn").style.display = "block";
    }
}

// Show result page
function showResult(message) {
    const resultPage = document.getElementById("result-page");
    const resultMessage = document.getElementById("result-message");

    resultMessage.textContent = message;
    resultPage.style.display = "block";
    document.querySelector(".quiz-container").style.display = "none";
}

// Restart the quiz
function restartQuiz() {
    document.getElementById("result-page").style.display = "none";
    document.querySelector(".quiz-container").style.display = "block";
    userChoices = [];
    loadScenario();
}
function displayScenario(scenario) {
    const scenarioContainer = document.getElementById("scenario-container");
    const optionsContainer = document.getElementById("options-container");

    scenarioContainer.innerHTML = <p>${scenario.description}</p>;
    optionsContainer.innerHTML = "";

    scenario.options.forEach((option, index) => {
        const optionBtn = document.createElement("button");
        optionBtn.textContent = option.text;
        optionBtn.onclick = () => handleOptionClick(option);
        optionsContainer.appendChild(optionBtn);
    });

    // Anime.js fade-in effect
    anime({
        targets: '#scenario-container',
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeInOutSine',
    });

    anime({
        targets: '#options-container button',
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 1000,
        easing: 'easeInOutSine',
    });
}
async function fetchGeneratedScenario() {
    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: 'Generate a scenario for a quiz with multiple choice options',
            max_tokens: 150,
        }),
    });
    const data = await response.json();
    return data.choices[0].text;
}