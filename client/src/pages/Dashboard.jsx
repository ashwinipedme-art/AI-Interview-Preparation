import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleTechnicalInterview = () => {
    navigate("/interview/technical");
  };

  const handleHRInterview = () => {
    navigate("/interview/hr");
  };

  const handleMockInterview = () => {
    navigate("/interview/mock");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div
      style={{
        padding: "30px",
        textAlign: "center",
      }}
    >
      <h1>🎯 AI Interview Preparation</h1>

      <p>Welcome to your Dashboard!</p>

      <hr />

      <h2>Choose Your Interview</h2>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleTechnicalInterview}
          style={{
            margin: "10px",
            padding: "12px 20px",
            cursor: "pointer",
          }}
        >
          Technical Interview
        </button>

        <button
          onClick={handleHRInterview}
          style={{
            margin: "10px",
            padding: "12px 20px",
            cursor: "pointer",
          }}
        >
          HR Interview
        </button>

        <button
          onClick={handleMockInterview}
          style={{
            margin: "10px",
            padding: "12px 20px",
            cursor: "pointer",
          }}
        >
          Mock Interview
        </button>
      </div>

      <br />

      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;