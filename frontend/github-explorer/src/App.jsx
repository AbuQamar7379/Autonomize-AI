import "./App.css";
import LandingPage from "./components/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RepoDetailsPage from "./components/RepoDetailsPage";
import FollowersList from "./components/FollowersList";

export const config = {
  endpoint: "https://api.github.com/users/",
};

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/:username/repo/:repoName"
            element={<RepoDetailsPage />}
          />
          <Route path="/:username/followers" element={<FollowersList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;