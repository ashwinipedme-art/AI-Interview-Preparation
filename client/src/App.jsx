
import React, { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

const questionData = {
  technical: [
    "Tell me about yourself.",
    "What is a programming language?",
    "What is the difference between HTML and CSS?",
    "What is JavaScript?",
    "What is a variable?",
    "What is the difference between SQL and NoSQL?",
    "What is a database?",
  ],
  hr: [
    "Tell me about yourself.",
    "What are your strengths?",
    "What are your weaknesses?",
    "Why should we hire you?",
    "Why do you want to join our company?",
    "Where do you see yourself in five years?",
    "Do you prefer working alone or in a team?",
  ],
  mock: [
    "Introduce yourself.",
    "Explain your final-year project.",
    "Which programming languages do you know?",
    "What challenges have you faced in your project?",
    "How do you solve a difficult problem?",
    "How do you handle pressure?",
    "Why should we select you?",
  ],
};

const aptitudeQuestions = [
  { q: "What is 10 + 20?", options: ["20", "30", "40", "50"], answer: "30" },
  { q: "What is 12 × 5?", options: ["50", "55", "60", "65"], answer: "60" },
  { q: "What is 100 ÷ 4?", options: ["20", "25", "30", "40"], answer: "25" },
  { q: "What is 15% of 200?", options: ["20", "25", "30", "35"], answer: "30" },
  { q: "What comes next: 2, 4, 6, 8, ?", options: ["9", "10", "11", "12"], answer: "10" },
  { q: "Which is the largest number?", options: ["12", "45", "32", "21"], answer: "45" },
  { q: "What is 9 × 9?", options: ["72", "81", "90", "99"], answer: "81" },
  { q: "What is the square of 5?", options: ["10", "15", "20", "25"], answer: "25" },
  { q: "What is 50 + 75?", options: ["115", "120", "125", "130"], answer: "125" },
  { q: "Half of 80 is?", options: ["20", "30", "40", "50"], answer: "40" },
  { q: "What is 7 × 8?", options: ["54", "56", "58", "64"], answer: "56" },
  { q: "What is 144 ÷ 12?", options: ["10", "11", "12", "14"], answer: "12" },
  { q: "What is 25% of 100?", options: ["10", "20", "25", "50"], answer: "25" },
  { q: "What is 18 + 27?", options: ["35", "40", "45", "50"], answer: "45" },
  { q: "What is 11 × 11?", options: ["111", "121", "131", "141"], answer: "121" },
  { q: "What is 90 - 35?", options: ["45", "50", "55", "65"], answer: "55" },
  { q: "What is 3 cubed?", options: ["9", "18", "27", "36"], answer: "27" },
  { q: "What is 1 kilometre in metres?", options: ["100", "500", "1000", "10000"], answer: "1000" },
  { q: "Which is an even number?", options: ["13", "17", "21", "24"], answer: "24" },
  { q: "What is 60 ÷ 5?", options: ["10", "12", "15", "20"], answer: "12" },
  { q: "What is 20% of 150?", options: ["20", "25", "30", "35"], answer: "30" },
  { q: "What is 14 + 16?", options: ["28", "30", "32", "34"], answer: "30" },
  { q: "What is 8 × 6?", options: ["42", "46", "48", "54"], answer: "48" },
  { q: "What is 81 ÷ 9?", options: ["7", "8", "9", "10"], answer: "9" },
  { q: "What is 5% of 200?", options: ["5", "10", "15", "20"], answer: "10" },
  { q: "What comes next: 5, 10, 15, 20, ?", options: ["22", "24", "25", "30"], answer: "25" },
  { q: "How many days are in a week?", options: ["5", "6", "7", "8"], answer: "7" },
  { q: "What is 45 + 55?", options: ["90", "95", "100", "110"], answer: "100" },
  { q: "What is 13 × 3?", options: ["36", "39", "42", "45"], answer: "39" },
  { q: "What is 64 ÷ 8?", options: ["6", "7", "8", "9"], answer: "8" },
  { q: "What is 30% of 300?", options: ["30", "60", "90", "120"], answer: "90" },
  { q: "Which is the smallest number?", options: ["0.5", "0.2", "0.8", "1"], answer: "0.2" },
  { q: "What is 19 + 21?", options: ["30", "35", "40", "45"], answer: "40" },
  { q: "What is 12 × 12?", options: ["124", "132", "144", "154"], answer: "144" },
  { q: "What is 200 - 85?", options: ["105", "110", "115", "125"], answer: "115" },
  { q: "What is the square of 10?", options: ["10", "50", "100", "1000"], answer: "100" },
  { q: "What is 72 ÷ 6?", options: ["10", "11", "12", "14"], answer: "12" },
  { q: "What is 40% of 50?", options: ["10", "15", "20", "25"], answer: "20" },
  { q: "How many hours are in a day?", options: ["12", "18", "24", "48"], answer: "24" },
  { q: "What is 17 + 18?", options: ["33", "34", "35", "36"], answer: "35" },
  { q: "What is 6 × 7?", options: ["36", "40", "42", "48"], answer: "42" },
  { q: "What is 121 ÷ 11?", options: ["10", "11", "12", "13"], answer: "11" },
  { q: "What is 10% of 450?", options: ["35", "40", "45", "50"], answer: "45" },
  { q: "What comes next: 3, 6, 9, 12, ?", options: ["13", "14", "15", "18"], answer: "15" },
  { q: "How many months are in a year?", options: ["10", "11", "12", "13"], answer: "12" },
  { q: "What is 99 + 1?", options: ["90", "99", "100", "101"], answer: "100" },
  { q: "What is 15 × 4?", options: ["45", "50", "60", "75"], answer: "60" },
  { q: "What is 100 ÷ 10?", options: ["1", "5", "10", "20"], answer: "10" },
  { q: "What is 50% of 80?", options: ["20", "30", "40", "50"], answer: "40" },
  { q: "What is 25 + 25?", options: ["40", "45", "50", "55"], answer: "50" },
];

function ProtectedRoute({ children }) {
  return localStorage.getItem("token")
    ? children
    : <Navigate to="/login" replace />;
}

function Dashboard() {
  const navigate = useNavigate();
  const name = localStorage.getItem("userName") || "Student";

  const cards = [
    { title: "Technical Interview", description: "Improve your technical knowledge", path: "/interview/technical", emoji: "💻" },
    { title: "HR Interview", description: "Prepare for HR interview rounds", path: "/interview/hr", emoji: "🤝" },
    { title: "Mock Interview", description: "Practice real interview questions", path: "/interview/mock", emoji: "🎤" },
    { title: "Aptitude Test", description: "Check your aptitude skills", path: "/aptitude", emoji: "🧮" },
  ];

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  }

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.mainTitle}>AI Interview Preparation</h1>
          <p style={{ color: "#475569", marginTop: 8 }}>
            Your personal interview practice platform
          </p>
        </div>
        <button style={styles.secondaryButton} onClick={logout}>Logout</button>
      </header>

      <section style={styles.welcomeBox}>
        <h2 style={styles.blackQuestion}>Welcome, {name}! 👋</h2>
        <p style={styles.welcomeText}>
          Ready to achieve your dream job? Practice your skills, improve your confidence,
          and prepare for your next interview.
        </p>
      </section>

      <h2 style={styles.blackQuestion}>Your Dashboard</h2>
      <p style={{ color: "#475569" }}>Choose an activity to start your preparation.</p>

      <section style={styles.grid}>
        {cards.map((card) => (
          <article key={card.path} style={styles.card}>
            <div style={styles.cardIcon}>{card.emoji}</div>
            <h3 style={styles.cardTitle}>{card.title}</h3>
            <p style={styles.cardDescription}>{card.description}</p>
            <button style={styles.button} onClick={() => navigate(card.path)}>
              Start Practice →
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}

function Interview() {
  const { type } = useParams();
  const navigate = useNavigate();
  const questions = questionData[type] || questionData.technical;

  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);

  const currentQuestion = questions[index];

  function nextQuestion() {
    const updatedAnswers = [
      ...answers,
      {
        question: currentQuestion,
        answer: answer.trim() || "No answer provided",
      },
    ];

    if (index === questions.length - 1) {
      navigate("/result", {
        state: {
          answers: updatedAnswers,
          type,
          mode: "interview",
        },
      });
      return;
    }

    setAnswers(updatedAnswers);
    setIndex(index + 1);
    setAnswer("");
  }

  function speakQuestion() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const speech = new SpeechSynthesisUtterance(currentQuestion);
      speech.lang = "en-IN";
      speech.rate = 0.9;
      window.speechSynthesis.speak(speech);
    } else {
      alert("Speech is not supported in this browser.");
    }
  }

  function startVoiceAnswer() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input is not supported. Please type your answer.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      setAnswer((previous) =>
        `${previous} ${event.results[0][0].transcript}`.trim()
      );
    };

    recognition.onerror = () => {
      alert("Voice recognition failed. Please type your answer.");
    };

    recognition.start();
  }

  return (
    <main style={styles.page}>
      <button style={styles.secondaryButton} onClick={() => navigate("/dashboard")}>
        ← Dashboard
      </button>

      <section style={styles.panel}>
        <div style={styles.interviewHeading}>
          <span style={{ fontSize: 34 }}>
            {type === "hr" ? "🤝" : type === "mock" ? "🎤" : "💻"}
          </span>
          <div>
            <h1 style={styles.blackQuestion}>
              {type === "hr" ? "HR Interview" : type === "mock" ? "Mock Interview" : "Technical Interview"}
            </h1>
            <p style={styles.muted}>
              Question {index + 1} of {questions.length}
            </p>
          </div>
        </div>

        <div style={styles.progressTrack}>
          <div
            style={{
              ...styles.progressBar,
              width: `${((index + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        <div style={styles.questionBox}>
          <p style={styles.questionLabel}>INTERVIEW QUESTION</p>
          <h2 style={styles.blackQuestion}>{currentQuestion}</h2>
          <button style={styles.listenButton} onClick={speakQuestion}>
            🔊 Listen to Question
          </button>
        </div>

        <label htmlFor="answer" style={styles.label}>Your Answer</label>

        <textarea
          id="answer"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder="Type your answer here..."
          rows={6}
          style={styles.textarea}
        />

        <div style={styles.actions}>
          <button style={styles.secondaryButton} onClick={startVoiceAnswer}>
            🎙️ Answer by Voice
          </button>

          <button style={styles.button} onClick={nextQuestion}>
            {index === questions.length - 1 ? "Finish Interview ✓" : "Next Question →"}
          </button>
        </div>
      </section>
    </main>
  );
}

function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const answers = location.state?.answers || [];
  const type = location.state?.type || "interview";

  const scoredAnswers = answers.map((item) => {
    const response = (item.answer || "").trim();
    const words = response.split(/\s+/).filter(Boolean).length;
    let score = 0;

    if (response && response !== "No answer provided" && response.length >= 10) {
      if (words >= 40) score = 5;
      else if (words >= 25) score = 4;
      else if (words >= 15) score = 3;
      else if (words >= 8) score = 2;
      else score = 1;
    }

    return { ...item, score };
  });

  const totalScore = scoredAnswers.reduce((sum, item) => sum + item.score, 0);
  const maxScore = scoredAnswers.length * 5;
  const percentage = maxScore ? Math.round((totalScore / maxScore) * 100) : 0;
  const completed = answers.filter(
    (item) =>
      item.answer &&
      item.answer.trim() !== "" &&
      item.answer !== "No answer provided"
  ).length;

  let performance = "Keep Practicing 💪";
  if (percentage >= 80) performance = "Excellent Performance! 🏆";
  else if (percentage >= 60) performance = "Good Performance! ⭐";
  else if (percentage >= 40) performance = "Fair Performance 👍";

  return (
    <main style={styles.page}>
      <section style={styles.panel}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 54 }}>🏆</div>
          <h1 style={styles.blackQuestion}>Interview Result</h1>
          <p>{type.toUpperCase()} INTERVIEW COMPLETED</p>

          <div style={styles.scoreCircle}>
            <strong style={{ fontSize: 34, color: "#000000" }}>{percentage}%</strong>
            <span>Overall Score</span>
          </div>

          <h2 style={styles.blackQuestion}>{performance}</h2>
          <p>Score: {totalScore} / {maxScore}</p>
          <p>Answers submitted: {completed} / {answers.length}</p>
          <p style={styles.muted}>
            Demo score based on answer length, not AI evaluation.
          </p>
        </div>

        <h2 style={styles.blackQuestion}>Answer Review</h2>

        {scoredAnswers.length === 0 ? (
          <p>No result data found. Start an interview from the Dashboard and finish it to see your result.</p>
        ) : (
          scoredAnswers.map((item, i) => (
            <article key={`${i}-${item.question}`} style={styles.answerCard}>
              <h3 style={styles.blackQuestion}>Q{i + 1}. {item.question}</h3>
              <p><strong>Your Answer:</strong> {item.answer}</p>
              <p><strong>Score:</strong> {item.score} / 5</p>
            </article>
          ))
        )}

        <div style={styles.actions}>
          <button style={styles.button} onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
          <button
            style={styles.secondaryButton}
            onClick={() => navigate(`/interview/${["hr", "mock"].includes(type) ? type : "technical"}`)}
          >
            Try Again
          </button>
        </div>
      </section>
    </main>
  );
}

function Aptitude() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState({});
  const [finished, setFinished] = useState(false);
  const question = aptitudeQuestions[index];

  const score = aptitudeQuestions.reduce(
    (total, item, i) => total + (selected[i] === item.answer ? 1 : 0),
    0
  );

  if (finished) {
    const percentage = Math.round((score / aptitudeQuestions.length) * 100);

    return (
      <main style={styles.page}>
        <section style={styles.panel}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48 }}>🧮</div>
            <h1 style={styles.blackQuestion}>Aptitude Test Result</h1>

            <div style={styles.scoreCircle}>
              <strong style={{ fontSize: 34, color: "#000000" }}>{percentage}%</strong>
              <span>Your Score</span>
            </div>

            <h2 style={styles.blackQuestion}>{score} / {aptitudeQuestions.length}</h2>
            <p>Correct answers: {score}</p>
            <p>Wrong or unanswered: {aptitudeQuestions.length - score}</p>

            <button style={styles.button} onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </button>

            <button
              style={{ ...styles.secondaryButton, marginLeft: 10 }}
              onClick={() => {
                setIndex(0);
                setSelected({});
                setFinished(false);
              }}
            >
              Try Again
            </button>
          </div>

          <h2 style={styles.blackQuestion}>Answer Review</h2>

          {aptitudeQuestions.map((item, i) => (
            <article key={i} style={styles.answerCard}>
              <h3 style={styles.blackQuestion}>Q{i + 1}. {item.q}</h3>
              <p>Your answer: {selected[i] || "Not answered"}</p>
              <p>Correct answer: {item.answer}</p>
              <p style={{ color: selected[i] === item.answer ? "green" : "crimson" }}>
                {selected[i] === item.answer ? "Correct ✓" : "Incorrect ✗"}
              </p>
            </article>
          ))}
        </section>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <button style={styles.secondaryButton} onClick={() => navigate("/dashboard")}>
        ← Dashboard
      </button>

      <section style={styles.panel}>
        <p style={styles.muted}>
          APTITUDE TEST · Question {index + 1} of {aptitudeQuestions.length}
        </p>

        <div style={styles.progressTrack}>
          <div
            style={{
              ...styles.progressBar,
              width: `${((index + 1) / aptitudeQuestions.length) * 100}%`,
            }}
          />
        </div>

        <h2 style={styles.blackQuestion}>{question.q}</h2>

        <div style={{ display: "grid", gap: 12 }}>
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => setSelected({ ...selected, [index]: option })}
              style={{
                ...styles.optionButton,
                background: selected[index] === option ? "#dbeafe" : "#ffffff",
                borderColor: selected[index] === option ? "#2563eb" : "#d1d5db",
              }}
            >
              {selected[index] === option ? "🔘 " : "◯ "}{option}
            </button>
          ))}
        </div>

        <div style={styles.actions}>
          <button
            style={styles.secondaryButton}
            disabled={index === 0}
            onClick={() => setIndex(index - 1)}
          >
            Previous
          </button>

          {index < aptitudeQuestions.length - 1 ? (
            <button style={styles.button} onClick={() => setIndex(index + 1)}>
              Next Question →
            </button>
          ) : (
            <button style={styles.button} onClick={() => setFinished(true)}>
              Submit Test
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "30px 5%",
    boxSizing: "border-box",
    background: "linear-gradient(135deg, #f1f5f9, #eff6ff)",
    color: "#1f2937",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 24,
  },
  mainTitle: {
    margin: 0,
    color: "#111827",
    fontSize: 32,
    fontWeight: 800,
  },
  welcomeBox: {
    background: "linear-gradient(135deg, #dbeafe, #ede9fe)",
    padding: 26,
    borderRadius: 18,
    margin: "20px 0 30px",
    boxShadow: "0 8px 24px rgba(30, 64, 175, 0.10)",
  },
  welcomeText: {
    color: "#334155",
    fontSize: 16,
    lineHeight: 1.7,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 22,
    marginTop: 25,
  },
  card: {
    background: "#ffffff",
    padding: 25,
    borderRadius: 18,
    border: "1px solid #dbeafe",
    boxShadow: "0 8px 22px rgba(0,0,0,0.07)",
  },
  cardIcon: {
    fontSize: 42,
    marginBottom: 12,
  },
  cardTitle: {
    color: "#000000",
    fontWeight: 800,
    fontSize: 21,
  },
  cardDescription: {
    color: "#475569",
    minHeight: 42,
    lineHeight: 1.5,
  },
  panel: {
    maxWidth: 850,
    margin: "25px auto",
    background: "#ffffff",
    padding: 28,
    borderRadius: 18,
    boxShadow: "0 8px 26px rgba(0,0,0,0.08)",
  },
  interviewHeading: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
  },
  blackQuestion: {
    color: "#000000",
    fontWeight: 800,
    fontSize: 26,
  },
  questionBox: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    padding: 22,
    marginTop: 20,
  },
  questionLabel: {
    color: "#475569",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 1.5,
  },
  button: {
    border: "none",
    borderRadius: 9,
    padding: "13px 19px",
    background: "#2563eb",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: 15,
    fontWeight: 700,
  },
  secondaryButton: {
    border: "1px solid #cbd5e1",
    borderRadius: 9,
    padding: "12px 17px",
    background: "#ffffff",
    color: "#1f2937",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
  },
  listenButton: {
    border: "1px solid #bfdbfe",
    borderRadius: 9,
    padding: "11px 16px",
    background: "#dbeafe",
    color: "#1e3a8a",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 700,
  },
  textarea: {
    width: "100%",
    boxSizing: "border-box",
    padding: 15,
    marginTop: 8,
    borderRadius: 10,
    border: "1px solid #475569",
    fontSize: 16,
    resize: "vertical",
    color: "#ffffff",
    backgroundColor: "#1f2937",
    caretColor: "#ffffff",
    lineHeight: 1.6,
  },
  label: {
    display: "block",
    marginTop: 24,
    fontWeight: 700,
    color: "#000000",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 24,
  },
  muted: {
    color: "#64748b",
    fontSize: 13,
  },
  progressTrack: {
    width: "100%",
    height: 8,
    background: "#e2e8f0",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 24,
  },
  progressBar: {
    height: "100%",
    background: "linear-gradient(90deg, #2563eb, #7c3aed)",
    transition: "width 0.2s",
  },
  scoreCircle: {
    width: 145,
    height: 145,
    borderRadius: "50%",
    background: "#eff6ff",
    border: "7px solid #bfdbfe",
    margin: "24px auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  answerCard: {
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: 16,
    marginTop: 14,
    overflowWrap: "anywhere",
    background: "#ffffff",
  },
  optionButton: {
    width: "100%",
    padding: 15,
    textAlign: "left",
    border: "2px solid #d1d5db",
    borderRadius: 9,
    cursor: "pointer",
    fontSize: 16,
    color: "#000000",
    fontWeight: 600,
  },
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/interview/:type"
        element={
          <ProtectedRoute>
            <Interview />
          </ProtectedRoute>
        }
      />

      <Route
        path="/result"
        element={
          <ProtectedRoute>
            <Result />
          </ProtectedRoute>
        }
      />

      <Route
        path="/aptitude"
        element={
          <ProtectedRoute>
            <Aptitude />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
