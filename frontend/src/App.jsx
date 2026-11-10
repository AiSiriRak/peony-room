import { Routes, Route, Navigate } from "react-router-dom";

import Invitation from "./pages/Invitation";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/invitation/:invitationId" element={<Invitation />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
