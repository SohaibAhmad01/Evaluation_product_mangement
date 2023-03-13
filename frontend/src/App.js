import Footer from "./components/Footer";
import Headers from "./components/Headers";
import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import DefaultScreen from "./components/DefaultScreen";
import { Container } from "react-bootstrap";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div>
      <Headers />
      <Routes>
        <Route exact path="/" element={<DefaultScreen />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
