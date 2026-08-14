import logo from "../assets/campus_connect_logo.svg";
import HeroSection from "../components/LandingPage/HeroSection";
import logoOnly from "../assets/logo_only.png"
import Navbar from "../components/LandingPage/Navbar";

const LandingPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col">
      <img src={logo} alt="Campus Connect Logo" className="w-40 top-6 opacity-40  left-10 absolute" />
      <img src={logoOnly} className="fixed right-15 bottom-10 opacity-30 h-10 w-10" />
      <Navbar></Navbar>
      <HeroSection />
    </div>
  );
};

export default LandingPage;
