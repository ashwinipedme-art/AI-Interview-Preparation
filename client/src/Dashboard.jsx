import React, { useState } from "react";

function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const questions = [
    {
      question: "What is OOP?",
      options: [
        "Object Oriented Programming",
        "Object Operating Program",
        "Online Object Programming",
        "None of these",
      ],
      answer: "Object Oriented Programming",
    },
    {
      question: "Which language is mainly used for web development?",
      options: ["HTML", "Python", "JavaScript", "All of these"],
      answer: "All of these",
    },
    {
      question: "What does CPU stand for?",
      options: [
        "Central Processing Unit",
        "Computer Processing Unit",
        "Central Program Unit",
        "Control Processing Unit",
      ],
      answer: "Central Processing Unit",
    },
    {
      question: "Which data structure uses FIFO?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      answer: "Queue",
    },
    {
      question: "Which data structure uses LIFO?",
      options: ["Queue", "Array", "Stack", "Linked List"],
      answer: "Stack",
    },
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Hyperlink Text Markup Language",
        "Home Tool Markup Language",
      ],
      answer: "Hyper Text Markup Language",
    },
    {
      question: "Which keyword is used to declare a variable in JavaScript?",
      options: ["var", "int", "string", "define"],
      answer: "var",
    },
    {
      question: "Which database is a NoSQL database?",
      options: ["MySQL", "Oracle", "MongoDB", "PostgreSQL"],
      answer: "MongoDB",
    },
    {
      question: "What is the full form of SQL?",
      options: [
        "Structured Query Language",
        "Simple Query Language",
        "System Query Language",
        "Structured Question Language",
      ],
      answer: "Structured Query Language",
    },
    {
      question: "Which protocol is used for secure web communication?",
      options: ["HTTP", "HTTPS", "FTP", "SMTP"],
      answer: "HTTPS",
    },
    {
      question: "Which one is an operating system?",
      options: ["Python", "Linux", "HTML", "Java"],
      answer: "Linux",
    },
    {
      question: "What is an algorithm?",
      options: [
        "A programming language",
        "A step-by-step procedure to solve a problem",
        "A database",
        "An operating system",
      ],
      answer: "A step-by-step procedure to solve a problem",
    },
    {
      question: "Which sorting algorithm has average O(n log n) complexity?",
      options: ["Bubble Sort", "Merge Sort", "Linear Search", "Selection Sort"],
      answer: "Merge Sort",
    },
    {
      question: "What is React?",
      options: [
        "A database",
        "A JavaScript library",
        "An operating system",
        "A programming language",
      ],
      answer: "A JavaScript library",
    },
    {
      question: "Which command is used to initialize a Git repository?",
      options: ["git start", "git init", "git create", "git new"],
      answer: "git init",
    },
    {
      question: "What does API stand for?",
      options: [
        "Application Programming Interface",
        "Application Program Internet",
        "Advanced Programming Interface",
        "Application Process Interface",
      ],
      answer: "Application Programming Interface",
    },
    {
      question: "Which symbol is used for comments in JavaScript?",
      options: ["//", "##", "<!--", "**"],
      answer: "//",
    },
    {
      question: "What is the purpose of a database?",
      options: [
        "To store and manage data",
        "To design websites",
        "To create images",
        "To run hardware",
      ],
      answer: "To store and manage data",
    },
    {
      question: "Which HTTP method is commonly used to create data?",
      options: ["GET", "POST", "DELETE", "PUT"],
      answer: "POST",
    },
    {
      question: "What does AI stand for?",
      options: [
        "Automatic Internet",
        "Artificial Intelligence",
        "Advanced Information",
        "Artificial Internet",
      ],
      answer: "Artificial Intelligence",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
  };

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion === questions.length - 1) {
      setFinished(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer("");
    }
  };

  const restartInterview = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setFinished(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f8",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "auto",
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          🎯 AI Interview Preparation
        </h1>

        <p style={{ textAlign: "center" }}>
          Welcome to your Dashboard!
        </p>

        <hr />

        <h2>Choose Your Interview</h2>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "25px",
          }}
        >
          <button>💻 Technical Interview</button>
          <button>👨‍💼 HR Interview</button>
          <button>🎤 Mock Interview</button>
        </div>

        <hr />

        {!finished ? (
          <div>
            <h3>
              Question {currentQuestion + 1} / {questions.length}
            </h3>

            <h2>{questions[currentQuestion].question}</h2>

            <div>
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "12px",
                    margin: "10px 0",
                    textAlign: "left",
                    cursor: "pointer",
                    borderRadius: "8px",
                    border:
                      selectedAnswer === option
                        ? "2px solid blue"
                        : "1px solid #ccc",
                    background:
                      selectedAnswer === option
                        ? "#e8f0ff"
                        : "white",
                  }}
                >
                  {String.fromCharCode(65 + index)}. {option}
                </button>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "25px",
              }}
            >
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                ⬅ Previous
              </button>

              <button
                onClick={handleNext}
                disabled={!selectedAnswer}
              >
                {currentQuestion === questions.length - 1
                  ? "Finish 🎯"
                  : "Next ➡"}
              </button>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <h2>🎉 Interview Completed!</h2>

            <h1>
              Your Score: {score} / {questions.length}
            </h1>

            <p>
              Percentage:{" "}
              {Math.round((score / questions.length) * 100)}%
            </p>

            <button onClick={restartInterview}>
              🔄 Restart Interview
            </button>
          </div>
        )}

        <hr />

        <button onClick={handleLogout}>🚪 Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;