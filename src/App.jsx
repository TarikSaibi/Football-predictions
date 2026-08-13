import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PredictPage from "./pages/PredictPage";
import ParticipantsPage from "./pages/ParticipantsPage";
import { PredictionProvider } from "./state/PredictionContext";

export default function App() {
  return (
    <PredictionProvider>
      <div className="app-shell">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<PredictPage />} />
            <Route path="/participants" element={<ParticipantsPage />} />
          </Routes>
        </main>
      </div>
    </PredictionProvider>
  );
}
