import { Routes, Route, Navigate } from "react-router-dom";

import Invitation from "./pages/Invitation";
import Home from "./pages/Home";
import CoworkingSpace from "./pages/CoworkingSpace";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/invitation/:invitationId" element={<Invitation />} />
      <Route
        path="/coworking-space/:coworkingspaceId"
        element={<CoworkingSpace />}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
