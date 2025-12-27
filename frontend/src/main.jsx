import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import Register from './pages/Register';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Watchlist from './pages/Watchlist';
import Profile from './pages/Profile';
import MovieDetailPage from './pages/MovieDetailPage';
import AdminDashboard from './pages/AdminDashboard';
import SharedWatchlistsPage from './pages/SharedWatchlistsPage';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route element={<PrivateRoute />}>
              <Route index element={<HomePage />} />
              <Route path="watchlist" element={<Watchlist />} />
              <Route path="shared-watchlists" element={<SharedWatchlistsPage />} />
              <Route path="profile" element={<Profile />} />
              <Route path="movie/:id" element={<MovieDetailPage />} />
            </Route>
            <Route path="admin" element={<AdminRoute />}>
              <Route index element={<AdminDashboard />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
