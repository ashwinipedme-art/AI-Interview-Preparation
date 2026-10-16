
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Interview = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  const questionBank = {
    technical: [
      "What is React and how does Virtual DOM work?",
      "What is React state and how is it different from props?",
      "What are React Hooks?",
      "Explain the difference between SQL and NoSQL databases.",
      "How does Node.js handle asynchronous operations using Event Loop?",
      "What are Promises and async/await in JavaScript?",
      "What is the difference between REST API and GraphQL?",
      "What is JavaScript and why is it used in web development?",
      "What is the difference between let, const and var?",
      "What is a component in React?",
      "What is JSX in React?",
      "What is MongoDB and how is it different from MySQL?",
      "What is Express.js?",
      "What is an API?",
      "What is the difference between GET and POST requests?",
      "What is Git and why is it used?",
      "What is the difference between frontend and backend development?",
      "What is an algorithm?",
      "What is Object-Oriented Programming?",
      "Explain the four main principles of OOP."
    ],
    hr: [
      "Introduce yourself briefly.",
      "Why do you want to join our company?",
      "What are your key strengths and weaknesses?",
      "Tell me about a time you handled a difficult situation.",
      "Where do you see yourself in 5 years?",
      "How do you handle stress and tight deadlines?",
      "Do you have any questions for us?",
      "Why should we hire you?",
      "Why did you choose Computer Science?",
      "What are your career goals?",
      "What motivates you?",
      "How do you handle failure?",
      "How do you work in a team?",
      "Tell me about your biggest achievement.",
      "What is your biggest weakness and how are you improving it?",
      "How do you handle criticism?",
      "Are you comfortable working under pressure?",
      "What are your salary expectations?",
      "Are you willing to relocate?",
      "Why should we select you over other candidates?"
    ],
    mock: [
      "Introduce yourself briefly.",
      "What is React and how does Virtual DOM work?",
      "Why do you want to join our company?",
      "What are React Hooks?",
      "What are your key strengths and weaknesses?",
      "Explain the difference between SQL and NoSQL databases.",
      "Where do you see yourself in 5 years?",
      "Why should we hire you?",
      "What is JavaScript?",
      "What is Node.js?",
      "What is MongoDB?",
      "What is an API?",
      "Explain REST API.",
      "What is Git?",
      "What is Object-Oriented Programming?",
      "How do you handle stress?",
      "Tell me about your project.",
      "What challenges did you face in your project?",
      "What are your career goals?",
      "Do you have any questions for us?"
    ]
  };

  const selectedType = type ? type.toLowerCase() : "mock";
  const questions = questionBank[selectedType] || questionBank.mock;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState(
    Array(questions.length).fill("")
  );

  function evaluateAnswer(answer, question) {
    if (!answer || answer.trim().length < 10) return 0;

    const words = answer.trim().split(/\s+/);
    let score = 1;

    if (words.length >= 10) score++;
    if (words.length >= 25) score++;
    if (words.length >= 40) score++;

    const answerWords = new Set(
      answer.toLowerCase().match(/[a-z0-9]+/g) || []
    );

    const keywords = question
      .toLowerCase()
      .match(/[a-z0-9]+/g)
      .filter((word) => word.length > 3);

    const matched = keywords.filter((word) =>
      answerWords.has(word)
    ).length;

    if (matched >= 2) score++;

    return Math.min(score, 5);
  }

  function handleNext() {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = currentAnswer.trim();

    setAnswers(updatedAnswers);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setCurrentAnswer(updatedAnswers[currentIndex + 1]);
      return;
    }

    const answerScores = questions.map((question, index) => ({
      question,
      answer: updatedAnswers[index],
      score: evaluateAnswer(updatedAnswers[index], question)
    }));

    const totalScore = answerScores.reduce(
      (sum, item) => sum + item.score,
      0
    );

    const completed = updatedAnswers.filter(
      (answer) => answer.trim() !== ""
    ).length;

    navigate("/result", {
      state: {
        type: selectedType.toUpperCase(),
        answers: answerScores.map((item) => ({
          question: item.question,
          answer: item.answer
        })),
        answerScores,
        score: totalScore,
        total: questions.length * 5,
        completed,
        strength:
          completed > 0
            ? "You attempted " + completed + " out of " +
              questions.length + " questions."
            : "You need more practice.",
        suggestion:
          "Give clear, relevant answers with examples and explain your ideas in detail."
      }
    });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px 15px",
        boxSizing: "border-box",
        background: "#f3f4ff",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "auto",
          padding: "25px",
          background: "#fff",
          color: "#252044",
          borderRadius: "15px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)"
        }}
      >
        <h2 style={{ color: "#5140ad" }}>
          🎯 {selectedType.toUpperCase()} Interview
        </h2>

        <p>
          Question {currentIndex + 1} of {questions.length}
        </p>

        <div
          style={{
            height: "8px",
            background: "#e6e2fa",
            borderRadius: "10px",
            overflow: "hidden",
            marginBottom: "25px"
          }}
        >
          <div
            style={{
              height: "100%",
              width:
                ((currentIndex + 1) / questions.length) * 100 + "%",
              background: "#6550c8"
            }}
          />
        </div>

        <h3>{questions[currentIndex]}</h3>

        <textarea
          rows={6}
          style={{
            width: "100%",
            padding: "14px",
            margin: "15px 0",
            color: "#222",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxSizing: "border-box",
            fontSize: "16px"
          }}
          placeholder="Type your answer here..."
          value={currentAnswer}
          onChange={(e) => setCurrentAnswer(e.target.value)}
        />

        <button
          onClick={handleNext}
          style={{
            width: "100%",
            padding: "13px",
            background: "#5140ad",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          {currentIndex + 1 === questions.length
            ? "Submit & View Result"
            : "Save Answer & Next ➡"}
        </button>
      </div>
    </div>
  );
};

export default Interview;
