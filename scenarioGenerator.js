// Simulate AI or database scenario generation
window.generateScenario = function (moduleName) {
  const scenarios = {
    Earthquake: [
      {
        scenario: "You're inside a building during an earthquake. What do you do?",
        options: [
          { text: "Run outside immediately", correct: false },
          { text: "Drop, cover, and hold on", correct: true }
        ]
      },
      {
        scenario: "You are in bed during an earthquake. What's the safest action?",
        options: [
          { text: "Stay in bed and cover your head with a pillow", correct: true },
          { text: "Jump out of bed and run outside", correct: false }
        ]
      },
      {
        scenario: "You're driving during an earthquake. What should you do?",
        options: [
          { text: "Pull over and stop in a safe place", correct: true },
          { text: "Keep driving until the shaking stops", correct: false }
        ]
      }
    ],
    Fire: [
      {
        scenario: "You're trapped in a room filled with smoke. What do you do?",
        options: [
          { text: "Crawl low under the smoke", correct: true },
          { text: "Stand and run to the exit", correct: false }
        ]
      },
      {
        scenario: "Your clothes catch on fire. What should you do?",
        options: [
          { text: "Stop, drop, and roll", correct: true },
          { text: "Run to try and blow out the flames", correct: false }
        ]
      },
      {
        scenario: "You see smoke coming from behind a closed door. What do you do?",
        options: [
          { text: "Touch the door with the back of your hand before opening", correct: true },
          { text: "Open the door immediately to escape faster", correct: false }
        ]
      }
    ],
    Flood: [
      {
        scenario: "You're driving and encounter a flooded road. What do you do?",
        options: [
          { text: "Turn around, don't drown", correct: true },
          { text: "Drive through the water carefully", correct: false }
        ]
      },
      {
        scenario: "You're at home and floodwaters start rising. What’s the safest move?",
        options: [
          { text: "Move to higher ground or the roof", correct: true },
          { text: "Go into the basement", correct: false }
        ]
      },
      {
        scenario: "A flood warning has been issued for your area. What should you do?",
        options: [
          { text: "Prepare an emergency kit and be ready to evacuate", correct: true },
          { text: "Ignore it unless water reaches your house", correct: false }
        ]
      }
    ],
    Hurricane: [
      {
        scenario: "A hurricane is approaching your area. What's the best preparation?",
        options: [
          { text: "Stock up on water, food, and batteries", correct: true },
          { text: "Leave your windows open to equalize pressure", correct: false }
        ]
      },
      {
        scenario: "During a hurricane, you’re inside your home. Where should you shelter?",
        options: [
          { text: "In a small, windowless interior room or closet", correct: true },
          { text: "Near large windows to watch the storm", correct: false }
        ]
      }
    ],
    Tornado: [
      {
        scenario: "A tornado warning is issued while you're at home. Where do you go?",
        options: [
          { text: "Basement or small interior room", correct: true },
          { text: "Stay near windows to watch the tornado", correct: false }
        ]
      },
      {
        scenario: "You're driving when you spot a tornado nearby. What should you do?",
        options: [
          { text: "Seek shelter in a low-lying area like a ditch", correct: true },
          { text: "Try to outrun it by driving fast", correct: false }
        ]
      }
    ]
  };

  return scenarios[moduleName] || {
    scenario: "No scenario found.",
    options: []
  };
};