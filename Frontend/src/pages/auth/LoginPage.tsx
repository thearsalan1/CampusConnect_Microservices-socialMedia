import { ShieldLock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../features/auth/hooks/useLogin";

const LoginPage = () => {
  const [collegeId, setCollegeId] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ collegeId, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="w-full  relative max-w-6xl bg-card border border-accent rounded-2xl shadow-2xl p-6 md:p-10 flex items-center justify-center">
        <div className="hidden md:block absolute my-auto -translate-x-1/2 h-[80%] w-px bg-accent"></div>
        <div className="w-1/2 p-3 relative flex justify-evenly flex-col">
          <ShieldLock size={300} className="absolute right-37  opacity-40" />
          <span className="relative z-10 text-5xl text-primary text-heading block mb-5">
            One Campus.
          </span>
          <span className="relative z-10 text-5xl text-primary text-heading ml-15">
            Every Connection.
          </span>
          <p className="relative z-10 font-body text-xl text-text-primary text-center mt-7 p-4">
            Where your college comes alive — buy, sell, post, chat, all
            verified, all yours.
          </p>
          <p className="relative z-10 text-5xl text-primary text-heading block mt-5">
            Campus Connect.....
          </p>
        </div>

        <div className="w-1/2 p-4 h-full">
          <div className="min-h-full p-3 ml-4 border border-accent bg-card-hover rounded-2xl flex flex-col items-center bg-center justify-evenly">
            <h1 className="text-4xl text-heading text-primary font-semibold">
              Login
            </h1>
            <p className="text-lg text-body text-text-muted">
              Welcome back champ...
            </p>
            <form className="w-full p-3">
              <label className="text-heading text-text-secondary text-xs mb-2">
                College Id
              </label>
              <input
                type="text"
                className="w-full rounded-2xl outline-none border border-transparent 
             bg-card placeholder:text-text-muted 
             focus:border-accent-hover px-3 py-2 text-primary transition-colors text-sm"
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
             focus:border-accent-hover px-3 py-2 text-primary transition-colors text-sm"
                placeholder="Enter your Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </form>
          </div>
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
              Not registered yet?{" "}
              <Link
                className="text-primary hover:cursor-pointer"
                to={"/sign-up"}
              >
                Register
              </Link>
            </span>
          </div>
          <button
            className="w-[98%] bg-primary py-2 rounded-4xl border border-accent-hover ml-4 mr-4 mt-3 hover:bg-primary-hover text-xl font-body font-semibold text-text-primary hover:cursor-pointer"
            type="submit"
            disabled={isPending}
            onClick={handleSubmit}
          >
            {isPending ? "Logging in..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
