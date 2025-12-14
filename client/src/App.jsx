import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import VenuesPage from './pages/VenuesPage';
import ShopsPage from './pages/ShopsPage';
import BlogsPage from './pages/BlogsPage';
import CreateBlogPage from './pages/CreateBlogPage';
import CommunitiesPage from './pages/CommunitiesPage';
import CreateCommunityPage from './pages/CreateCommunityPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import VerificationPage from './pages/VerificationPage';
import VerifyResetPage from './pages/VerifyResetPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import CreateEventPage from './pages/CreateEventPage';
import AdminDashboard from './pages/AdminDashboard';
import OrganizerDashboard from './pages/OrganizerDashboard';
import BookEventPage from './pages/BookEventPage';
import PaymentPage from './pages/PaymentPage';
import MyTicketsPage from './pages/MyTicketsPage';
import ProfilePage from './pages/ProfilePage';

// Layout component for pages with Navbar and Footer
const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

// Layout for auth pages (no navbar/footer)
const AuthLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    {children}
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        <Routes>
          {/* Auth Routes - No Navbar/Footer */}
          <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
          <Route path="/signup" element={<AuthLayout><SignupPage /></AuthLayout>} />
          <Route path="/forgot-password" element={<AuthLayout><ForgotPasswordPage /></AuthLayout>} />
          <Route path="/verify" element={<AuthLayout><VerificationPage /></AuthLayout>} />
          <Route path="/verify-reset" element={<AuthLayout><VerifyResetPage /></AuthLayout>} />
          <Route path="/reset-password" element={<AuthLayout><ResetPasswordPage /></AuthLayout>} />

          {/* Public Routes - With Navbar/Footer */}
          <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
          <Route path="/events" element={<MainLayout><HomePage /></MainLayout>} />
          <Route path="/shops" element={<MainLayout><ShopsPage /></MainLayout>} />
          <Route path="/venues" element={<MainLayout><VenuesPage /></MainLayout>} />
          <Route path="/communities" element={<MainLayout><CommunitiesPage /></MainLayout>} />
          <Route path="/blogs" element={<MainLayout><BlogsPage /></MainLayout>} />

          {/* Protected Routes - With Navbar/Footer */}
          <Route path="/create-blog" element={<ProtectedRoute><MainLayout><CreateBlogPage /></MainLayout></ProtectedRoute>} />
          <Route path="/create-community" element={<ProtectedRoute><MainLayout><CreateCommunityPage /></MainLayout></ProtectedRoute>} />
          <Route path="/event/:id" element={<ProtectedRoute><MainLayout><BookEventPage /></MainLayout></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><MainLayout><PaymentPage /></MainLayout></ProtectedRoute>} />
          <Route path="/tickets" element={<ProtectedRoute><MainLayout><MyTicketsPage /></MainLayout></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><MainLayout><ProfilePage /></MainLayout></ProtectedRoute>} />

          <Route path="/admin-dashboard" element={
            <ProtectedRoute>
              <MainLayout><AdminDashboard /></MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/organizer-dashboard" element={
            <ProtectedRoute>
              <MainLayout><OrganizerDashboard /></MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/create-event" element={
            <ProtectedRoute>
              <MainLayout><CreateEventPage /></MainLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider >
  );
}

export default App;
