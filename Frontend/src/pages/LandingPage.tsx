import logo from "../assets/campus_connect_logo.svg";
import HeroSection from "../components/LandingPage/HeroSection";
import logoOnly from "../assets/logo_only.png";
import Navbar from "../components/LandingPage/Navbar";
import Feature from "../components/LandingPage/Feature";
import HowItWorks from "../components/LandingPage/HowItWorks";
import About from "../components/LandingPage/About";
import FAQ from "../components/LandingPage/FAQ";
import GetStarted from "../components/LandingPage/GetStarted";
import Footer from "../components/LandingPage/Footer";

const LandingPage = () => {
  return (
    <div className="w-screen flex flex-col">
      <img
        src={logo}
        alt="Campus Connect Logo"
        className="w-40 top-6 opacity-40  left-10 absolute"
      />
      <img
        src={logoOnly}
        className="fixed right-15 bottom-10 opacity-30 h-10 w-10"
      />
      <Navbar></Navbar>
      <HeroSection />
      <Feature />
      <HowItWorks></HowItWorks>
      <About></About>
      <FAQ></FAQ>
      <GetStarted></GetStarted>
      <Footer></Footer>
    </div>
  );
};

export default LandingPage;
