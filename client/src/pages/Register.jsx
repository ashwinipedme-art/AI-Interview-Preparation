import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function generateCaptcha() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";

  for (let i = 0; i < 6; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
}

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [captcha, setCaptcha] =
    useState(generateCaptcha());

  const [captchaInput, setCaptchaInput] =
    useState("");

  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] =
    useState("");

  const [otpSent, setOtpSent] =
    useState(false);

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
  };

  const sendOTP = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!email) {
      alert("Please enter your email");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    if (
      captchaInput.trim().toUpperCase() !== captcha
    ) {
      alert("Invalid CAPTCHA");
      refreshCaptcha();
      return;
    }

    const newOtp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    setGeneratedOtp(newOtp);
    setOtpSent(true);

    alert(`Demo OTP: ${newOtp}`);
  };

  const verifyOTP = (e) => {
    e.preventDefault();

    if (otp !== generatedOtp) {
      alert("Invalid OTP");
      return;
    }

    localStorage.setItem("token", "loggedin");
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userMobile", mobile);

    alert("Registration Successful! 🎉");

    navigate("/dashboard");
  };

  return (
    <div style={pageStyle}>
      <div style={boxStyle}>

        <div style={logoStyle}>🎯</div>

        <h1 style={titleStyle}>
          Create Account
        </h1>

        <p style={subtitleStyle}>
          AI Interview Preparation
        </p>

        {!otpSent ? (
          <form onSubmit={sendOTP}>

            <label style={labelStyle}>
              👤 Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              style={inputStyle}
            />

            <label style={labelStyle}>
              📧 Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              style={inputStyle}
            />

            <label style={labelStyle}>
              📱 Mobile Number
            </label>

            <div
              style={{
                display: "flex",
                marginBottom: "18px",
              }}
            >
              <span style={countryStyle}>
                +91
              </span>

              <input
                type="tel"
                maxLength="10"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={(e) =>
                  setMobile(
                    e.target.value.replace(/\D/g, "")
                  )
                }
                style={{
                  ...inputStyle,
                  marginBottom: 0,
                  borderRadius:
                    "0 8px 8px 0",
                }}
              />
            </div>

            <label style={labelStyle}>
              🔢 CAPTCHA
            </label>

            <div style={captchaRow}>
              <div style={captchaBox}>
                {captcha}
              </div>

              <button
                type="button"
                onClick={refreshCaptcha}
                style={refreshButton}
              >
                🔄
              </button>
            </div>

            <input
              type="text"
              placeholder="Enter CAPTCHA"
              value={captchaInput}
              onChange={(e) =>
                setCaptchaInput(e.target.value)
              }
              style={inputStyle}
            />

            <button
              type="submit"
              style={primaryButton}
            >
              📲 Send OTP
            </button>

          </form>
        ) : (
          <form onSubmit={verifyOTP}>

            <div
              style={{
                background: "#eff6ff",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              OTP sent to
              <br />
              <strong>
                +91 {mobile}
              </strong>
            </div>

            <label style={labelStyle}>
              🔐 Enter 6-Digit OTP
            </label>

            <input
              type="text"
              maxLength="6"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(
                  e.target.value.replace(/\D/g, "")
                )
              }
              style={{
                ...inputStyle,
                textAlign: "center",
                fontSize: "22px",
                letterSpacing: "6px",
              }}
            />

            <button
              type="submit"
              style={{
                ...primaryButton,
                background:
                  "linear-gradient(90deg,#16a34a,#059669)",
              }}
            >
              ✅ Verify OTP & Register
            </button>

            <button
              type="button"
              onClick={() => {
                setOtpSent(false);
                setOtp("");
                setGeneratedOtp("");
              }}
              style={changeButton}
            >
              ← Change Details
            </button>

          </form>
        )}

        <p style={bottomText}>
          Already have an account?
        </p>

        <Link
          to="/login"
          style={linkStyle}
        >
          Login →
        </Link>

      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background:
    "linear-gradient(135deg,#111827,#1e1b4b)",
  fontFamily: "Arial, sans-serif",
  padding: "20px",
};

const boxStyle = {
  width: "380px",
  padding: "40px",
  background: "white",
  borderRadius: "18px",
  boxShadow:
    "0 20px 50px rgba(0,0,0,0.35)",
};

const logoStyle = {
  textAlign: "center",
  fontSize: "50px",
};

const titleStyle = {
  textAlign: "center",
  color: "#000",
  marginBottom: "5px",
};

const subtitleStyle = {
  textAlign: "center",
  color: "#6b7280",
  marginBottom: "25px",
};

const labelStyle = {
  display: "block",
  fontWeight: "bold",
  color: "#374151",
  marginBottom: "7px",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "13px",
  marginBottom: "18px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "15px",
};

const countryStyle = {
  padding: "13px 10px",
  background: "#f3f4f6",
  border: "1px solid #d1d5db",
  borderRight: "none",
  borderRadius: "8px 0 0 8px",
  fontWeight: "bold",
};

const captchaRow = {
  display: "flex",
  gap: "10px",
  marginBottom: "12px",
};

const captchaBox = {
  flex: 1,
  padding: "12px",
  background: "#e5e7eb",
  borderRadius: "8px",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "22px",
  letterSpacing: "5px",
};

const refreshButton = {
  padding: "10px 15px",
  border: "none",
  borderRadius: "8px",
  background: "#e5e7eb",
  cursor: "pointer",
  fontSize: "18px",
};

const primaryButton = {
  width: "100%",
  padding: "13px",
  background:
    "linear-gradient(90deg,#2563eb,#7c3aed)",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "17px",
  fontWeight: "bold",
  cursor: "pointer",
};

const changeButton = {
  width: "100%",
  marginTop: "12px",
  padding: "10px",
  background: "transparent",
  border: "none",
  color: "#2563eb",
  cursor: "pointer",
};

const bottomText = {
  textAlign: "center",
  color: "#6b7280",
  marginTop: "25px",
};

const linkStyle = {
  display: "block",
  textAlign: "center",
  color: "#2563eb",
  fontWeight: "bold",
  textDecoration: "none",
};

export default Register;