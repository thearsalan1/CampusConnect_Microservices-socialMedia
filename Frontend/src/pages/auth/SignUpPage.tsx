import React, { useState } from "react";
import { useSignUp } from "../../features/auth/hooks/useSignUp";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [password, setPassword] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [name, setName] = useState("");
  const { mutate: signUp, isPending } = useSignUp();
  const navigate = useNavigate();

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    signUp(
      { name, collegeId, password },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          navigate("/verify-otp", {
            state: { collegeId, maskedEmail: data.maskedEmail },
          });
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || "Signup failed.");
        },
      },
    );
  };
  return (
    <div className="w-full min-h-screen flex">
      {/* Left banner */}
      {/* Left banner */}
<section className="w-1/2 min-h-full p-10 flex flex-col items-center justify-center bg-card border border-r-accent relative overflow-hidden">
  {/* background glow blobs */}
  <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/25 blur-3xl rounded-full" />
  <div className="absolute -bottom-20 -right-10 w-72 h-72 bg-accent/20 blur-3xl rounded-full" />

  <div className="relative z-10 w-full max-w-sm flex flex-col gap-8">
    {/* badge */}
    <span className="self-start text-xs tracking-widest text-accent-hover border border-accent rounded-full px-3 py-1">
      🎓 VERIFIED STUDENTS ONLY
    </span>

    {/* headline */}
    <h2 className="text-heading text-4xl text-primary leading-tight">
      Your campus.
      <br />
      Verified. Connected.
    </h2>

    <p className="text-body text-text-secondary text-sm">
      A private network for your college — every profile checked against
      official records.
    </p>

    {/* feature list */}
    <div className="flex flex-col gap-4">
      {[
        { icon: "✅", title: "Verified Identity", desc: "Matched against your college's official roster." },
        { icon: "🛒", title: "Campus Marketplace", desc: "Buy and sell with your college mates only." },
        { icon: "💬", title: "Real-time Chat", desc: "Message classmates and seniors instantly." },
        { icon: "📢", title: "Announcements & Feed", desc: "Stay on top of college updates." },
      ].map((f) => (
        <div
          key={f.title}
          className="flex items-start gap-3 bg-card-hover border border-border hover:border-border-hover rounded-xl p-3 transition-colors"
        >
          <span className="text-xl">{f.icon}</span>
          <div>
            <p className="text-heading text-text-primary text-sm">{f.title}</p>
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
      <section className="w-1/2 min-h-full  p-5 flex flex-col items-center justify-center">
        <div className="w-[70%] flex flex-col items-center justify-evenly bg-card-hover border border-accent rounded-2xl p-4">
          <h1 className="text-primary text-4xl text-logo text-center">
            Register
          </h1>
          <p className="text-center text-text-muted text-heading text-xs">
            Register with campus connect and start your journey.
          </p>
          <form className="p-3" onSubmit={handleOnSubmit}>
            <label className="text-heading text-text-secondary text-xs">
              Name
            </label>
            <input
              type="text"
              className="w-full rounded-2xl outline-none border border-transparent 
             bg-card placeholder:text-text-muted 
             focus:border-accent-hover px-3 py-2 text-primary transition-colors text-sm mb-2 mt-1"
              placeholder="Enter your Name"
              onChange={(e) => setName(e.target.value)}
            />
            <label className="text-heading text-text-secondary text-xs mb-2">
              College Id
            </label>
            <input
              type="text"
              className="w-full rounded-2xl outline-none border border-transparent 
             bg-card placeholder:text-text-muted 
             focus:border-accent-hover px-3 py-2 text-primary transition-colors text-sm mb-2  mt-1"
              placeholder="Enter your CollegeId"
              onChange={(e) => setCollegeId(e.target.value)}
            />
            <label className="text-heading text-text-secondary text-xs mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-2xl outline-none border border-transparent 
             bg-card placeholder:text-text-muted 
             focus:border-accent-hover px-3 py-2 text-primary transition-colors text-sm mb-2  mt-1"
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="w-[98%] flex items-center justify-between mt-2 ml-4 ">
              <span className="text-xs text-text-muted">
                Forgot your password?{" "}
                <Link
                  className="text-primary hover:cursor-pointer"
                  to={"/forgot-password"}
                >
                  Forgot Pass
                </Link>
              </span>
              <span className="text-xs text-text-muted">
                Already have an account?{" "}
                <Link
                  className="text-primary hover:cursor-pointer"
                  to={"/login"}
                >
                  Login
                </Link>
              </span>
            </div>
            <button className="w-[98%] bg-primary py-2 rounded-4xl border border-accent-hover ml-4 mr-4 mt-3 hover:bg-primary-hover text-xl font-body font-semibold text-text-primary hover:cursor-pointer">
              {isPending ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SignUpPage;
