import {  Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import LandingPage from "./pages/LandingPage";
import SpotLight from "./utils/SpotLight";

const App = () => {
  return (
      <div className="bg-background w-screen">
        <SpotLight>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </SpotLight>
      </div>
  );
};

export default App;
