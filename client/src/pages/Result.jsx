
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const data = state || {};

  const answers = data.answers || [];
  const scores = data.answerScores || [];

  const totalQuestions = answers.length;
  const completed = answers.filter((item) =>
    (typeof item === "string" ? item : item?.answer || "").trim()
  ).length;

  const totalScore = scores.reduce(
    (sum, item) => sum + Number(item.score || 0),
    0
  );

  const maxScore = scores.length * 5;
  const percentage = maxScore
    ? Math.round((totalScore / maxScore) * 100)
    : 0;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f3f4ff",
      padding: "30px 15px",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        maxWidth: "800px",
        margin: "auto",
        padding: "25px",
        background: "white",
        borderRadius: "15px",
        color: "#30245c"
      }}>
        <h1 style={{ textAlign: "center" }}>
          📊 {data.type || "Interview"} Result
        </h1>

        <h2 style={{ textAlign: "center", color: "#16803d" }}>
          Interview Completed!
        </h2>

        <p><strong>Strength:</strong> {data.strength || "Keep practising your interview skills."}</p>
        <p><strong>Suggestion:</strong> {data.suggestion || "Give clear answers with relevant examples."}</p>

        <div style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          margin: "25px 0"
        }}>
          {[
            ["Answers Completed", `${completed}/${totalQuestions}`],
            ["Total Score", `${totalScore}/${maxScore}`],
            ["Percentage", `${percentage}%`]
          ].map(([label, value]) => (
            <div key={label} style={{
              flex: "1 1 140px",
              padding: "18px 10px",
              textAlign: "center",
              background: "#eeeaff",
              borderRadius: "10px"
            }}>
              <h2 style={{ margin: "0 0 8px", color: "#5140ad" }}>
                {value}
              </h2>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <h2>📝 Your Answers & Scores</h2>

        {answers.map((item, index) => (
          <div key={index} style={{
            padding: "15px",
            marginBottom: "12px",
            border: "1px solid #ddd6fe",
            borderRadius: "10px",
            overflowWrap: "anywhere"
          }}>
            <h3>Q{index + 1}: {item.question || `Question ${index + 1}`}</h3>
            <p>
              <strong>Your Answer:</strong>{" "}
              {item.answer?.trim() || "No answer provided"}
            </p>
            <p>
              <strong>Score:</strong>{" "}
              {scores[index] ? `${scores[index].score}/5` : "Not available"}
            </p>
          </div>
        ))}

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            width: "100%",
            padding: "14px",
            background: "#5140ad",
            color: "white",
            border: "none",
            borderRadius: "9px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "20px"
          }}
        >
          🏠 Back to Dashboard
        </button>
      </div>
    </div>
  );
}
