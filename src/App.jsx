// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Resources from "./Components/Resources";
import Sem from "./Components/Sem";
import Result from "./Components/Result.jsx";

function App() {
  return (
    <Router>
      <Navbar />

      {/* All Route elements must be inside Routes */}
      <Routes>
        <Route path="/" element={<Resources />} />
        <Route path="/sem/:branch" element={<Sem />} />
        <Route path="/results" element={<Result />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
