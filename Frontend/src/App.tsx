import LandingPage from "./pages/LandingPage";
import SpotLight from "./utils/SpotLight";

const App = () => {
  return (
    <div className="bg-background w-screen">
      <SpotLight>
        <LandingPage></LandingPage>
      </SpotLight>
    </div>
  );
};

export default App;
