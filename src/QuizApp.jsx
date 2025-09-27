import { useState } from 'react'
import './App.css'

// Quiz data
const quizData = [
    {
    question: "Which React Hook is used to manage state in functional components?",
    options: ["useEffect", "useState", "useContext", "useReducer"],
    correct: 1
    },
    {
    question: "What is the correct way to pass data from parent to child components in React?",
    options: ["Using state", "Using props", "Using hooks", "Using refs"],
    correct: 1
    },
    {
    question: "Which command is used to start a development server in a Vite React app?",
    options: ["npm start", "npm run dev", "npm serve", "npm develop"],
    correct: 1
    },
    {
    question: "What file extension is commonly used for React components in Vite?",
    options: [".js", ".jsx", ".react", ".component"],
    correct: 1
    },
    {
    question: "Which CSS methodology allows you to write styles in separate .css files?",
    options: ["Inline styles", "External stylesheets", "CSS-in-JS", "Style objects"],
    correct: 1
    },
    {
    question: "What is the purpose of the 'key' prop when rendering lists in React?",
    options: ["Styling elements", "Handling events", "Optimizing re-renders", "Passing data"],
    correct: 2
    },
    {
    question: "Which React Hook would you use to perform side effects like API calls?",
    options: ["useState", "useEffect", "useMemo", "useCallback"],
    correct: 1
    },
    {
    question: "What is the main advantage of using Vite over Create React App?",
    options: ["Smaller file size", "Faster development server", "Better documentation", "More features"],
    correct: 1
    },
    {
    question: "In React, what is the correct way to handle button click events?",
    options: ["onclick", "onClick", "onPress", "onTap"],
    correct: 1
    },
    {
    question: "Which method is used to update state in a useState hook?",
    options: ["updateState()", "setState()", "The setter function", "changeState()"],
    correct: 2
    }
];

// Question Component
const Question = ({ question, options, onAnswer, questionNumber, totalQuestions }) => {
    return (
        <div className="question-container">
        <div className="progress-container">
            <span className="progress-text">
            Question {questionNumber} of {totalQuestions}
            </span>
            <div className="progress-bar">
            <div 
                className="progress-fill"
                style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
            </div>
        </div>
        
        <h2 className="question-text">{question}</h2>
        
        <div className="options-container">
            {options.map((option, index) => (
            <button
                key={index}
                onClick={() => onAnswer(index)}
                className="option-button"
            >
                <span className="option-label">
                {String.fromCharCode(65 + index)}.
                </span> {option}
            </button>
            ))}
        </div>
        </div>
    );
};

// Results Component
const Results = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);

    const getScoreMessage = () => {
        if (percentage >= 80) return "Excellent!";
        if (percentage >= 60) return "Good job!";
        if (percentage >= 40) return "Not bad!";
        return "Keep practicing!";
    };

    return (
        <div className="results-container">
        <h2 className="results-title">Quiz Complete!</h2>
        
        <div className="score-container">
            <div className="score-text">{score}/{totalQuestions}</div>
            <div className="percentage-text">{percentage}% Correct</div>
        </div>
        
        <div className="message-text">{getScoreMessage()}</div>
        
        <div className="progress-container">
            <div className="progress-bar">
            <div 
                className="result-progress-fill"
                style={{ width: `${percentage}%` }}
            />
            </div>
        </div>
        
        <button
            onClick={onRestart}
            className="restart-button"
        >
            Take Quiz Again
        </button>
        </div>
    );
};

// Main Quiz App Component
const QuizApp = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const handleAnswer = (selectedIndex) => {
        if (selectedIndex === quizData[currentQuestion].correct) {
        setScore(score + 1);
        }
        
        setTimeout(() => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < quizData.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowResults(true);
        }
        }, 500);
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResults(false);
    };

    return (
        <div className="quiz-app-container">
        <h1 className="quiz-app-title">React Quiz App</h1>
        
        {showResults ? (
            <Results 
            score={score}
            totalQuestions={quizData.length}
            onRestart={restartQuiz}
            />
        ) : (
            <Question
            question={quizData[currentQuestion].question}
            options={quizData[currentQuestion].options}
            onAnswer={handleAnswer}
            questionNumber={currentQuestion + 1}
            totalQuestions={quizData.length}
            />
        )}
        </div>
    );
};

export default QuizApp;