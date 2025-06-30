// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Header from './components/Header'; // Add this import
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
import ProtectedRoute from './layouts/ProtectedRoutes';
import RoleProtectedRoute from './layouts/RoleProtectedRoute';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile'
import ArticlePage from './pages/ArticlePage';
import ArticleForm from './pages/ArticleForm';
import ArchivePage from './pages/ArchivePage';
import BookForm from './pages/BookForm';
import BookList from './pages/BookList';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-memorial-dark text-white">
          <Header /> 
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Home />} />
              <Route path="/our-heroes" element={<OurHeroes />} />
              <Route path="/virtual-museum" element={<VirtualMuseum />} />
              <Route path="/story" element={<Story />} />
              <Route path="/article" element={<ArticlePage />} />
              <Route path="/archive" element={<ArchivePage />} />
              <Route path="/article-form" element={<ArticleForm />} />
              <Route path="/books" element={<BookList />} />
              <Route
                path="/book-form"
                element={
                  <RoleProtectedRoute allowedRoles={['admin', 'creator']}>
                    <BookForm />
                  </RoleProtectedRoute>
                }
              />
              <Route path="/tigray-history" element={<TigrayHistory />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route
                path="/list"
                element={
                  <RoleProtectedRoute allowedRoles={['admin', 'editor']}>
                    <ListPage />
                  </RoleProtectedRoute>
                }
              />
              <Route
                path="/form"
                element={
                  <RoleProtectedRoute allowedRoles={['admin', 'creator']}>
                    <MemorialForm />
                  </RoleProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;