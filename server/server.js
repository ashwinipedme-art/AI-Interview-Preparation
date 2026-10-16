import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Questions Route (7 Questions per Category)
app.post("/api/questions", (req, res) => {
  const { type } = req.body;

  const questionBank = {
    technical: [
      "What is React and how does Virtual DOM work?",
      "What is React state and how is it different from props?",
      "What are React Hooks?",
      "Explain the difference between SQL and NoSQL databases.",
      "How does Node.js handle asynchronous operations using Event Loop?",
      "What are Promises and async/await in JavaScript?",
      "What is the difference between REST API and GraphQL?"
    ],
    hr: [
      "Tell me about yourself.",
      "Why do you want to join our company?",
      "What are your key strengths and weaknesses?",
      "Tell me about a time you handled a difficult situation.",
      "Where do you see yourself in 5 years?",
      "How do you handle stress and tight deadlines?",
      "Do you have any questions for us?"
    ]
  };

  const selectedQuestions = questionBank[type] || questionBank.technical;
  res.json({ questions: selectedQuestions });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});