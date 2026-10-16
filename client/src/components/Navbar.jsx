import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        backgroundColor: "#2563eb",
        color: "white",
      }}
    >
      <h2>AI Interview</h2>

      <div>
        <Link to="/login">
          <button style={{ marginRight: "10px" }}>Login</button>
        </Link>

        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;