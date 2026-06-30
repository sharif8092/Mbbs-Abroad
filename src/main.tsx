import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import Home from './pages/Home.tsx';
import Universities from './pages/Universities.tsx';
import UniversityDetails from './pages/UniversityDetails.tsx';
import ApplyNow from './pages/ApplyNow.tsx';
import FeesComparison from './pages/FeesComparison.tsx';
import Contact from './pages/Contact.tsx';
import About from './pages/About.tsx';
import Blog from './pages/Blog.tsx';
import Admin from './pages/Admin.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="universities" element={<Universities />} />
            <Route path="universities/:id" element={<UniversityDetails />} />
            <Route path="apply" element={<ApplyNow />} />
            <Route path="fees" element={<FeesComparison />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
            <Route path="blog" element={<Blog />} />
            <Route path="admin" element={<Admin />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
