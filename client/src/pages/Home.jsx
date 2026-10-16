import Navbar from "../components/Navbar";
import "../Home.css";

function Home() {
  return (
    <>
      <Navbar />

      <div className="hero">
        <h1>Ace Your Interview with AI 🤖</h1>

        <p>
          Practice interviews, get instant AI feedback and improve your skills.
        </p>

        <button>Start Interview</button>
      </div>
    </>
  );
}

export default Home;