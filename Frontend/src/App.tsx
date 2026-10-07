import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import LandingPage from "./pages/LandingPage";
import SpotLight from "./utils/SpotLight";
import SignUpPage from "./pages/auth/SignUpPage";
import VerifyOtp from "./pages/auth/VerifyOtp";
import { Toaster } from "react-hot-toast";
import ForgotPasswordPage from "./pages/auth/Forgot-password";
import { useAuthStore } from "./features/auth/store/authStore";
import { useAuthInit } from "./features/auth/hooks/useInitialized";
import PublicOnlyRoutes from "./components/auth/PublicOnlyRoutes";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import DashboardPage from "./pages/DashboardPage";

const App = () => {
  useAuthInit();
  const isInitializing = useAuthStore((state) => state.isInitializing);

  if (isInitializing) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-background w-screen min-h-0">
      <SpotLight>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route element={<PublicOnlyRoutes />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
      </SpotLight>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;
