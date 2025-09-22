import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Layout from './components/Layout';
import Home from './components/pages/Home';
import Network from './components/pages/Network';
import Opportunities from './components/pages/Opportunities';
import Donations from './components/pages/Donations';
import Messages from './components/pages/Messages';
import Events from './components/pages/Events';
import Profile from './components/pages/Profile';
import Calendar from './components/pages/Calendar';

export type UserType = 'alumni' | 'student' | 'faculty' | 'college';

export interface User {
  id: string;
  name: string;
  email: string;
  userType: UserType;
  profileImage?: string;
  college?: string;
  department?: string;
  graduationYear?: number;
  currentPosition?: string;
  bio?: string;
  skills?: string[];
  experience?: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  achievements?: Array<{
    title: string;
    description: string;
    date: string;
  }>;
  cgpa?: number;
  linkedinProfile?: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route 
              path="/signin" 
              element={!isAuthenticated ? <SignIn /> : <Navigate to="/home" />} 
            />
            <Route 
              path="/signup" 
              element={!isAuthenticated ? <SignUp /> : <Navigate to="/home" />} 
            />
            <Route 
              path="/" 
              element={<Navigate to={isAuthenticated ? "/home" : "/signin"} />} 
            />
            
            {/* Protected Routes */}
            <Route path="/*" element={
              isAuthenticated ? (
                <Layout>
                  <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/network" element={<Network />} />
                    <Route path="/opportunities" element={<Opportunities />} />
                    <Route path="/donations" element={<Donations />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/profile/:userId?" element={<Profile />} />
                    <Route path="/calendar" element={<Calendar />} />
                  </Routes>
                </Layout>
              ) : (
                <Navigate to="/signin" />
              )
            } />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}