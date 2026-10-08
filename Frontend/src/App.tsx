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
import MarketPlace from "./pages/marketPlace/MarketPlace";
import SocialPage from "./pages/social/SocialPage";
import DashboardLayout from "./pages/DashboardPage";
import ItemDetails from "./pages/marketPlace/ItemDetails";
import MyItems from "./pages/marketPlace/MyItems";
import AddItem from "./pages/marketPlace/AddItem";
import EditItem from "./pages/marketPlace/UpdateItems";

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
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<SocialPage />} />
              <Route path="/social" element={<SocialPage />} />
              <Route path="/market-place" element={<MarketPlace />} />
              <Route path="/market-place/:itemId" element={<ItemDetails />} />
              <Route path="/market-place/my-items" element={<MyItems />} />
              <Route path="/market-place/add" element={<AddItem />} />
              <Route path="/market-place/edit-item/:itemId" element={<EditItem />} />
            </Route>
          </Route>
        </Routes>
      </SpotLight>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;
