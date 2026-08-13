import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PredictPage from "./pages/PredictPage";
import ParticipantsPage from "./pages/ParticipantsPage";
import { PredictionProvider } from "./state/PredictionContext";
import { AuthProvider } from "./state/AuthContext";

export default function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}
