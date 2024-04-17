import "./App.css";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <div>
      <h1
        className="text-center pb-3 mb-0 pt-3"
        style={{ backgroundColor: "beige" }}
      >
        Autonomize AI - GitHub Explorer
      </h1>
      <hr className="mt-0" />
      <div>
        <LandingPage />
      </div>
    </div>
  );
}

export default App;
