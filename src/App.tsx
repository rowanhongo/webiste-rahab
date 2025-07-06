import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import Home from './pages/Home';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import BlogPost from './pages/BlogPost';

function App() {
  return (
    <AdminProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="contact" element={<Contact />} />
            <Route path="blog/:id" element={<BlogPost />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </AdminProvider>
  );
}

export default App;