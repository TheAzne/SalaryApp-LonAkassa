import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header"
import Taxes from "./components/Taxes";
import Akassa from "./components/Akassa";
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/taxes" element={<Taxes />} />
        <Route path="/Akassa" element={<Akassa />} />
      </Routes>
    </Router>
  )
}

export default App;
