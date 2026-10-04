import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useResendOtp } from "../../features/auth/hooks/useResendOtp";
import { useForgotPassword } from "../../features/auth/hooks/useForgotPass";
import { useResetPass } from "../../features/auth/hooks/useReset";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState<"request" | "reset">("request");
  const [collegeId, setCollegeId] = useState("");
  const [maskedEmail, setMaskedEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const { mutate: resendOtp } = useResendOtp();
  const { mutate: forgotPassword, isPending: isSendingCode } =
    useForgotPassword();
  const { mutate: resetPassword, isPending: isResetting } = useResetPass();

  const handleOtpChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
    if (value && index < 5) inputsRef.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    forgotPassword(
      { collegeId },
      {
        onSuccess: (data) => {
          setMaskedEmail(data.maskedEmail);
          setStep("reset");
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || "Something went wrong.");
        },
      },
    );
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    resetPassword({ collegeId, newPassword, otp: otp.join("") });
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
            🔑 ACCOUNT RECOVERY
          </span>

          <h2 className="text-heading text-4xl text-primary leading-tight">
            Forgot your
            <br />
            password?
          </h2>

          <p className="text-body text-text-secondary text-sm">
            No worries — we'll send a code to your college email to get you back
            in.
          </p>

          <div className="flex flex-col gap-4">
            {[
              {
                icon: "🆔",
                title: "Enter your College ID",
                desc: "We'll locate your account.",
              },
              {
                icon: "📧",
                title: "Check your inbox",
                desc: "A 6-digit code lands in your college email.",
              },
              {
                icon: "🔒",
                title: "Set a new password",
                desc: "Minimum 8 characters, and you're back in.",
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
            {step === "request" ? "Reset Password" : "Set New Password"}
          </h1>
          <p className="text-center text-text-muted text-heading text-xs mt-2">
            {step === "request"
              ? "Enter your College ID to receive a reset code."
              : `Code sent to ${maskedEmail || "your email"}`}
          </p>

          {step === "request" ? (
            <form className="p-3 w-full" onSubmit={handleRequestSubmit}>
              <label className="text-heading text-text-secondary text-xs">
                College Id
              </label>
              <input
                type="text"
                value={collegeId}
                onChange={(e) => setCollegeId(e.target.value)}
                className="w-full rounded-2xl outline-none border border-transparent bg-card placeholder:text-text-muted focus:border-accent-hover px-3 py-2 text-primary transition-colors text-sm mb-2 mt-1"
                placeholder="Enter your CollegeId"
              />
              <button
                type="submit"
                disabled={isSendingCode}
                className="w-[98%] bg-primary py-2 rounded-4xl border border-accent-hover ml-1 mr-1 mt-3 hover:bg-primary-hover text-xl font-body font-semibold text-text-primary hover:cursor-pointer disabled:opacity-50"
              >
                {isSendingCode ? "Sending..." : "Send Reset Code"}
              </button>
            </form>
          ) : (
            <form className="p-3 w-full" onSubmit={handleResetSubmit}>
              <div className="flex items-center justify-center gap-2 mb-3 mt-2">
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
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    className="w-10 h-12 text-center text-lg rounded-xl outline-none border border-transparent bg-card placeholder:text-text-muted focus:border-accent-hover text-primary transition-colors"
                  />
                ))}
              </div>

              <label className="text-heading text-text-secondary text-xs">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-2xl outline-none border border-transparent bg-card placeholder:text-text-muted focus:border-accent-hover px-3 py-2 text-primary transition-colors text-sm mb-2 mt-1"
                placeholder="Enter new password"
              />

              <label className="text-heading text-text-secondary text-xs">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-2xl outline-none border border-transparent bg-card placeholder:text-text-muted focus:border-accent-hover px-3 py-2 text-primary transition-colors text-sm mb-2 mt-1"
                placeholder="Re-enter new password"
              />

              <button
                type="submit"
                disabled={isResetting}
                className="w-[98%] bg-primary py-2 rounded-4xl border border-accent-hover ml-1 mr-1 mt-3 hover:bg-primary-hover text-xl font-body font-semibold text-text-primary hover:cursor-pointer disabled:opacity-50"
              >
                {isResetting ? "Updating..." : "Reset Password"}
              </button>

              <div className="w-full flex justify-center mt-2">
                <span className="text-xs text-text-muted">
                  Didn't get it?{" "}
                  <button
                    onClick={handleResend}
                    type="button"
                    className="text-primary hover:cursor-pointer"
                  >
                    Resend code
                  </button>
                </span>
              </div>
            </form>
          )}

          <div className="w-[98%] flex items-center justify-center mt-2">
            <span className="text-xs text-text-muted">
              Remembered it?{" "}
              <Link className="text-primary hover:cursor-pointer" to={"/login"}>
                Back to Login
              </Link>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPasswordPage;
