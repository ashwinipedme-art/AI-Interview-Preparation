
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showOtp, setShowOtp] = useState(true);
  const [message, setMessage] = useState("");
  const [seconds, setSeconds] = useState(30);

  function generateCaptcha() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";

    for (let i = 0; i < 5; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }

    setCaptcha(code);
    setCaptchaAnswer("");
  }

  React.useEffect(() => {
    generateCaptcha();
  }, []);

  React.useEffect(() => {
    if (!otpSent || seconds <= 0) return;

    const timer = setTimeout(() => {
      setSeconds((previous) => previous - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [otpSent, seconds]);

  function sendOTP(event) {
    event.preventDefault();
    setMessage("");

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(mobile.trim())) {
      setMessage("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (captchaAnswer.trim().toUpperCase() !== captcha) {
      setMessage("Incorrect CAPTCHA. Please try again.");
      generateCaptcha();
      return;
    }

    const newOtp = String(
      Math.floor(100000 + Math.random() * 900000)
    );

    setGeneratedOtp(newOtp);
    setOtp("");
    setOtpSent(true);
    setShowOtp(true);
    setSeconds(30);
    setMessage("Demo OTP generated successfully.");
  }

  function verifyOTP(event) {
    event.preventDefault();
    setMessage("");

    if (otp.trim() !== generatedOtp) {
      setMessage("Incorrect OTP. Please enter the OTP shown below.");
      return;
    }

    localStorage.setItem("token", "loggedin");
    localStorage.setItem("userEmail", email.trim());
    localStorage.setItem("userMobile", mobile.trim());
    localStorage.setItem(
      "userName",
      email.split("@")[0] || "Student"
    );

    navigate("/dashboard");
  }

  function resendOTP() {
    const newOtp = String(
      Math.floor(100000 + Math.random() * 900000)
    );

    setGeneratedOtp(newOtp);
    setOtp("");
    setSeconds(30);
    setShowOtp(true);
    setMessage("New demo OTP generated.");
  }

  const styles = {
    page: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      background: "linear-gradient(135deg, #e0e7ff, #f5e8ff)",
      fontFamily: "Arial, sans-serif",
    },
    card: {
      width: "100%",
      maxWidth: "420px",
      background: "#ffffff",
      padding: "32px",
      borderRadius: "20px",
      boxShadow: "0 12px 40px rgba(50, 40, 100, 0.15)",
      boxSizing: "border-box",
    },
    heading: {
      textAlign: "center",
      color: "#35216b",
      marginBottom: "8px",
    },
    subtitle: {
      textAlign: "center",
      color: "#666",
      marginBottom: "24px",
      lineHeight: 1.5,
    },
    label: {
      display: "block",
      fontWeight: "bold",
      marginBottom: "7px",
      color: "#333",
    },
    input: {
      width: "100%",
      boxSizing: "border-box",
      padding: "12px",
      border: "1px solid #d5d5e0",
      borderRadius: "9px",
      marginBottom: "17px",
      fontSize: "15px",
      outlineColor: "#6550c8",
    },
    button: {
      width: "100%",
      padding: "13px",
      border: "none",
      borderRadius: "9px",
      background: "#6550c8",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "5px",
    },
    secondary: {
      width: "100%",
      padding: "11px",
      border: "1px solid #6550c8",
      borderRadius: "9px",
      background: "#fff",
      color: "#6550c8",
      fontSize: "14px",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "10px",
    },
    message: {
      padding: "11px",
      margin: "15px 0",
      borderRadius: "8px",
      background: "#f0edff",
      color: "#35216b",
      textAlign: "center",
      overflowWrap: "anywhere",
      fontSize: "14px",
    },
    captcha: {
      padding: "13px",
      textAlign: "center",
      background: "#eeeaff",
      border: "1px dashed #6550c8",
      borderRadius: "9px",
      letterSpacing: "5px",
      fontWeight: "bold",
      fontSize: "21px",
      marginBottom: "12px",
      color: "#35216b",
    },
    footer: {
      textAlign: "center",
      marginTop: "20px",
      color: "#555",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>AI Interview Preparation</h2>

        {!otpSent ? (
          <>
            <p style={styles.subtitle}>
              Login to continue your interview preparation.
            </p>

            <form onSubmit={sendOTP}>
              <label style={styles.label}>Email Address</label>
              <input
                style={styles.input}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label style={styles.label}>Mobile Number</label>
              <input
                style={styles.input}
                type="tel"
                placeholder="10-digit mobile number"
                value={mobile}
                onChange={(e) =>
                  setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                maxLength={10}
                required
              />

              <label style={styles.label}>CAPTCHA Verification</label>
              <div style={styles.captcha}>{captcha}</div>

              <button
                type="button"
                onClick={generateCaptcha}
                style={{
                  ...styles.secondary,
                  marginTop: 0,
                  marginBottom: "15px",
                }}
              >
                Refresh CAPTCHA
              </button>

              <input
                style={styles.input}
                type="text"
                placeholder="Enter CAPTCHA above"
                value={captchaAnswer}
                onChange={(e) => setCaptchaAnswer(e.target.value)}
                required
              />

              {message && <div style={styles.message}>{message}</div>}

              <button type="submit" style={styles.button}>
                Send OTP
              </button>
            </form>
          </>
        ) : (
          <>
            <p style={styles.subtitle}>
              Verify your login using the demo OTP.
            </p>

            <div style={styles.message}>
              <strong>Your Demo OTP: {generatedOtp}</strong>
              <br />
              <span>Use this OTP to log in.</span>
            </div>

            <form onSubmit={verifyOTP}>
              <label style={styles.label}>Enter OTP</label>

              <input
                style={styles.input}
                type={showOtp ? "text" : "password"}
                inputMode="numeric"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                maxLength={6}
                required
              />

              <label
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  marginBottom: "15px",
                  fontSize: "14px",
                }}
              >
                <input
                  type="checkbox"
                  checked={showOtp}
                  onChange={(e) => setShowOtp(e.target.checked)}
                />
                Show OTP I entered
              </label>

              {message && <div style={styles.message}>{message}</div>}

              <button type="submit" style={styles.button}>
                Verify OTP & Login
              </button>
            </form>

            <button
              type="button"
              style={styles.secondary}
              onClick={resendOTP}
              disabled={seconds > 0}
            >
              {seconds > 0
                ? `Resend OTP in ${seconds}s`
                : "Resend OTP"}
            </button>

            <button
              type="button"
              style={styles.secondary}
              onClick={() => {
                setOtpSent(false);
                setOtp("");
                setMessage("");
                generateCaptcha();
              }}
            >
              Change Email / Mobile
            </button>
          </>
        )}

        <div style={styles.footer}>
          New user? <Link to="/register">Create an account</Link>
        </div>
      </div>
    </div>
  );
}
