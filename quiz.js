const { useState } = React;

function QuizApp() {
  const [module, setModule] = useState(null);
  const [question, setQuestion] = useState(null);

  const modules = ["Earthquake", "Fire", "Flood"];

  function selectModule(mod) {
    setModule(mod);
    const scenario = generateScenario(mod);
    setQuestion(scenario);
  }

  function handleChoice(correct) {
    if (correct) {
      window.location.href = "success.html";
    } else {
      window.location.href = "failure.html";
    }
  }

  if (!module) {
    return (
      <div>
        <h1>Select a Disaster Module</h1>
        {modules.map((mod) => (
          <button key={mod} onClick={() => selectModule(mod)}>
            {mod}
          </button>
        ))}
      </div>
    );
  }

  if (question) {
    return (
      <div>
        <h2>{question.scenario}</h2>
        {question.options.map((opt, index) => (
          <button key={index} onClick={() => handleChoice(opt.correct)}>
            {opt.text}
          </button>
        ))}
      </div>
    );
  }

  return <div>Loading...</div>;
}

ReactDOM.render(<QuizApp />, document.getElementById("quiz-root"));