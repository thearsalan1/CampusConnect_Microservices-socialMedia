import React, { useState, useRef } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useVerifyOtp } from "../../features/auth/useVerifyOtp";
import { useResendOtp } from "../../features/auth/useResendOtp";

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const { mutate: verifyOtp, isPending } = useVerifyOtp();
  const location = useLocation();
  const { collegeId, maskedEmail } = (location.state || {}) as {
    collegeId?: string;
    maskedEmail?: string;
  };
  const { mutate: resendOtp } = useResendOtp();

  if (!collegeId) {
    return <Navigate to="/sign-up" replace />;
  }

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return; // only digits
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyOtp({ collegeId, otp: otp.join("") });
  };

  const handleResend = (e: React.FormEvent) => {
    e.preventDefault();
    resendOtp({ collegeId });
  };

  return (
    <div className="w-full min-h-screen flex">
      {/* Left banner */}
      <section className="w-1/2 min-h-full p-10 flex flex-col items-center justify-center bg-card border border-r-accent relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/25 blur-3xl rounded-full" />
        <div className="absolute -bottom-20 -right-10 w-72 h-72 bg-accent/20 blur-3xl rounded-full" />

        <div className="relative z-10 w-full max-w-sm flex flex-col gap-8">
          <span className="self-start text-xs tracking-widest text-accent-hover border border-accent rounded-full px-3 py-1">
            🔐 ONE STEP AWAY
          </span>

          <h2 className="text-heading text-4xl text-primary leading-tight">
            Verify it's you.
          </h2>

          <p className="text-body text-text-secondary text-sm">
            We sent a 6-digit code to your college email to confirm it's really
            you.
            <span className="text-text-primary">
              {maskedEmail || "your email"}
            </span>
          </p>

          <div className="flex flex-col gap-4">
            {[
              {
                icon: "📧",
                title: "Check Your Inbox",
                desc: "The code expires in a few minutes.",
              },
              {
                icon: "🔁",
                title: "Didn't get it?",
                desc: "You can request a new code below.",
              },
              {
                icon: "🛡️",
                title: "One-time use",
                desc: "Each code works only once, for your safety.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="flex items-start gap-3 bg-card-hover border border-border hover:border-border-hover rounded-xl p-3 transition-colors"
              >
                <span className="text-xl">{f.icon}</span>
                <div>
                  <p className="text-heading text-text-primary text-sm">
                    {f.title}
                  </p>
                  <p className="text-body text-text-muted text-xs">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-text-muted">
            Your college. Your community. No outsiders.
          </p>
        </div>
      </section>

      {/* Right form */}
      <section className="w-1/2 min-h-full p-5 flex flex-col items-center justify-center">
        <div className="w-[70%] flex flex-col items-center justify-evenly bg-card-hover border border-accent rounded-2xl p-4">
          <h1 className="text-primary text-4xl text-logo text-center">
            Verify OTP
          </h1>
          <p className="text-center text-text-muted text-heading text-xs mt-2">
            Enter the 6-digit code sent to{" "}
            <span className="text-text-primary">your email</span>
          </p>

          <form className="p-3 w-full" onSubmit={handleSubmit}>
            <div className="flex items-center justify-center gap-2 mb-4 mt-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputsRef.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-10 h-12 text-center text-lg rounded-xl outline-none border border-transparent bg-card placeholder:text-text-muted focus:border-accent-hover text-primary transition-colors"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-[98%] bg-primary py-2 rounded-4xl border border-accent-hover ml-1 mr-1 mt-3 hover:bg-primary-hover text-xl font-body font-semibold text-text-primary hover:cursor-pointer"
            >
              {isPending ? "Verifying..." : "Verify & Continue"}
            </button>
          </form>

          <div className="w-[98%] flex items-center justify-between mt-2 ml-1">
            <span className="text-xs text-text-muted">
              Didn't get it?{" "}
              <button
                onClick={handleResend}
                className="text-primary hover:cursor-pointer"
                type="button"
              >
                Resend code
              </button>
            </span>
            <span className="text-xs text-text-muted">
              <Link
                className="text-primary hover:cursor-pointer"
                to={"/sign-up"}
              >
                Back to Register
              </Link>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VerifyOtpPage;
