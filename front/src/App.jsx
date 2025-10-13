// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import OurHeroes from "./pages/OurHeroes";
import Story from "./pages/Story";
import TigrayHistory from "./pages/TigrayHistory";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import VirtualMuseum from "./pages/VirtualMuseum";
import MemorialForm from "./pages/MemorialForm";
import ListPage from "./pages/ListPage";
import ArticlePage from "./pages/ArticlePage";
import ArchivePage from "./pages/ArchivePage";
import BookForm from "./pages/BookForm";
import BookList from "./pages/BookList";
import ArticleForm from "./pages/ArticleForm";
import MemorialDetail from "./pages/MemorialDetails";
import ArticleDetail from "./pages/ArticleDetail";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./layouts/ProtectedRoutes";
import RoleProtectedRoute from "./layouts/RoleProtectedRoute";

// Admin pages
import AdminDashboard from "./pages/admin/adminDashboard";
import AdminUsersPage from "./pages/admin/Users";
import AdminHeroesPage from "./pages/admin/AdminHeroes";
import AdminArticlesPage from "./pages/admin/AdminArticles";
import AdminBooksPage from "./pages/admin/AdminBooks";
import AdminRegisterUser from "./pages/admin/AdminRegisterUses";
import AdminContactMessages from "./pages/admin/adminContactusMessages";
import AdminLayout from "./layouts/AdminLayout";
import SearchResultsPage from "./pages/SearchResultsPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-memorial-dark text-white">
          {/* PUBLIC LAYOUT */}
          <Routes>
            <Route
              path="/*"
              element={
                <>
                  <Header />
                  <Navigation />
                  <main className="container mx-auto px-4 py-8">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/our-heroes" element={<OurHeroes />} />
                      <Route path="/search" element={<SearchResultsPage />} />
                      <Route
                        path="/memorial/:id"
                        element={<MemorialDetail />}
                      />
                      <Route
                        path="/virtual-museum"
                        element={<VirtualMuseum />}
                      />
                      <Route path="/story" element={<Story />} />
                      <Route
                        path="/tigray-history"
                        element={<TigrayHistory />}
                      />
                      <Route path="/about-us" element={<AboutUs />} />
                      <Route path="/contact-us" element={<ContactUs />} />
                      <Route path="/article" element={<ArticlePage />} />
                      <Route
                        path="/articles/:slug"
                        element={<ArticleDetail />}
                      />
                      <Route path="/archive" element={<ArchivePage />} />
                      <Route path="/article-form" element={<ArticleForm />} />
                      <Route path="/books" element={<BookList />} />
                      <Route
                        path="/book-form"
                        element={
                          <RoleProtectedRoute
                            allowedRoles={["admin", "creator"]}
                          >
                            <BookForm />
                          </RoleProtectedRoute>
                        }
                      />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                      />
                      <Route
                        path="/reset-password/:token"
                        element={<ResetPassword />}
                      />
                      <Route
                        path="/profile"
                        element={
                          <ProtectedRoute>
                            <Profile />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/form"
                        element={
                          <RoleProtectedRoute
                            allowedRoles={["admin", "creator"]}
                          >
                            <MemorialForm />
                          </RoleProtectedRoute>
                        }
                      />
                      <Route
                        path="/list"
                        element={
                          <RoleProtectedRoute
                            allowedRoles={["admin", "editor"]}
                          >
                            <ListPage />
                          </RoleProtectedRoute>
                        }
                      />
                      <Route path="/unauthorized" element={<Unauthorized />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </>
              }
            />

            {/* ADMIN LAYOUT */}
            <Route
              path="/admin/*"
              element={
                <AdminLayout>
                  <Routes>
                    <Route
                      path=""
                      element={
                        <RoleProtectedRoute allowedRoles={["admin", "creator", "editor"]}>
                          <AdminDashboard />
                        </RoleProtectedRoute>
                      }
                    />
                    <Route
                      path="users"
                      element={
                        <RoleProtectedRoute allowedRoles={["admin", "creator"]}>
                          <AdminUsersPage />
                        </RoleProtectedRoute>
                      }
                    />
                    <Route
                      path="heroes"
                      element={
                        <RoleProtectedRoute allowedRoles={["admin", "creator", "editor"]}>
                          <AdminHeroesPage />
                        </RoleProtectedRoute>
                      }
                    />
                    <Route
                      path="articles"
                      element={
                        <RoleProtectedRoute allowedRoles={["admin", "creator", "editor"]}>
                          <AdminArticlesPage />
                        </RoleProtectedRoute>
                      }
                    />
                    <Route
                      path="books"
                      element={
                        <RoleProtectedRoute allowedRoles={["admin", "creator", "editor"]}>
                          <AdminBooksPage />
                        </RoleProtectedRoute>
                      }
                    />
                    <Route
                      path="register"
                      element={
                        <RoleProtectedRoute allowedRoles={["admin", "creator"]}>
                          <AdminRegisterUser />
                        </RoleProtectedRoute>
                      }
                    />
                    <Route
                      path="contact-us"
                      element={
                        <RoleProtectedRoute allowedRoles={["admin", "creator"]}>
                          <AdminContactMessages />
                        </RoleProtectedRoute>
                      }
                    />
                  </Routes>
                </AdminLayout>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
