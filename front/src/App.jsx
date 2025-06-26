import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import OurHeroes from './pages/OurHeroes';
import Story from './pages/Story';
import TigrayHistory from './pages/TigrayHistory';
import AboutUs from './pages/AboutUs';
import Footer from './components/Footer';
import ContactUs from './pages/ContactUs';
import MemorialForm from './pages/MemorialForm';
import ListPage from './pages/ListPage';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VirtualMuseum from './pages/VirtualMuseum';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-memorial-dark text-white">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/" element={<Home />} />
            <Route path="/our-heroes" element={<OurHeroes />} />
            <Route path="/virtual-museum" element={<VirtualMuseum />} />
            <Route path="/story" element={<Story />} />
            <Route path="/tigray-history" element={<TigrayHistory />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/list" element={<AuthProvider><ListPage /></AuthProvider>} />
            <Route path="/form" element={<MemorialForm />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;