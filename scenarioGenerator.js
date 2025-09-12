// Simulate AI or database scenario generation
window.generateScenario = function (moduleName) {
  const scenarios = {
    Earthquake: {
      scenario: "You're inside a building during an earthquake. What do you do?",
      options: [
        { text: "Run outside immediately", correct: false },
        { text: "Drop, cover, and hold on", correct: true }
      ]
    },
    Fire: {
      scenario: "You're trapped in a room filled with smoke. What do you do?",
      options: [
        { text: "Crawl low under the smoke", correct: true },
        { text: "Stand and run to the exit", correct: false }
      ]
    },
    Flood: {
      scenario: "You're driving and encounter a flooded road. What do you do?",
      options: [
        { text: "Turn around, don't drown", correct: true },
        { text: "Drive through the water carefully", correct: false }
      ]
    }
  };

  return scenarios[moduleName] || {
    scenario: "No scenario found.",
    options: []
  };
};