import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import LandingPage from "./pages/LandingPage";
import SpotLight from "./utils/SpotLight";
import SignUpPage from "./pages/auth/SignUpPage";
import VerifyOtp from "./pages/auth/VerifyOtp";

// 👇 Toast import
import { Toaster } from "react-hot-toast";
import ForgotPasswordPage from "./pages/auth/Forgot-password";

const App = () => {
  return (
    <div className="bg-background w-screen">
      <SpotLight>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Routes>
      </SpotLight>

      {/* 👇 Toast renderer */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;
